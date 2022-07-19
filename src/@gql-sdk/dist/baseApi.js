import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
export const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT);
// highlight-start
export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({ client }),
    endpoints: () => ({})
});
// highlight-end
