import Query from './Query';
import Filter from './Filter';
import Resource from './Resource';
import search from './filters/search';

export default function createResource<T>(
    data: T[],
    filters: Filter<T>[] | null = null
): (query?: Partial<Query>) => T[] {
    const resource = new Resource(data, filters || [
        search()
    ]);

    return (queryParameters: Partial<Query> = {}) =>
        resource.query(new Query(queryParameters));
}
