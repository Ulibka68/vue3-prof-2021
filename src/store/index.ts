import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore,
} from "vuex";
import { InjectionKey } from "vue";

export type tMessage = { value: string; type: string };

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
export const key: InjectionKey<Store<any>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}
