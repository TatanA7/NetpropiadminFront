import { api } from './baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Autentication = {
  __typename?: 'Autentication';
  token: Scalars['String'];
  user: User;
};

export type BuildImage = {
  __typename?: 'BuildImage';
  address: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  imgDescription: Scalars['String'];
  imgName: Scalars['String'];
  imgs: Array<Img>;
  lotArea: Scalars['String'];
  lotMeters: Scalars['String'];
  managementValue: Scalars['String'];
  name: Scalars['String'];
  numberBathrooms: Scalars['Float'];
  numberRooms: Scalars['Float'];
  othersCost: Scalars['String'];
  parkingLot: Scalars['String'];
  price: Scalars['String'];
  propertyType: Scalars['String'];
  status: Scalars['String'];
  stratum: Scalars['Float'];
  user_id: Scalars['Float'];
};

export type Builds = {
  __typename?: 'Builds';
  address: Scalars['String'];
  city: Scalars['String'];
  department: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  images: Array<Img>;
  imgDescription: Scalars['String'];
  imgName: Scalars['String'];
  lotArea: Scalars['String'];
  lotMeters: Scalars['String'];
  managementValue: Scalars['String'];
  name: Scalars['String'];
  numberBathrooms: Scalars['Float'];
  numberRooms: Scalars['Float'];
  othersCost: Scalars['String'];
  parkingLot: Scalars['String'];
  price: Scalars['String'];
  propertyType: Scalars['String'];
  status: Scalars['String'];
  stratum: Scalars['Float'];
  user_id: Scalars['Float'];
};

export type BuildsInput = {
  acquired_in?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  deletedAt?: InputMaybe<Array<Scalars['String']>>;
  department?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imgDescription?: InputMaybe<Scalars['String']>;
  imgName?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  lotArea?: InputMaybe<Scalars['String']>;
  lotMeters?: InputMaybe<Scalars['String']>;
  managementValue?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  numberBathrooms?: InputMaybe<Scalars['String']>;
  numberRooms?: InputMaybe<Scalars['String']>;
  othersCost?: InputMaybe<Scalars['String']>;
  parkingLot?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
  propertyType?: InputMaybe<Scalars['String']>;
  stratum?: InputMaybe<Scalars['String']>;
  year_built?: InputMaybe<Scalars['String']>;
};

export type BuildsUpdateInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  deletedAt?: InputMaybe<Array<Scalars['String']>>;
  department?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imgDescription?: InputMaybe<Scalars['String']>;
  imgName?: InputMaybe<Scalars['String']>;
  imgsUrl?: InputMaybe<Array<Scalars['String']>>;
  lotArea?: InputMaybe<Scalars['String']>;
  lotMeters?: InputMaybe<Scalars['String']>;
  managementValue?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  numberBathrooms?: InputMaybe<Scalars['String']>;
  numberRooms?: InputMaybe<Scalars['String']>;
  othersCost?: InputMaybe<Scalars['String']>;
  parkingLot?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
  propertyType?: InputMaybe<Scalars['String']>;
  stratum?: InputMaybe<Scalars['String']>;
};

export type Img = {
  __typename?: 'Img';
  id: Scalars['Float'];
  url: Scalars['String'];
};

export type LoginInput = {
  mail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBuilds: Builds;
  createUser: Autentication;
  deleteBuilds: Scalars['Boolean'];
  forgotPassword: User;
  login: Autentication;
  loginFacebook: Autentication;
  loginGoogle: Autentication;
  recoverPassword: User;
  updateBuilds: BuildImage;
};


export type MutationCreateBuildsArgs = {
  variables: BuildsInput;
};


export type MutationCreateUserArgs = {
  variable: UserInput;
};


export type MutationDeleteBuildsArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginVariables: LoginInput;
};


export type MutationLoginFacebookArgs = {
  loginVariables: LoginFacebookInput;
};


export type MutationLoginGoogleArgs = {
  loginVariables: LoginGoogleInput;
};


export type MutationRecoverPasswordArgs = {
  recoverVariables: RecoverPasswordInput;
};


export type MutationUpdateBuildsArgs = {
  fields: BuildsUpdateInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  Builds: Array<BuildImage>;
  BuildsById: BuildImage;
  Type_build: Array<Type_Build>;
  ping: Scalars['String'];
  testBuild: Scalars['String'];
};


export type QueryBuildsByIdArgs = {
  id: Scalars['Int'];
};

export type RecoverPasswordInput = {
  code: Scalars['String'];
  mail: Scalars['String'];
  password: Scalars['String'];
};

export type Type_Build = {
  __typename?: 'Type_build';
  date_add: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  NIT: Scalars['String'];
  businessName: Scalars['String'];
  cell_phone: Scalars['String'];
  coint: Scalars['String'];
  created_at: Scalars['Boolean'];
  facebook_id: Scalars['String'];
  forgotPassword: Scalars['String'];
  google_id: Scalars['String'];
  id: Scalars['Float'];
  last_name: Scalars['String'];
  mail: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  picture: Scalars['String'];
  policies: Scalars['String'];
  termsConditions: Scalars['String'];
  updated_at: Scalars['Boolean'];
};

