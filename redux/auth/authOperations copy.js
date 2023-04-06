import db from "../../firebase/config";
import { authSlice } from "./authReducer";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

const auth = getAuth(db);

export const authSignUpUser =
  ({ email, password, userName }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      user.updateProfile({
        displayName: userName,
      });

      const { displayName, uid } = auth.currentUser;

      dispatch(authStateChange({ stateChange: true }));
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
        })
      );
      console.log("user", user);
      console.log("auth", auth);
      console.log("uid", uid);
      console.log("displayName", displayName);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authStateChange({ stateChange: true }));
      // console.log("user SignInUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateCahngeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const userUpdateProfile = {
          userName: user.displayName,
          userId: user.uid,
          userEmail: user.email,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    throw error;
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};
