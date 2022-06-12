import { GraphQLClient } from 'graphql-request';
export declare const client: GraphQLClient;
export declare const api: import("@reduxjs/toolkit/query/react").Api<import("@reduxjs/toolkit/query/react").BaseQueryFn<{
    document: string | import("graphql").DocumentNode;
    variables?: any;
}, unknown, Pick<import("graphql-request").ClientError, "name" | "message" | "stack">, Partial<Pick<import("graphql-request").ClientError, "request" | "response">>, {}>, {}, "api", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
