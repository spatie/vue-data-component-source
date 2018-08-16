import search from '../filters/search';
import people from './helpers/people';
import { createQuery } from './helpers/util';

it("searches all fields by specifying `['*']`", () => {
    const searchAll = search();

    const results = searchAll(people, createQuery({ filter: 'Seb' }));

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Sebastian');
});

it('searches specific fields when specified', () => {
    const searchName = search({
        fields: ['name'],
    });

    let results = searchName(people, createQuery({ filter: 'Developer' }));

    expect(results).toHaveLength(0);

    results = searchName(people, createQuery({ filter: 'Seb' }));

    expect(results).toHaveLength(1);
    expect(results).toEqual([{ name: 'Sebastian', job: 'Developer' }]);
});

it('searches case insensitively', () => {
    const searchAll = search();

    const results = searchAll(people, createQuery({ filter: 'seb' }));

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Sebastian');
});

it("doesn't search when minQueryLength isn't met", () => {
    const searchAll = search({
        minQueryLength: 5,
    });

    let results = searchAll(people, createQuery({ filter: 'seb' }));

    expect(results).toEqual(people);

    results = searchAll(people, createQuery({ filter: 'sebas' }));

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Sebastian');
});

it('searches with a custom query with getQuery', () => {
    const searchAll = search({
        getQuery: filter => filter.query,
    });

    const results = searchAll(people, createQuery({ filter: { query: 'Seb' } }));

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Sebastian');
});
