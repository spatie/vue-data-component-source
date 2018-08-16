import createResource, { Resource } from '../index';
import people from './helpers/people';

it('can be created as a class', () => {
    const userResource = new Resource(people);

    expect(userResource.query()).toEqual({ data: people, totalCount: 7 });
});

it('can be created as a function', () => {
    const userResource = createResource(people);

    expect(userResource()).toEqual({ data: people, totalCount: 7 });
});

it('returns a total count', () => {
    const userResource = createResource(people);

    const result = userResource({ perPage: 2 });

    expect(result).toEqual({
        data: [{ name: 'Willem', job: 'Designer' }, { name: 'Freek', job: 'Developer' }],
        totalCount: 7,
    });
});
