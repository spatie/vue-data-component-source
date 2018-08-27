export function createQuery(partialQuery) {
    return {
        filter: null,
        sort: null,
        page: null,
        perPage: null,
        ...partialQuery,
    };
}
