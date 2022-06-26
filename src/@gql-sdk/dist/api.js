import { api } from './baseApi';
export const LoginDocument = `
    mutation Login($loginVariables: LoginInput!) {
  login(loginVariables: $loginVariables) {
    token
  }
}
    `;
export const CreateUserDocument = `
    mutation CreateUser($variable: UserInput!) {
  createUser(variable: $variable) {
    token
  }
}
    `;
export const CreateBuildsDocument = `
    mutation CreateBuilds($variables: BuildsInput!) {
  createBuilds(variables: $variables) {
    id
  }
}
    `;
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        Login: build.mutation({
            query: (variables) => ({ document: LoginDocument, variables })
        }),
        CreateUser: build.mutation({
            query: (variables) => ({ document: CreateUserDocument, variables })
        }),
        CreateBuilds: build.mutation({
            query: (variables) => ({ document: CreateBuildsDocument, variables })
        }),
    }),
});
export { injectedRtkApi as api };
export const { useLoginMutation, useCreateUserMutation, useCreateBuildsMutation } = injectedRtkApi;
