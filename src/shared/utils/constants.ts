export const API_CONFIG = {
  BASE_URL: "https://jsonplaceholder.typicode.com",
  TIMEOUT: 10000,
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  CACHE_TIME: 10 * 60 * 1000,
  RETRY: 1,
  RETRY_DELAY: 1000,
} as const;

export const TABLE_CONFIG = {
  ROWS_PER_PAGE_OPTIONS: [5, 10, 25],
  DEFAULT_ROWS_PER_PAGE: 10,
} as const;
