import search from './filters/search';
import sort from './filters/sort';
import paginate from './filters/paginate';

export interface ResourceOptions<T> {
    filters: Filter<T>[];
    defaultQuery: Partial<Query>;
}

export interface Query {
    filter: any;
    sort: string | null;
    page: number | null;
    perPage: number | null;
}

export type Filter<T> = (data: Array<T>, query: Query) => Array<T>;

export interface Result<T> {
    data: T[];
    totalCount: number;
}

export default class Resource<T> {
    data: T[];
    filters: Filter<T>[];
    defaultQuery: Query;

    constructor(data: T[], options: Partial<ResourceOptions<T>> = {}) {
        this.data = data;

        this.filters = options.filters || [search(), sort(), paginate()];

        this.defaultQuery = {
            filter: null,
            sort: null,
            page: null,
            perPage: null,
            ...options.defaultQuery,
        };
    }

    query(query: Partial<Query> = {}): Result<T> {
        const data = this.filters.reduce(
            (data, filter) =>
                filter(data, {
                    ...this.defaultQuery,
                    ...query,
                }),
            (<T[]>[]).concat(this.data)
        );

        return { data, totalCount: this.data.length };
    }
}
