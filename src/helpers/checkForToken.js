import jwtDecode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import store from '../store';
import { logoutUser, setCurrentUser } from "../actions/authActions";

const checkForToken = () => {
    const token = localStorage.jwtToken;
    if (token) {
        setAuthToken(token);

        const decoded = jwtDecode(token);

        // seteamos los datos del usuario actual en el store
        store.dispatch(setCurrentUser({
            user: decoded,
            loggedIn: true
        }));

        const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en milisegundos

        // validamos si es que el token ya ha expirado
        if (decoded.exp < currentTime) {
            store.dispatch(logoutUser());
            window.location.href = "/signin";
        }
    }
}

export default checkForToken;