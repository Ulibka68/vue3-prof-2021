import algoliasearch, { SearchIndex } from "algoliasearch";

export type { SearchResponse } from "@algolia/client-search";

import { algoliaConfig } from "../../algoliaConf";

// начальная инициализация при загрузке

const client = algoliasearch(
  algoliaConfig.ALGOLIA_ID,
  algoliaConfig.ALGOLIA_SEARCH_KEY
);
export const algoliaIndex: SearchIndex = client.initIndex(
  algoliaConfig.ALGOLIA_INDEX_NAME
);
