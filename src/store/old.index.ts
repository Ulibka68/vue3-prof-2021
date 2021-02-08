import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore,
} from "vuex";
import { InjectionKey } from "vue";

export type tMessage = { value: string; type: string };

export const statusArr = ["done", "canceled", "active", "pending"] as const;
export type tStatus = typeof statusArr[number];

// define your typings for the store state
export interface tRootState {
  message: tMessage | null;
  sidebar: boolean;
}

/* eslint-disable */
export interface tOneRequest {
  fio: string;
  phone: string;
  amount: number;
  status: tStatus;
  id: any;
}
/* eslint-enable */

const plugins = [];
if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

export const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});

// define injection key
export const key: InjectionKey<Store<tRootState>> = Symbol();

export function useStore(): Store<tRootState> {
  return baseUseStore(key);
}
