import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
} from "vuex";

import { initialState } from "./initialState";

import * as moduleAuth from "./modules/auth";
import * as moduleCommon from "./modules/common";
import * as moduleProducts from "./modules/products";

export type State = typeof initialState;

const plugins = [];
if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

export const store = createStore({
  state: initialState,
  mutations: {
    ...moduleAuth.mutations,
    ...moduleCommon.mutations,
    ...moduleProducts.mutations,
  },
  getters: { ...moduleAuth.getters, ...moduleProducts.getters },
  actions: {
    ...moduleAuth.actions,
    ...moduleCommon.actions,
    ...moduleProducts.actions,
  },
  plugins,
});

type MutationPayload = moduleAuth.MutationPayload &
  moduleCommon.MutationPayload &
  moduleProducts.MutationPayload;

type ActionsPayload = moduleAuth.ActionsPayload &
  moduleCommon.ActionsPayload &
  moduleProducts.ActionsPayload;

type Getters = moduleAuth.Getters & moduleProducts.Getters;

/*
  ---------------------- no change code ----------------------
*/

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & {
  dispatch<K extends keyof ActionsPayload>(
    key: K,
    payload: ActionsPayload[K][0],
    options?: DispatchOptions
  ): ActionsPayload[K][1];
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore(): Store {
  return store as Store;
}
