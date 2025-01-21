import { all, call, put, takeLatest } from "typed-redux-saga";
import { User } from "firebase/auth";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  getCurrentUser,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {
  EmailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  SignUpStart,
  SignUpSuccess,
  signUpSuccess,
} from "./user.action";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUpEmail({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, displayName));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInGooglePopUp() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* signInAfterSignUpSuccess({
  payload: { auth, displayName },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, auth, { displayName });
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpEmail);
}

export function* onSignUpSuccess() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    signInAfterSignUpSuccess
  );
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInGooglePopUp);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInEmail);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignUpStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
