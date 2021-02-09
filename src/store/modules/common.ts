// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sidebar = true;
  },
  sidebar_closeSidebar({ sidebar }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { commit, state },
    payload: { value: string; type: MessageType }
  ): void {
    state.message.type = payload.type;
    state.message.value = payload.value;
    setTimeout(() => {
      commit("message_clearMessage", null);
    }, 4000);
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
