import { client } from '../../@gql-sdk/dist/baseApi'
import jwtService from '../auth/services/jwtService'

client.setHeader('Authorization', `Bearer ${jwtService.getAccessToken()}`);

export * from '../../@gql-sdk/dist/api';
