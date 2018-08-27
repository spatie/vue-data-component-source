import Resource from './Resource';

export default function createResource(data, options) {
    const resource = new Resource(data, options);

    return resource.query.bind(resource);
}

export { Resource };

export { default as sort } from './filters/sort';
export { default as search } from './filters/search';
