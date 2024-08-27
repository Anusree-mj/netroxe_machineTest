import { fork, all } from "redux-saga/effects";

import { userAuthWatcher } from "./userAuthSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userAuthWatcher),
    ]);
}
