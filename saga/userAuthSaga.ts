import { takeEvery, put, call } from 'redux-saga/effects';
import {
    userSignupAction, userSignupSuccessAction, userSignupFailureAction,
    userLoginAction, userLoginFailureAction, userLoginSuccessAction
} from '@/store/userAuthReducer';

import { apiCall } from '@/services/api';

// user signup
function* userSignupActionSaga(action: {
    type: string;
    payload: {
        name: '', email: '', password: '',
    }
}): any {
    try {
        console.log('reached saga')
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'signup',
            body: action.payload

        });

        if (response.status === 'ok') {
            console.log(response.user, 'founddeeeeeeeeeeeee')
            yield put(userSignupSuccessAction(response.user));
            localStorage.setItem("userData", JSON.stringify(response.user));
        } else {
            yield put(userSignupFailureAction(response.message))
        }
    } catch (err) {
        yield put(userSignupFailureAction(err))
    }
}

// user login
function* userLoginActionSaga(action: {
    type: string;
    payload: {
         email: '', password: '',
    }
}): any {
    try {
        console.log('reached saga')
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'login',
            body: action.payload

        });

        if (response.status === 'ok') {
            yield put(userLoginSuccessAction(response.user));
            localStorage.setItem("userData", JSON.stringify(response.user));
        } else {
            yield put(userLoginFailureAction(response.message))
        }
    } catch (err) {
        yield put(userLoginFailureAction(err))
    }
}



export function* userAuthWatcher() {
    yield takeEvery(userSignupAction, userSignupActionSaga);
    yield takeEvery(userLoginAction, userLoginActionSaga);

}