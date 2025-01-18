import { CategoryMap } from "./categories.types";

import { createSelector } from "reselect";

// this basic selector retreive categories state from react redux
const selectCategoriesReducer = (state) => state.categories;

// this memoize selector extract and return categories array from categories slice
const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// this memoized selector transforms the categories array into an object where each category title serve as a key, and the associated value is array of items of that category
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.isLoading
);
