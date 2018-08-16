import Query from '../../Query';

export function createQuery(partialQuery: Partial<Query> = {}): Query {
    return {
        filter: null,
        sort: null,
        page: null,
        perPage: null,
        ...partialQuery,
    };
}
