import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  createUserDocFromAuth,
  getCurrentUser,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess } from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocFromAuth,
      userAuth.uid,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInGooglePopUp() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInEmail({ payload: { email, password } }) {
  console.log("fired");
  try {
    const { user } = yield call(
      signInUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    console.log(error);
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInGooglePopUp);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInEmail);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
