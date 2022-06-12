import { api } from './baseApi';
export const LoginDocument = `
    mutation Login($loginVariables: LoginInput!) {
  login(loginVariables: $loginVariables) {
    token
  }
}
    `;
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        Login: build.mutation({
            query: (variables) => ({ document: LoginDocument, variables })
        }),
    }),
});
export { injectedRtkApi as api };
export const { useLoginMutation } = injectedRtkApi;
