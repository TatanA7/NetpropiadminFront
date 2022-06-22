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
};

export type Autentication = {
  __typename?: 'Autentication';
  token: Scalars['String'];
  user: User;
};

export type Builds = {
  __typename?: 'Builds';
  acquired_in: Scalars['Float'];
  address: Scalars['String'];
  cost: Scalars['String'];
  cupancy: Scalars['String'];
  estrato: Scalars['Float'];
  id: Scalars['Float'];
  latitude: Scalars['Float'];
  loan_balance: Scalars['String'];
  longitude: Scalars['Float'];
  lont_size: Scalars['String'];
  market_value: Scalars['String'];
  name: Scalars['String'];
  property_records: Scalars['String'];
  rent: Scalars['String'];
  square_feet: Scalars['String'];
  units: Scalars['String'];
  user_id: Scalars['Float'];
  year_built: Scalars['Float'];
};

export type BuildsInput = {
  acquired_in: Scalars['Float'];
  address: Scalars['String'];
  cost: Scalars['String'];
  cupancy: Scalars['String'];
  estrato: Scalars['Float'];
  latitude: Scalars['Float'];
  loan_balance: Scalars['String'];
  longitude: Scalars['Float'];
  lont_size: Scalars['String'];
  market_value: Scalars['String'];
  name: Scalars['String'];
  property_records: Scalars['String'];
  rent: Scalars['String'];
  square_feet: Scalars['String'];
  units: Scalars['String'];
  user_id: Scalars['Float'];
  year_built: Scalars['Float'];
};

export type BuildsUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
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
  login: Autentication;
  updateBuilds: Builds;
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


export type MutationLoginArgs = {
  loginVariables: LoginInput;
};


export type MutationUpdateBuildsArgs = {
  fields: BuildsUpdateInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  Builds: Array<Builds>;
  ping: Scalars['String'];
  testBuild: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  NIT: Scalars['String'];
  businessName: Scalars['String'];
  cell_phone: Scalars['String'];
  coint: Scalars['String'];
  created_at: Scalars['Boolean'];
  facebook_id: Scalars['String'];
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
  last_name: Scalars['String'];
  mail: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  policies?: InputMaybe<Scalars['String']>;
  termsConditions?: InputMaybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  loginVariables: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Autentication', token: string } };

export type CreateUserMutationVariables = Exact<{
  variable: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Autentication', token: string } };

export type CreateBuildsMutationVariables = Exact<{
  variables: BuildsInput;
}>;


export type CreateBuildsMutation = { __typename?: 'Mutation', createBuilds: { __typename?: 'Builds', id: number, name: string, address: string, estrato: number, lont_size: string, square_feet: string } };


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
    address
    estrato
    lont_size
    square_feet
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
    CreateBuilds: build.mutation<CreateBuildsMutation, CreateBuildsMutationVariables>({
      query: (variables) => ({ document: CreateBuildsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useLoginMutation, useCreateUserMutation, useCreateBuildsMutation } = injectedRtkApi;

