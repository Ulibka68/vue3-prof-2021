import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState, MessageType } from "../initialState";

/*
   ---------------------- Mutations -------------------------------
 */

export type MutationPayload = {
  sidebar_openSidebar: null;
  sidebar_closeSidebar: null;
  message_clearMessage: null;
};

export const mutations: MutationTree<State> & Mutations = {
  sidebar_openSidebar({ sidebar }) {
    sidebar = true;
  },
  sidebar_closeSidebar({ sidebar }) {
    sidebar = false;
  },
  message_clearMessage({ message }) {
    message.type = "primary";
    message.value = "";
  },
};

/*
  ---------------------- Mutations - no change code ----------------------
*/

type Mutations = {
  [Property in keyof MutationPayload]: (
    state: State,
    payload: MutationPayload[Property]
  ) => void;
};

type State = typeof initialState;

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  setMessage: [payload: { value: string; type: MessageType }, returnVal: void];
};

export const actions: Actions = {
  setMessage(
    { commit, state },
    payload: { value: string; type: MessageType }
  ): void {
    state.message.type = payload.type;
    state.message.value = payload.value;
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
