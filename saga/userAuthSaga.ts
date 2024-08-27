import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getUserDetailsAction, getUserDetailsFailureAction, getUserDetailsSuccessAction,
    getProductDetailsAction, getProductDetailsFailureAction, getProductDetailsSuccessAction,

} from '@/store/userReducer/userReducer';

import { apiCall } from '@/services/api';

// get user details 
function* getUserDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'user',
        });

        if (response.status === 'ok') {
            yield put(getUserDetailsSuccessAction({ user: response.user, totalCartItem: response.totalCartItem }));
            localStorage.setItem("userData", JSON.stringify(response.user));
        } else {
            yield put(getUserDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getUserDetailsFailureAction(err))
    }
}

// get product details
function* getProductDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'products',
        });

        if (response.status === 'ok') {
            yield put(getProductDetailsSuccessAction(response.products))
        } else {
            yield put(getProductDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getProductDetailsFailureAction(err))
    }
}

export function* userAuthWatcher() {
    yield takeEvery(getUserDetailsAction, getUserDetailsActionSaga);
    yield takeEvery(getProductDetailsAction, getProductDetailsActionSaga);
}