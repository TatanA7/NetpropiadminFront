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
    name
    description
    propertyType
    address
    numberRooms
    numberBathrooms
    stratum
    lotArea
    lotMeters
    parkingLot
    imgName
    imgDescription
    price
    managementValue
    othersCost
    status
  }
}
    `;
export const UpdateBuildsDocument = `
    mutation UpdateBuilds($fields: BuildsUpdateInput!, $updateBuildsId: Int!) {
  updateBuilds(fields: $fields, id: $updateBuildsId) {
    id
    name
    description
    propertyType
    address
    numberRooms
    numberBathrooms
    stratum
    lotArea
    lotMeters
    parkingLot
    price
    imgs {
      id
      url
    }
    managementValue
    othersCost
    status
  }
}
    `;
export const DeleteBuildsDocument = `
    mutation DeleteBuilds($deleteBuildsId: Int!) {
  deleteBuilds(id: $deleteBuildsId)
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
    lotMeters
    user_id
    parkingLot
    imgs {
      id
      url
    }
    price
    managementValue
    othersCost
    status
  }
}
    `;
export const GetBuildByIdDocument = `
    query GetBuildById($id: Int!) {
  BuildsById(id: $id) {
    id
    name
    description
    propertyType
    address
    numberRooms
    numberBathrooms
    stratum
    lotArea
    lotMeters
    user_id
    parkingLot
    imgs {
      id
      url
    }
    price
    managementValue
    othersCost
    status
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
        UpdateBuilds: build.mutation({
            query: (variables) => ({ document: UpdateBuildsDocument, variables })
        }),
        DeleteBuilds: build.mutation({
            query: (variables) => ({ document: DeleteBuildsDocument, variables })
        }),
        GetBuilds: build.query({
            query: (variables) => ({ document: GetBuildsDocument, variables })
        }),
        GetBuildById: build.query({
            query: (variables) => ({ document: GetBuildByIdDocument, variables })
        }),
    }),
});
export { injectedRtkApi as api };
export const { useLoginMutation, useCreateUserMutation, useCreateBuildsMutation, useUpdateBuildsMutation, useDeleteBuildsMutation, useGetBuildsQuery, useLazyGetBuildsQuery, useGetBuildByIdQuery, useLazyGetBuildByIdQuery } = injectedRtkApi;
