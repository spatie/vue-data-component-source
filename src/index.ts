import Query from './Query';
import Resource, { ResourceOptions } from './Resource';

export default function createResource<T>(
    data: T[],
    options: Partial<ResourceOptions<T>> = {}
): (query?: Partial<Query>) => T[] {
    const resource = new Resource(data, options);

    return resource.query.bind(resource);
}

export { Resource }

export { default as sort } from './filters/sort';
export { default as search } from './filters/search';
