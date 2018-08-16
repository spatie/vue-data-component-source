import search from './filters/search';

const defaultQuery = {
    filter: null,
    sort: null,
    page: null,
    perPage: null,
};

export class Resource<T> {
    data: T[];
    filters: Filter<T>[];

    constructor(data: T[], filters: Filter<T>[] | null = null) {
        this.data = data;
        this.filters = filters || [search()];
    }

    query(query: Partial<Query> = {}): T[] {
        return this.filters.reduce(
            (data, transformer) => transformer(data, { ...defaultQuery, ...query }),
            (<T[]>[]).concat(this.data)
        );
    }
}

export default function createResource<T>(
    data: T[],
    filters: Filter<T>[] | null = null
): (query?: Partial<Query>) => T[] {
    const resource = new Resource(data, filters);

    return resource.query.bind(resource);
}
