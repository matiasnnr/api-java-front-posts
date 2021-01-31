import { SET_USER_POST } from "../actions/types";

const initialState = { posts: [], fetched: false };

export default function userPostReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_POST:
            return {
                ...state,
                fetched: payload.fetched,
                posts: payload.posts
            }
        default:
            return state;
    }
}