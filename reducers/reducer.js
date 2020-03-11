import axios from 'axios';

export const GET_REPOS_SUCCESS = 'my-awesome-app/repos/LOAD_SUCCESS';
export const GET_REPOS_FAIL = 'my-awesome-app/repos/LOAD_FAIL';
export const API_STATUS = 'my-awesome-app/repos/API_STATUS';

export default function RepoReducer(state = { repos: [], isLoading: false, error: '' }, action) {
    switch (action.type) {
        case GET_REPOS_SUCCESS:
            const test = [];
            action.payload.map(item => {
                test.push(item.name)
            });
            return { ...state, repos: test };
        case GET_REPOS_FAIL:
            return {
                ...state,
                error: 'Error while fetching repositories'
            };
        case API_STATUS:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}

export function  listRepoSuccess(data) {
    return {
        type: GET_REPOS_SUCCESS,
        payload: data
    };
}

export function listRepoFail() {
    return {
        type: GET_REPOS_FAIL
    };
}

export function setApiStatus(status) {
    return {
        type: API_STATUS,
        payload: status
    };
}

export function fetchRepos(user) {
    return async function (dispatch) {
        try {
            dispatch(setApiStatus(true));

            const res = await axios.get(`https://api.github.com/users/${user}/repos`);
            dispatch(listRepoSuccess(res.data));
            dispatch(setApiStatus(false));
        }
        catch (error) {
            console.log(error);
            dispatch(setApiStatus(false));
            dispatch(listRepoFail())
        }
    }
}
