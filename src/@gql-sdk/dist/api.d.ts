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
    DateTime: any;
};
export declare type Autentication = {
    __typename?: 'Autentication';
    token: Scalars['String'];
    user: User;
};
export declare type BuildImage = {
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
export declare type Builds = {
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
export declare type BuildsInput = {
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
export declare type BuildsUpdateInput = {
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
export declare type Img = {
    __typename?: 'Img';
    id: Scalars['Float'];
    url: Scalars['String'];
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
    forgotPassword: User;
    login: Autentication;
    loginFacebook: Autentication;
    loginGoogle: Autentication;
    recoverPassword: User;
    updateBuilds: BuildImage;
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
export declare type MutationForgotPasswordArgs = {
    email: Scalars['String'];
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
export declare type MutationRecoverPasswordArgs = {
    recoverVariables: RecoverPasswordInput;
};
export declare type MutationUpdateBuildsArgs = {
    fields: BuildsUpdateInput;
    id: Scalars['Int'];
};
export declare type Query = {
    __typename?: 'Query';
    Builds: Array<BuildImage>;
    BuildsById: BuildImage;
    Type_build: Array<Type_Build>;
    ping: Scalars['String'];
    testBuild: Scalars['String'];
};
export declare type QueryBuildsByIdArgs = {
    id: Scalars['Int'];
};
export declare type RecoverPasswordInput = {
    code: Scalars['String'];
    mail: Scalars['String'];
    password: Scalars['String'];
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
export declare type UserInput = {
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
export declare type ForgotPasswordMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type ForgotPasswordMutation = {
    __typename?: 'Mutation';
    forgotPassword: {
        __typename?: 'User';
        mail: string;
    };
};
export declare type RecoverPasswordMutationVariables = Exact<{
    recoverVariables: RecoverPasswordInput;
}>;
export declare type RecoverPasswordMutation = {
    __typename?: 'Mutation';
    recoverPassword: {
        __typename?: 'User';
        mail: string;
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
        name: string;
        description: string;
        propertyType: string;
        address: string;
        numberRooms: number;
        numberBathrooms: number;
        stratum: number;
        lotArea: string;
        lotMeters: string;
        parkingLot: string;
        imgName: string;
        imgDescription: string;
        price: string;
        managementValue: string;
        othersCost: string;
        status: string;
    };
};
export declare type UpdateBuildsMutationVariables = Exact<{
    fields: BuildsUpdateInput;
    updateBuildsId: Scalars['Int'];
}>;
export declare type UpdateBuildsMutation = {
    __typename?: 'Mutation';
    updateBuilds: {
        __typename?: 'BuildImage';
        id: number;
        name: string;
        description: string;
        propertyType: string;
        address: string;
        numberRooms: number;
        numberBathrooms: number;
        stratum: number;
        lotArea: string;
        lotMeters: string;
        parkingLot: string;
        price: string;
        managementValue: string;
        othersCost: string;
        status: string;
        imgs: Array<{
            __typename?: 'Img';
            id: number;
            url: string;
        }>;
    };
};
export declare type DeleteBuildsMutationVariables = Exact<{
    deleteBuildsId: Scalars['Int'];
}>;
export declare type DeleteBuildsMutation = {
    __typename?: 'Mutation';
    deleteBuilds: boolean;
};
export declare type GetBuildsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetBuildsQuery = {
    __typename?: 'Query';
    Builds: Array<{
        __typename?: 'BuildImage';
        id: number;
        name: string;
        description: string;
        propertyType: string;
        address: string;
        numberRooms: number;
        numberBathrooms: number;
        stratum: number;
        lotArea: string;
        lotMeters: string;
        user_id: number;
        parkingLot: string;
        price: string;
        managementValue: string;
        othersCost: string;
        status: string;
        imgs: Array<{
            __typename?: 'Img';
            id: number;
            url: string;
        }>;
    }>;
};
export declare type GetBuildByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;
export declare type GetBuildByIdQuery = {
    __typename?: 'Query';
    BuildsById: {
        __typename?: 'BuildImage';
        id: number;
        name: string;
        description: string;
        propertyType: string;
        address: string;
        numberRooms: number;
        numberBathrooms: number;
        stratum: number;
        lotArea: string;
        lotMeters: string;
        user_id: number;
        parkingLot: string;
        price: string;
        managementValue: string;
        othersCost: string;
        status: string;
        imgs: Array<{
            __typename?: 'Img';
            id: number;
            url: string;
        }>;
    };
};
export declare const LoginDocument = "\n    mutation Login($loginVariables: LoginInput!) {\n  login(loginVariables: $loginVariables) {\n    token\n  }\n}\n    ";
export declare const CreateUserDocument = "\n    mutation CreateUser($variable: UserInput!) {\n  createUser(variable: $variable) {\n    token\n  }\n}\n    ";
export declare const ForgotPasswordDocument = "\n    mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    mail\n  }\n}\n    ";
export declare const RecoverPasswordDocument = "\n    mutation RecoverPassword($recoverVariables: RecoverPasswordInput!) {\n  recoverPassword(recoverVariables: $recoverVariables) {\n    mail\n  }\n}\n    ";
export declare const CreateBuildsDocument = "\n    mutation CreateBuilds($variables: BuildsInput!) {\n  createBuilds(variables: $variables) {\n    id\n    name\n    description\n    propertyType\n    address\n    numberRooms\n    numberBathrooms\n    stratum\n    lotArea\n    lotMeters\n    parkingLot\n    imgName\n    imgDescription\n    price\n    managementValue\n    othersCost\n    status\n  }\n}\n    ";
export declare const UpdateBuildsDocument = "\n    mutation UpdateBuilds($fields: BuildsUpdateInput!, $updateBuildsId: Int!) {\n  updateBuilds(fields: $fields, id: $updateBuildsId) {\n    id\n    name\n    description\n    propertyType\n    address\n    numberRooms\n    numberBathrooms\n    stratum\n    lotArea\n    lotMeters\n    parkingLot\n    price\n    imgs {\n      id\n      url\n    }\n    managementValue\n    othersCost\n    status\n  }\n}\n    ";
export declare const DeleteBuildsDocument = "\n    mutation DeleteBuilds($deleteBuildsId: Int!) {\n  deleteBuilds(id: $deleteBuildsId)\n}\n    ";
export declare const GetBuildsDocument = "\n    query GetBuilds {\n  Builds {\n    id\n    name\n    description\n    propertyType\n    address\n    numberRooms\n    numberBathrooms\n    stratum\n    lotArea\n    lotMeters\n    user_id\n    parkingLot\n    imgs {\n      id\n      url\n    }\n    price\n    managementValue\n    othersCost\n    status\n  }\n}\n    ";
export declare const GetBuildByIdDocument = "\n    query GetBuildById($id: Int!) {\n  BuildsById(id: $id) {\n    id\n    name\n    description\n    propertyType\n    address\n    numberRooms\n    numberBathrooms\n    stratum\n    lotArea\n    lotMeters\n    user_id\n    parkingLot\n    imgs {\n      id\n      url\n    }\n    price\n    managementValue\n    othersCost\n    status\n  }\n}\n    ";
declare const injectedRtkApi: import("@reduxjs/toolkit/dist/query").Api<import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, {
    Login: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        loginVariables: LoginInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, LoginMutation, "api">;
    CreateUser: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        variable: UserInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateUserMutation, "api">;
    ForgotPassword: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        email: Scalars['String'];
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, ForgotPasswordMutation, "api">;
    RecoverPassword: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        recoverVariables: RecoverPasswordInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, RecoverPasswordMutation, "api">;
    CreateBuilds: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        variables: BuildsInput;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateBuildsMutation, "api">;
    UpdateBuilds: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        fields: BuildsUpdateInput;
        updateBuildsId: Scalars['Int'];
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, UpdateBuildsMutation, "api">;
    DeleteBuilds: import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
        deleteBuildsId: Scalars['Int'];
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, DeleteBuildsMutation, "api">;
    GetBuilds: import("@reduxjs/toolkit/dist/query").QueryDefinition<void | Exact<{
        [key: string]: never;
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildsQuery, "api">;
    GetBuildById: import("@reduxjs/toolkit/dist/query").QueryDefinition<Exact<{
        id: Scalars['Int'];
    }>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
        document: string | import("graphql").DocumentNode;
        variables?: any;
    }, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildByIdQuery, "api">;
}, "api", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
export { injectedRtkApi as api };
export declare const useLoginMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    loginVariables: LoginInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, LoginMutation, "api">>, useCreateUserMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    variable: UserInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateUserMutation, "api">>, useForgotPasswordMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    email: Scalars['String'];
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, ForgotPasswordMutation, "api">>, useRecoverPasswordMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    recoverVariables: RecoverPasswordInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, RecoverPasswordMutation, "api">>, useCreateBuildsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    variables: BuildsInput;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, CreateBuildsMutation, "api">>, useUpdateBuildsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    fields: BuildsUpdateInput;
    updateBuildsId: Scalars['Int'];
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, UpdateBuildsMutation, "api">>, useDeleteBuildsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/dist/query").MutationDefinition<Exact<{
    deleteBuildsId: Scalars['Int'];
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, DeleteBuildsMutation, "api">>, useGetBuildsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/dist/query").QueryDefinition<void | Exact<{
    [key: string]: never;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildsQuery, "api">>, useLazyGetBuildsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseLazyQuery<import("@reduxjs/toolkit/dist/query").QueryDefinition<void | Exact<{
    [key: string]: never;
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildsQuery, "api">>, useGetBuildByIdQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/dist/query").QueryDefinition<Exact<{
    id: Scalars['Int'];
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildByIdQuery, "api">>, useLazyGetBuildByIdQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseLazyQuery<import("@reduxjs/toolkit/dist/query").QueryDefinition<Exact<{
    id: Scalars['Int'];
}>, import("@reduxjs/toolkit/dist/query").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, import("@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes").ErrorResponse, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, never, GetBuildByIdQuery, "api">>;
