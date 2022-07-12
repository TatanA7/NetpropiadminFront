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
export const GetBuildsDocument = `
    query GetBuilds {
  Builds {
    id
    name
    description
    propertyType
    address
    numberRooms
    numberBathrooms
    stratum
    lotArea
    user_id
    parkingLot
    imgName
    imgDescription
    price
    managementValue
    othersCost
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
        GetBuilds: build.query({
            query: (variables) => ({ document: GetBuildsDocument, variables })
        }),
    }),
});
export { injectedRtkApi as api };
export const { useLoginMutation, useCreateUserMutation, useCreateBuildsMutation, useGetBuildsQuery, useLazyGetBuildsQuery } = injectedRtkApi;
