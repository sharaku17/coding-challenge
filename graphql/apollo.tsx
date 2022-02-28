import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const RICKANDMORTYAPI_GRAPHQL = "https://rickandmortyapi.com/graphql"

const ApolloProv: React.FC<PropsWithChildren<{}>>  = ({children}) => {
    const client = new ApolloClient({
        uri:RICKANDMORTYAPI_GRAPHQL,
        cache: new InMemoryCache()
    
    }); 

    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}

export default ApolloProv