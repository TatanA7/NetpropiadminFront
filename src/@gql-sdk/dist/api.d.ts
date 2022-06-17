export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Autentication = {
    __typename?: 'Autentication';
    token: Scalars['String'];
    user: User;
};
export declare type Builds = {
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
export declare type BuildsInput = {
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
export declare type BuildsUpdateInput = {
    name?: InputMaybe<Scalars['String']>;
};
export declare type LoginInput = {
    mail: Scalars['String'];
    password: Scalars['String'];
};
export declare type Mutation = {
    __typename?: 'Mutation';
    createBuilds: Builds;
    createUser: Autentication;
    deleteBuilds: Scalars['Boolean'];
    login: Autentication;
    updateBuilds: Builds;
};
export declare type MutationCreateBuildsArgs = {
    variables: BuildsInput;
};
export declare type MutationCreateUserArgs = {
    variable: UserInput;
};
export declare type MutationDeleteBuildsArgs = {
    id: Scalars['Int'];
};
export declare type MutationLoginArgs = {
    loginVariables: LoginInput;
};
export declare type MutationUpdateBuildsArgs = {
    fields: BuildsUpdateInput;
    id: Scalars['Int'];
};
export declare type Query = {
    __typename?: 'Query';
    Builds: Array<Builds>;
    ping: Scalars['String'];
    testBuild: Scalars['String'];
};
export declare type User = {
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
export declare type UserInput = {
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
export declare type LoginMutationVariables = Exact<{
    loginVariables: LoginInput;
}>;
export declare type LoginMutation = {
    __typename?: 'Mutation';
    login: {
        __typename?: 'Autentication';
        token: string;
    };
};
export declare const LoginDocument = "\n    mutation Login($loginVariables: LoginInput!) {\n  login(loginVariables: $loginVariables) {\n    token\n  }\n}\n    ";
declare const injectedRtkApi: import("@reduxjs/toolkit/dist/query").Api<import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, {
    Login: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        loginVariables: LoginInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, LoginMutation, "api">;
}, "api", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
export { injectedRtkApi as api };
export declare const useLoginMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    loginVariables: LoginInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, LoginMutation, "api">>;
