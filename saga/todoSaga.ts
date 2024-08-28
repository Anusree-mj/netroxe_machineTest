import { takeEvery, put, call } from 'redux-saga/effects';
import {
    addTodoAction, addTodoFailureAction, addTodoSuccessAction,

} from '@/store/toDoReducer';
import { apiCall } from '@/services/api';


// add to do
function* addTodActionSaga(action: {
    type: string;
    payload: {
        userId:'',task:'',description:''
    }
}): any {
    try {
        console.log('reached saga')
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'todo',
            body: action.payload

        });

        if (response.status === 'ok') {
            yield put(addTodoSuccessAction());
        } else {
            yield put(addTodoFailureAction(response.message))
        }
    } catch (err) {
        yield put(addTodoFailureAction(err))
    }
}


export function* todoWatcher() {
    yield takeEvery(addTodoAction, addTodActionSaga);

}