export type UserInput = {
  NIT?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  cell_phone: Scalars['String'];
  forgotPassword?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  mail: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  policies?: InputMaybe<Scalars['String']>;
  termsConditions?: InputMaybe<Scalars['String']>;
};

export type LoginFacebookInput = {
  facebook_id: Scalars['String'];
};

export type LoginGoogleInput = {
  google_id: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginVariables: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Autentication', token: string } };

export type CreateUserMutationVariables = Exact<{
  variable: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Autentication', token: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'User', mail: string } };

export type RecoverPasswordMutationVariables = Exact<{
  recoverVariables: RecoverPasswordInput;
}>;


export type RecoverPasswordMutation = { __typename?: 'Mutation', recoverPassword: { __typename?: 'User', mail: string } };

export type CreateBuildsMutationVariables = Exact<{
  variables: BuildsInput;
}>;


export type CreateBuildsMutation = { __typename?: 'Mutation', createBuilds: { __typename?: 'Builds', id: number, name: string, description: string, propertyType: string, address: string, numberRooms: number, numberBathrooms: number, stratum: number, lotArea: string, lotMeters: string, parkingLot: string, imgName: string, imgDescription: string, price: string, managementValue: string, othersCost: string, status: string } };

export type UpdateBuildsMutationVariables = Exact<{
  fields: BuildsUpdateInput;
  updateBuildsId: Scalars['Int'];
}>;


export type UpdateBuildsMutation = { __typename?: 'Mutation', updateBuilds: { __typename?: 'BuildImage', id: number, name: string, description: string, propertyType: string, address: string, numberRooms: number, numberBathrooms: number, stratum: number, lotArea: string, lotMeters: string, parkingLot: string, price: string, managementValue: string, othersCost: string, status: string, imgs: Array<{ __typename?: 'Img', id: number, url: string }> } };

export type DeleteBuildsMutationVariables = Exact<{
  deleteBuildsId: Scalars['Int'];
}>;


export type DeleteBuildsMutation = { __typename?: 'Mutation', deleteBuilds: boolean };

export type GetBuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBuildsQuery = { __typename?: 'Query', Builds: Array<{ __typename?: 'BuildImage', id: number, name: string, description: string, propertyType: string, address: string, numberRooms: number, numberBathrooms: number, stratum: number, lotArea: string, lotMeters: string, user_id: number, parkingLot: string, price: string, managementValue: string, othersCost: string, status: string, imgs: Array<{ __typename?: 'Img', id: number, url: string }> }> };

export type GetBuildByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetBuildByIdQuery = { __typename?: 'Query', BuildsById: { __typename?: 'BuildImage', id: number, name: string, description: string, propertyType: string, address: string, numberRooms: number, numberBathrooms: number, stratum: number, lotArea: string, lotMeters: string, user_id: number, parkingLot: string, price: string, managementValue: string, othersCost: string, status: string, imgs: Array<{ __typename?: 'Img', id: number, url: string }> } };


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
export const ForgotPasswordDocument = `
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    mail
  }
}
    `;
export const RecoverPasswordDocument = `
    mutation RecoverPassword($recoverVariables: RecoverPasswordInput!) {
  recoverPassword(recoverVariables: $recoverVariables) {
    mail
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
    Login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: (variables) => ({ document: LoginDocument, variables })
    }),
    CreateUser: build.mutation<CreateUserMutation, CreateUserMutationVariables>({
      query: (variables) => ({ document: CreateUserDocument, variables })
    }),
    ForgotPassword: build.mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>({
      query: (variables) => ({ document: ForgotPasswordDocument, variables })
    }),
    RecoverPassword: build.mutation<RecoverPasswordMutation, RecoverPasswordMutationVariables>({
      query: (variables) => ({ document: RecoverPasswordDocument, variables })
    }),
    CreateBuilds: build.mutation<CreateBuildsMutation, CreateBuildsMutationVariables>({
      query: (variables) => ({ document: CreateBuildsDocument, variables })
    }),
    UpdateBuilds: build.mutation<UpdateBuildsMutation, UpdateBuildsMutationVariables>({
      query: (variables) => ({ document: UpdateBuildsDocument, variables })
    }),
    DeleteBuilds: build.mutation<DeleteBuildsMutation, DeleteBuildsMutationVariables>({
      query: (variables) => ({ document: DeleteBuildsDocument, variables })
    }),
    GetBuilds: build.query<GetBuildsQuery, GetBuildsQueryVariables | void>({
      query: (variables) => ({ document: GetBuildsDocument, variables })
    }),
    GetBuildById: build.query<GetBuildByIdQuery, GetBuildByIdQueryVariables>({
      query: (variables) => ({ document: GetBuildByIdDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useLoginMutation, useCreateUserMutation, useForgotPasswordMutation, useRecoverPasswordMutation, useCreateBuildsMutation, useUpdateBuildsMutation, useDeleteBuildsMutation, useGetBuildsQuery, useLazyGetBuildsQuery, useGetBuildByIdQuery, useLazyGetBuildByIdQuery } = injectedRtkApi;

