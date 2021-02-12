import { GetterTree, MutationTree, ActionContext, CommitOptions } from "vuex";

import { initialState } from "../initialState";
import {
  fbAppDatabaseTs,
  loadFirebaseDatabaseAsyncModule,
} from "@/utils/firebase/FBCustDatabase";
import { algoliaIndex, SearchResponse } from "@/utils/algolia";
import { AlgoliaStore } from "@/store/data-types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { log } from "@/utils/log";

/*
   ---------------------- Getters -------------------------------
 */

export type Getters = {
  doubledCounter(state: State): number;
  counterGet(state: State): number;
  products_categoriesGet(state: State): Array<string>;
  algolia_getProducts(state: State): Array<AlgoliaStore>;
  algolia_getPage(state: State): number;
  algolia_getPagesCount(state: State): number;
  algolia_getNbHits(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  doubledCounter: ({ counter }) => {
    return counter.counter * 2;
  },
  counterGet: ({ counter }) => {
    return counter.counter;
  },
  products_categoriesGet: ({ products }) => products.categoryList,
  algolia_getProducts: ({ algolia }) => algolia.hits,
  algolia_getPage: ({ algolia }) => algolia.page,
  algolia_getPagesCount: ({ algolia }) => algolia.nbPages,
  algolia_getNbHits: ({ algolia }) => algolia.nbHits,
};

/*
  ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
  products_addCategory: string;

  algolia_setSearchResult: SearchResponse<AlgoliaStore>;
};

export const mutations: MutationTree<State> & Mutations = {
  products_addCategory({ products }, payload) {
    products.categoryList.push(payload);
  },

  algolia_setSearchResult({ algolia }, res) {
    algolia.nbHits = res.nbHits;
    algolia.nbPages = res.nbPages;
    algolia.page = res.page;
    algolia.hits = [...res.hits];
    algolia.hitsPerPage_result = res.hitsPerPage;
  },
};

/*
   ---------------------- Actions -------------------------------
 */

export type ActionsPayload = {
  products_LoadCategories: [payload: null, returnVal: Promise<void>];
  products_loadSearchGoods: [payload: null, returnVal: Promise<void>];

  search_setSelectedCategory: [payload: string, returnVal: Promise<void>];
  search_setSearchString: [payload: string, returnVal: Promise<void>];
  search_clearSearchString: [payload: null, returnVal: Promise<void>];
  algolia_setPage: [payload: number, returnVal: Promise<void>];
};

export const actions: Actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async products_LoadCategories({ commit, state }): Promise<void> {
    await loadFirebaseDatabaseAsyncModule();
    const querySnapshot = await fbAppDatabaseTs.collection("categories").get();
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const allObjectData = { firebaseID: doc.id, ...doc.data() };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // commit("products_addCategory", (allObjectData as any).categoryName);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.products.categoryList.push((allObjectData as any).categoryName);
      // console.log(allObjectData);
    });
  },
  async products_loadSearchGoods({ commit, state }): Promise<void> {
    const res = await algoliaIndex.search<AlgoliaStore>(
      state.products.searchString,
      {
        hitsPerPage: state.algolia.hitsPerPage,
        attributesToRetrieve: ["*"],

        page: state.algolia.page,
        facets: ["categoryName"],
        facetFilters: [[`categoryName:${state.products.selectedCategory}`]],
        getRankingInfo: true,
        analytics: false,
        attributesToSnippet: ["*:20"],
        responseFields: ["*"],
        maxValuesPerFacet: 100,
      }
    );
    commit("algolia_setSearchResult", res);
  },
  /*
   ******************
   */
  async search_setSelectedCategory({ state, dispatch }, category) {
    state.products.selectedCategory = category;
    state.algolia.page = 0;
    await dispatch("products_loadSearchGoods", null);
  },
  async search_setSearchString({ state, dispatch }, payload) {
    state.products.searchString = payload;
    state.algolia.page = 0;
    await dispatch("products_loadSearchGoods", null);
  },
  async search_clearSearchString({ state, dispatch }) {
    state.products.searchString = "";
    await dispatch("products_loadSearchGoods", null);
  },
  async algolia_setPage({ state, dispatch }, page) {
    state.algolia.page = page;
    await dispatch("products_loadSearchGoods", null);
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
