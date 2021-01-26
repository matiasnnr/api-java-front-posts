import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import store from './store';
import { Provider } from 'react-redux';
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserPosts from "./pages/UserPosts";
import SignUp from "./pages/SignUp";

checkForToken();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation>

          </Navigation>
        </div>
        <Container>
          <Switch>
            <Route exact path="/" component={Posts}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <PrivateRoute exact path="/posts" component={UserPosts} ></PrivateRoute>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
