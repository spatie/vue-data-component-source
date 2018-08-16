import Query from './Query';
import Filter from './Filter';

export default class Resource<T> {
    data: T[];
    filters: Filter<T>[];

    constructor(data: T[], filters: Filter<T>[] = []) {
        this.data = data;
        this.filters = filters;
    }

    query(query: Query): T[] {
        return this.filters.reduce(
            (data, transformer) => transformer(data, query),
            (<T[]>[]).concat(this.data)
        );
    }
}
