import _ from "lodash";

// return a single page of countries sliced from the total collection of items
export function paginate(countries, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(countries).slice(startIndex).take(pageSize).value();
}
