import React, { createContext, useState, useReducer } from "react";
import Admin from "./layout/admin/Admin";
import initialState from "./store/initialState";
import reducer from "./store/reducer";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ApolloClient from "./graphql/index";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "@apollo/react-hooks";
import AuthLayout from "layout/auth/AuthLayout";
import Login from "views/auth/Login";
import SignUpView from "views/signup";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export const MainStore = createContext();
export const hist = createBrowserHistory();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userState, setUserState] = useState({
    fullname: null,
    email: null,
    role: [],
    profession: null,
    phoneNumber: null,
  });

  return (
    <MainStore.Provider
      value={{
        state: state,
        dispatch: dispatch,
        user: userState,
        setUser: (data) => {
          setUserState({ ...userState, ...data });
        },
      }}
    >
      <ApolloProvider client={ApolloClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <Admin {...props} />} />
            <Route
              path="/auth/login"
              exact
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/auth/signup/:token"
              exact
              children={(props) => <SignUpView {...props} />}
            />
            <Redirect to="/admin" />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </MainStore.Provider>
  );
}

export default App;
