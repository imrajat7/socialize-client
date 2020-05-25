import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Redux
import {Provider} from 'react-redux';
import store from './redux/store';

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
// components
import Navbar from "./components/Navbar";
import AuthRoute from './components/AuthRoute.js'

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  }else{
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
