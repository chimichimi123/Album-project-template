// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlbumDetails from "./AlbumDetails";
import Login from "./Login";
import Register from "./Register";
import CheckLogin from "./CheckLogin";
import LogOut from "./LogOut";
import Profile from "./Profile";
import Members from "./Members";
import Reviews from "./Reviews";
import Albums from "./AlbumList";
import Navbar from "./NavBar";

import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={LogOut} />
          <Route path="/albums/:id" component={AlbumDetails} />
          <Route path="/albums" exact component={Albums} />
          <Route path="/members" component={Members} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/check_login" component={CheckLogin} />
          <Route path="/" exact component={Albums} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
