import createResource, { Resource } from '../index';
import people from './helpers/people';

describe('fetcher', () => {
    it('can be created as a class', () => {
        const userResource = new Resource(people);

        expect(userResource.query()).toEqual(people);
    });

    it('can be created as a function', () => {
        const userResource = createResource(people);

        expect(userResource()).toEqual(people);
    });
});
