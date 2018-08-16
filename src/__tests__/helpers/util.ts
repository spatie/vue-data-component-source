export function createQuery(partialQuery: Partial<Query>): Query {
    return {
        fitler: null,
        sort: null,
        page: null,
        perPage: null,
        ...partialQuery,
    };
}
