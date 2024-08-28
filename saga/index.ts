import { fork, all } from "redux-saga/effects";

import { userAuthWatcher } from "./userAuthSaga";
import { todoWatcher } from "./todoSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userAuthWatcher),
        yield fork(todoWatcher),

    ]);
}
