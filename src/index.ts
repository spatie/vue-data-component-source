import Query from './Query';
import Resource, { ResourceOptions } from './Resource';
import search from './filters/search';

export { Resource }

export default function createResource<T>(
    data: T[],
    options: Partial<ResourceOptions> = {}
): (query?: Partial<Query>) => T[] {
    const resource = new Resource(data, options);

    return resource.query.bind(resource);
}
