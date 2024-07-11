// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Albums from "./AlbumList";
import Members from "./Members";
import Reviews from "./Reviews";
import AlbumDetails from "./AlbumDetails";
import Login from "./Login";
import Register from "./Register";
import CheckLogin from "./CheckLogin";
import LogOut from "./LogOut";
import Profile from "./Profile";

import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/albums">Albums</Link>
              </li>
              <li>
                <Link to="/members">Members</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
            </ul>
          </nav>

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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
