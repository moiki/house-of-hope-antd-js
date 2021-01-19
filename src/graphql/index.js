import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import dotenv from "dotenv";

dotenv.config();

const graphURI =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_APOLLO_URI_DEV
    : process.env.REACT_APP_APOLLO_URI_PROD;

const WHITE_LINKS = ["login", "signup"];

const refreshToken = async () => {
  // Get the token from LS
  const token = localStorage.getItem("refreshToken");
  const data = JSON.stringify({
    query: `{  refreshToken(refreshToken: "${token || "invalid"}")}`,
  });
  let newToken;
  newToken = await fetch(graphURI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  newToken = await newToken.json();

  if (newToken.errors) {
    throw new Error("Session Expired!");
  }
  localStorage.setItem("token", newToken.data.refreshToken);
  return newToken.data.refreshToken;
};

const cache = new InMemoryCache({
  addTypename: false,
  resultCaching: false,
});
const httpLink = createHttpLink({
  uri: graphURI,
});

const errorHandler = onError(
  ({ graphQLErrors, operation, forward, response }) => {
    let { operationName } = operation;
    if (operationName) {
      operationName = operationName.toLowerCase();
    }
    if (WHITE_LINKS.indexOf(operationName) > -1) {
      return forward(operation);
    } else if (graphQLErrors) {
      const errorMessage = graphQLErrors[0].extensions.code;
      // UNAUTHENTICATED
      if (errorMessage === "UNAUTHENTICATED") {
        // const token = localStorage.getItem('token')
        // Let's refresh token through async request
        return new Observable((observer) => {
          refreshToken()
            .then((refreshResponse) => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  authorization: `Bearer ${refreshResponse}` || null,
                },
              }));
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              // Retry last failed request
              forward(operation).subscribe(subscriber);
            })
            .catch((error) => {
              // No refresh or client token available, we force user to login
              observer.error(error);
            });
        });
      }
    }
  }
);

const authLink = setContext(async (_, { headers }) => {
  // Get the token from LS
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = ApolloLink.from([errorHandler, authLink, httpLink]);

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,
  name: "HOH Chart-GraphQL-Client",
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

export default client;
