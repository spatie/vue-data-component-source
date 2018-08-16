import Query from './Query';
import Filter from './Filter';
import search from './filters/search';

export interface ResourceOptions<T> {
    filters: Filter<T>[]
    defaultQuery: Partial<Query>
}

export default class Resource<T> {
    data: T[];
    filters: Filter<T>[];
    defaultQuery: Query;

    constructor(data: T[], options: Partial<ResourceOptions<T>> = {}) {
        this.data = data;

        this.filters = options.filters || [search()];

        this.defaultQuery = {
            filter: null,
            sort: null,
            page: null,
            perPage: null,
            ...options.defaultQuery,
        };
    }

    query(query: Partial<Query> = {}): T[] {
        return this.filters.reduce(
            (data, transformer) => transformer(data, { ...this.defaultQuery, ...query }),
            (<T[]>[]).concat(this.data)
        );
    }
}
