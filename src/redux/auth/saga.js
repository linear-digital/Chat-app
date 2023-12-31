import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { getFirebaseBackend } from "../../helpers/firebase";


import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD
} from './constants';


import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    apiError,
    logoutUserSuccess
} from './actions';



//Initilize firebase
const fireBaseBackend = getFirebaseBackend();


/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;

/**
 * Login the user
 * @param {*} payload - username and password 
 */



function* login({ payload: { username, password, history } }) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = yield call(fireBaseBackend.loginUser, username, password);
            yield put(loginUserSuccess(response));

        } else {
            const response = yield call(fetch, 'http://localhost:4000/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email: username, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = yield response.json();
            if (data.accessToken) {
                localStorage.setItem("authUser", JSON.stringify(data));
                yield put(loginUserSuccess(data));
            }
            else {
                yield put(apiError(data.error));
            }

        }
        history('/dashboard');
    } catch (error) {
        console.log(error, "Catch")
        yield put(apiError("error.error"));
    }
}
function* register({ payload: { user, history } }) {
    try {
        const response = yield call(fetch, 'http://localhost:4000/api/users/new', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = yield response.json();
        if (data.accessToken) {
            localStorage.setItem("authUser", JSON.stringify(data));
            yield put(registerUserSuccess(data));
            yield put(apiError(""));
        }
        else {
            console.log(data)
            yield put(apiError(data.error));
        }

        history('/dashboard');
    } catch (error) {
        console.log(error, "Catch")
        // yield put(apiError(error.error));
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            yield call(fireBaseBackend.logout);
        }
        yield put(logoutUserSuccess(true));
    } catch (error) { }
}

/**
 * Register the user
 */

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
    try {
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const response = yield call(fireBaseBackend.forgetPassword, email);
            if (response) {
                yield put(
                    forgetPasswordSuccess(
                        "Reset link are sended to your mailbox, check there first"
                    )
                );
            }
        } else {
            const response = yield call(create, '/forget-pwd', { email });
            yield put(forgetPasswordSuccess(response));
        }
    } catch (error) {
        yield put(apiError(error));
    }
}




export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;