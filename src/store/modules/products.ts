import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";
import {
  fbAppDatabaseTs,
  loadFirebaseDatabaseAsyncModule,
} from "@/utils/firebase/FBCustDatabase";

/*
   ---------------------- Mutations -------------------------------
 */

export type MutationPayload = {
  products_addCategory: string;
};

export const mutations: MutationTree<State> & Mutations = {
  products_addCategory({ products }, payload) {
    products.categoryList.push(payload);
  },
};

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  doubledCounter(state: State): number;
  counterGet(state: State): number;
  products_categoriesGet(state: State): Array<string>;
};

export const getters: GetterTree<State, State> & Getters = {
  doubledCounter: ({ counter }) => {
    return counter.counter * 2;
  },
  counterGet: ({ counter }) => {
    return counter.counter;
  },
  products_categoriesGet: ({ products }) => products.categoryList,
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  products_LoadCategories: [payload: null, returnVal: Promise<void>];
};

export const actions: Actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async products_LoadCategories({ commit }): Promise<void> {
    await loadFirebaseDatabaseAsyncModule();
    const querySnapshot = await fbAppDatabaseTs.collection("categories").get();
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const allObjectData = { firebaseID: doc.id, ...doc.data() };
      commit("products_addCategory", (allObjectData as any).categoryName);
      // console.log(allObjectData);
    });
  },
};

// ============================================================================

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
