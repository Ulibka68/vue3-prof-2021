import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";
// операции с корзиной
/*
   ---------------------- Mutations -------------------------------
 */

export type MutationPayload = {
  setOneBasket: void;
};

export const mutations: MutationTree<State> & Mutations = {
  setOneBasket({ counter }) {
    counter.counter = 0;
  },
};

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  doubledCounterBasket(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  doubledCounterBasket: ({ counter }) => {
    return counter.counter * 2;
  },
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  setOneABasket: [payload: void, returnVal: void];
};

export const actions: Actions = {
  setOneABasket({ commit }): void {
    commit("setOne", (null as unknown) as void);
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
