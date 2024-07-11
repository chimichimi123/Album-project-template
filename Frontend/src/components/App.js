import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Albums from "./AlbumList";
import Members from "./Members";
import Reviews from "./Reviews";
import "./App.css"; // Import your CSS file

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link className="nav-link" to="/albums">Albums</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/members">Members</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">Reviews</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/albums" component={Albums} />
          <Route path="/members" component={Members} />
          <Route path="/reviews" component={Reviews} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
