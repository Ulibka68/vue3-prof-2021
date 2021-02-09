import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";
import { fbAppAuth } from "@/utils/firebase/FBCustInit";
import { logout } from "@/utils/firebase/FBCustAuth";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addUser,
  fbAppDatabaseTs,
  CheckFirebaseDatabaseLoad,
} from "@/utils/firebase/FBCustDatabase.js";
/* eslint-enable */

import { store } from "@/store";

/*
   ---------------------- Declarations ----------------------------
 */

const EmptyUser = {
  displayName: "Неизвестный",
  email: "",
  uid: "",
  provider: "none",
  isAuth: false,
};

/*
   ---------------------- Mutations this is your code----------------------------
 */

export type MutationPayload = {
  // changeUserName: string;
  auth_setCurrentUser: typeof initialState.logedUser;
  auth_setCurrentUserName: string;
  auth_setEmptyUser: null;
  auth_storeFirebaseCurrentUser: void;
};

export const mutations: MutationTree<State> & Mutations = {
  // changeUserName({ auth }, newUserName) {
  //   auth.name = newUserName;
  // },
  auth_setCurrentUser(state, newUser) {
    state.logedUser = newUser;
  },
  auth_setCurrentUserName(state, newUserName) {
    state.logedUser.displayName = newUserName;
  },
  auth_setEmptyUser(state) {
    state.logedUser = EmptyUser;
    // <html>TS2322: Type '
    // { displayName: string; email: string; uid: null; provider: string; isAuth: boolean; }' is not assignable to type '
    // { displayName: string; email: string; uid: string; provider: string; isAuth: boolean; }'.<br/>Types of property 'uid' are incompatible.<br/>Type 'null' is not assignable to type 'string'.
  },
  auth_setAuth(state, authState) {
    state.logedUser.isAuth = authState;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  auth_storeFirebaseCurrentUser(state) {
    const user = fbAppAuth.currentUser;
    if (user) {
      const { displayName, email, emailVerified, uid } = user;
      console.log({
        displayName,
        email,
        emailVerified,
        uid,
      });

      store.commit("auth_setCurrentUser", {
        displayName,
        email,
        emailVerified,
        uid,
        provider: "email",
        isAuth: true,
      });
    } else {
      store.commit("auth_setEmptyUser");
    }
  },
};

/*
   ---------------------- Mutations - no change code ------------------------
 */

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: State,
    payload: MutationPayload[Property]
  ) => void;
};

type State = typeof initialState;

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  currentUser(state: State): string;
  currentUserUid(state: State): string;
  isLogged(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  // userGet: ({ auth }) => {
  //   return auth;
  // },

  currentUser: ({ logedUser }) => logedUser.displayName,
  currentUserUid: (state) => state.logedUser.uid,
  isLogged: (state) => state.logedUser.isAuth,
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  auth_setCurrentUserAction: [
    payload: typeof initialState.logedUser,
    returnVal: void
  ];
  auth_setEmptyUserAction: [payload: null, returnVal: void];
  auth_logOut: [payload: null, returnVal: void];
};

export const actions: Actions = {
  auth_setCurrentUserAction({ commit }, newUser) {
    commit("auth_setCurrentUser", newUser);
  },
  auth_setEmptyUserAction({ commit }) {
    commit("auth_setEmptyUser", null);
  },
  auth_logOut({ commit }) {
    logout();
    commit("auth_setEmptyUser", null);
  },
};

/*
   ---------------------- Actions no change code -----------------------------
 */

type Actions = {
  [Property in keyof ActionsPayload]: (
    augContext: AugmentedActionContext,
    payload: ActionsPayload[Property][0]
  ) => ActionsPayload[Property][1];
};

type AugmentedActionContext = {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & Omit<ActionContext<State, State>, "commit">;
