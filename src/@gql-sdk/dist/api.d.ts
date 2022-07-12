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
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};
export declare type Autentication = {
    __typename?: 'Autentication';
    token: Scalars['String'];
    user: User;
};
export declare type Builds = {
    __typename?: 'Builds';
    address: Scalars['String'];
    description: Scalars['String'];
    id: Scalars['Float'];
    imgDescription: Scalars['String'];
    imgName: Scalars['String'];
    lotArea: Scalars['String'];
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
export declare type BuildsInput = {
    address?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    imgDescription?: InputMaybe<Scalars['String']>;
    imgName?: InputMaybe<Scalars['String']>;
    lotArea?: InputMaybe<Scalars['String']>;
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
export declare type BuildsUpdateInput = {
    address?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    imgDescription?: InputMaybe<Scalars['String']>;
    imgName?: InputMaybe<Scalars['String']>;
    imgs?: InputMaybe<Array<Scalars['String']>>;
    lotArea?: InputMaybe<Scalars['String']>;
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
    loginFacebook: Autentication;
    loginGoogle: Autentication;
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
export declare type MutationLoginFacebookArgs = {
    loginVariables: LoginFacebookInput;
};
export declare type MutationLoginGoogleArgs = {
    loginVariables: LoginGoogleInput;
};
export declare type MutationUpdateBuildsArgs = {
    fields: BuildsUpdateInput;
    id: Scalars['Int'];
};
export declare type Query = {
    __typename?: 'Query';
    Builds: Array<Builds>;
    Type_build: Array<Type_Build>;
    ping: Scalars['String'];
    testBuild: Scalars['String'];
};
export declare type Type_Build = {
    __typename?: 'Type_build';
    date_add: Scalars['DateTime'];
    id: Scalars['Float'];
    name: Scalars['String'];
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
export declare type LoginFacebookInput = {
    facebook_id: Scalars['String'];
};
export declare type LoginGoogleInput = {
    google_id: Scalars['String'];
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
export declare type CreateUserMutationVariables = Exact<{
    variable: UserInput;
}>;
export declare type CreateUserMutation = {
    __typename?: 'Mutation';
    createUser: {
        __typename?: 'Autentication';
        token: string;
    };
};
export declare type CreateBuildsMutationVariables = Exact<{
    variables: BuildsInput;
}>;
export declare type CreateBuildsMutation = {
    __typename?: 'Mutation';
    createBuilds: {
        __typename?: 'Builds';
        id: number;
    };
};
export declare type GetBuildsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetBuildsQuery = {
    __typename?: 'Query';
    Builds: Array<{
        __typename?: 'Builds';
        id: number;
        name: string;
        description: string;
        propertyType: string;
        address: string;
        numberRooms: number;
        numberBathrooms: number;
        stratum: number;
        lotArea: string;
        user_id: number;
        parkingLot: string;
        imgName: string;
        imgDescription: string;
        price: string;
        managementValue: string;
        othersCost: string;
    }>;
};
export declare const LoginDocument = "\n    mutation Login($loginVariables: LoginInput!) {\n  login(loginVariables: $loginVariables) {\n    token\n  }\n}\n    ";
export declare const CreateUserDocument = "\n    mutation CreateUser($variable: UserInput!) {\n  createUser(variable: $variable) {\n    token\n  }\n}\n    ";
export declare const CreateBuildsDocument = "\n    mutation CreateBuilds($variables: BuildsInput!) {\n  createBuilds(variables: $variables) {\n    id\n  }\n}\n    ";
export declare const GetBuildsDocument = "\n    query GetBuilds {\n  Builds {\n    id\n    name\n    description\n    propertyType\n    address\n    numberRooms\n    numberBathrooms\n    stratum\n    lotArea\n    user_id\n    parkingLot\n    imgName\n    imgDescription\n    price\n    managementValue\n    othersCost\n  }\n}\n    ";
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
    CreateUser: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        variable: UserInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateUserMutation, "api">;
    CreateBuilds: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        variables: BuildsInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateBuildsMutation, "api">;
    GetBuilds: import("@reduxjs/toolkit/dist/query").QueryDefinition<void | Exact<{
        [key: string]: never;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildsQuery, "api">;
}, "api", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
export { injectedRtkApi as api };
export declare const useLoginMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    loginVariables: LoginInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, LoginMutation, "api">>, useCreateUserMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    variable: UserInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateUserMutation, "api">>, useCreateBuildsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    variables: BuildsInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateBuildsMutation, "api">>, useGetBuildsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/dist/query").QueryDefinition<void | Exact<{
    [key: string]: never;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildsQuery, "api">>, useLazyGetBuildsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseLazyQuery<import("@reduxjs/toolkit/dist/query").QueryDefinition<void | Exact<{
    [key: string]: never;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildsQuery, "api">>;
