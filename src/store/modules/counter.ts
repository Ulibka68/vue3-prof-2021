import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";

/*
   ---------------------- Mutations -------------------------------
 */

export type MutationPayload = {
  counter_setOne: void;
  counter_setAdd: number;
  counter_setMulti: { addCnt1: number; addCnt2: number };
};

export const mutations: MutationTree<State> & Mutations = {
  counter_setOne({ counter }) {
    counter.counter = 0;
  },
  counter_setAdd({ counter }, payload) {
    counter.counter += payload;
  },
  counter_setMulti({ counter }, payload) {
    counter.counter += payload.addCnt1 + payload.addCnt2;
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
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  counter_doubledCounter(state: State): number;
  counter_counterGet(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  counter_doubledCounter: ({ counter }) => {
    return counter.counter * 2;
  },
  counter_counterGet: ({ counter }) => {
    return counter.counter;
  },
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  counter_setOneA: [payload: void, returnVal: void];
  counter_setAddA: [payload: number, returnVal: number];
  counter_setMultiA: [
    payload: { addCnt1: number; addCnt2: number },
    returnVal: Promise<number>
  ];
};

export const actions: Actions = {
  counter_setOneA({ commit }): void {
    commit("counter_setOne", (null as unknown) as void);
  },
  counter_setAddA({ commit, state }, payload: number): number {
    commit("counter_setAdd", payload);
    return state.counter.counter;
  },
  async counter_setMultiA(
    con: AugmentedActionContext,
    payload: { addCnt1: number; addCnt2: number }
  ): Promise<number> {
    await setTimeout(() => {
      con.commit("counter_setMulti", payload);
    }, 2000);

    return new Promise<number>(() => 1);
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
