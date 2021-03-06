import FuseUtils from '@fuse/utils/FuseUtils';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import jwtServiceConfig from './jwtServiceConfig';
import { client } from '../../../../@gql-sdk/dist/baseApi'
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.signIn, {
          data: {
            email,
            password,
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
            this.emit('onLogin', response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = async () => {
    try {
      this.setSession(this.getAccessToken());
      const { user } = jwtDecode(this.getAccessToken());

      return {
        token: this.getAccessToken(),
        role: 'admin',
        data: {
          ...user,
          displayName: `${user.name}`,
          photoURL: '',
        },
      };
    } catch (error) {
      this.logout();
      throw new Error('Failed to login with token.');
    }

    // uncomment this, to login to server by token
    // axios
    //   .get(jwtServiceConfig.accessToken, {
    //     data: {
    //       access_token: this.getAccessToken(),
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data.user) {
    //       this.setSession(response.data.access_token);
    //       resolve(response.data.user);
    //     } else {
    //       this.logout();
    //       reject(new Error('Failed to login with token.'));
    //     }
    //   })
    //   .catch((error) => {
    //     this.logout();
    //     reject(new Error('Failed to login with token.'));
    //   });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      client.setHeader('Authorization', `Bearer ${this.getAccessToken()}`);
      // axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      client.setHeader('Authorization', '');
      // delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
