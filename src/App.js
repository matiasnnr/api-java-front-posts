import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import PublicPosts from "./pages/PublicPosts";
import SignIn from "./pages/SignIn";
import store from './store';
import { Provider } from 'react-redux';
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserPosts from "./pages/UserPosts";
import SignUp from "./pages/SignUp";
import PostDetails from "./pages/PostDetails";

// config toast alerts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//moment configuracion español
import moment from 'moment';
import 'moment/locale/es';
import NewPost from "./pages/NewPost";
moment.locale('es');

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
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={PublicPosts}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/post/:id" component={PostDetails}></Route>
            <PrivateRoute exact path="/posts" component={UserPosts} ></PrivateRoute>
            <PrivateRoute exact path="/newpost" component={NewPost} ></PrivateRoute>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
