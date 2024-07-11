import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Albums from "./AlbumList";
import Members from "./Members";
import Reviews from "./Reviews";
import AlbumDetails from "./AlbumDetails";

function App() {
  return (
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
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Albums} />
          <Route path="/albums" exact component={Albums} />
          <Route path="/albums/:id" component={AlbumDetails} />
          <Route path="/members" component={Members} />
          <Route path="/reviews" component={Reviews} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
