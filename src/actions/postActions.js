import axios from 'axios';
import { SET_USER_POST } from './types';
import { USER_POST_ENDPOINT } from '../helpers/endpoints';

export const getUserPost = () => dispatch => {
    // cuando obtengamos los datos de nuestra API, vamos a hacer el dispatch de los datos hacia nuestro reducer para que cambie el state global
    return new Promise((resolve, reject) => {
        axios.get(USER_POST_ENDPOINT)
            .then(res => {
                dispatch({
                    type: SET_USER_POST,
                    payload: { fetched: true, posts: res.data }
                });

                resolve(res);
            })
            .catch(err => reject(err));
    })
}