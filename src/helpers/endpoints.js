// const API_URL = "http://localhost:8080";
// const API_URL = "http://54.153.67.191:8080"; // AWS
const API_URL = "https://posts-system.herokuapp.com"; // HEROKU

export const LOGIN_ENDPOINT = `${API_URL}/users/login`;
export const REGISTER_ENDPOINT = `${API_URL}/users`;
export const PUBLIC_POSTS_ENDPOINT = `${API_URL}/posts/last`;
export const POST_DETAILS_ENDPOINT = `${API_URL}/posts`;
export const USER_POST_ENDPOINT = `${API_URL}/users/posts`;
export const CREATE_POST_ENDPOINT = `${API_URL}/posts`;
export const DELETE_POST_ENDPOINT = `${API_URL}/posts`;
export const UPDATE_POST_ENDPOINT = `${API_URL}/posts`;