import { takeEvery, put, call } from 'redux-saga/effects';
import {
    addTodoAction, addTodoFailureAction, addTodoSuccessAction,
    getTodoAction, getTodoFailureAction, getTodoSuccessAction

} from '@/store/toDoReducer';
import { apiCall } from '@/services/api';


// add to do
function* addTodActionSaga(action: {
    type: string;
    payload: {
        userId: '', task: '', description: '', handleToDoAdd: () => void
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
            action.payload.handleToDoAdd()
        } else {
            yield put(addTodoFailureAction(response.message))
        }
    } catch (err) {
        yield put(addTodoFailureAction(err))
    }
}

// get to do
function* getTodoActionSaga(action: {
    type: string;
    payload: {
        userId: ''
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `todo/${action.payload.userId}`,
        });

        if (response.status === 'ok') {
            console.log('todo is saga', response.todos)
            yield put(getTodoSuccessAction(response.todos));
        } else {
            yield put(getTodoFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTodoFailureAction(err))
    }
}

export function* todoWatcher() {
    yield takeEvery(addTodoAction, addTodActionSaga);
    yield takeEvery(getTodoAction, getTodoActionSaga);

}