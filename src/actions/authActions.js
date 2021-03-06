import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../helpers/endpoints';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../helpers/setAuthToken';

export const loginUser = (userData) => dispatch => {

    console.log(userData);

    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT, userData, {
            headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
        }).then(response => {

            console.log(response);

            const { authorization, userid } = response.headers;

            localStorage.setItem('jwtToken', authorization);
            localStorage.setItem('userId', userid);

            // func para añadir token a axios
            setAuthToken(authorization);

            const decoded = jwtDecode(authorization);

            dispatch(setCurrentUser({ user: decoded, loggedIn: true }));

            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}

export const registerUser = (userData) => dispatch => {

    console.log(userData);

    return new Promise((resolve, reject) => {
        axios.post(REGISTER_ENDPOINT, userData, {
            headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}

export const setCurrentUser = ({ user, loggedIn }) => { // con esto el usuario decodificado desde el token, será puesto en el state global de la app
    return {
        type: SET_CURRENT_USER,
        payload: { user, loggedIn }
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken"); // sacamos token del localStorage

    setAuthToken(false); // sacamos token del header de axios

    dispatch(setCurrentUser({ // limpiamos el store de la app
        user: {},
        loggedIn: false
    }));
}