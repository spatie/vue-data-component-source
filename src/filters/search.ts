import { Query } from '../Resource';

interface SearchOptions {
    fields: Array<string>;
    getQuery: (filter: any) => string;
    minQueryLength: number;
}

const defaultSearchOptions = {
    fields: ['*'],
    getQuery: (filter: any) => <string>filter,
    minQueryLength: 0,
};

export default function search(searchOptions: Partial<SearchOptions> = {}) {
    const { fields, getQuery, minQueryLength } = { ...defaultSearchOptions, ...searchOptions };

    return function<T>(data: T[], query: Query): T[] {
        const searchQuery = normalizeQuery(getQuery(query.filter));

        if (!searchQuery || searchQuery.length < minQueryLength || data.length === 0) {
            return data;
        }

        const searchAllFields = fields.indexOf('*') !== -1;

        return data.filter(item => {
            const filterableFields = searchAllFields ? Object.keys(item) : fields;

            return (
                filterableFields
                    .map(field => (<any>item)[field])
                    .join('')
                    .toLowerCase()
                    .replace(/[^A-Za-z0-9]*/g, '')
                    .indexOf(searchQuery) !== -1
            );
        });
    };
}

function normalizeQuery(query: any): string {
    if (query && typeof query !== 'string') {
        throw new Error('Filter must be a string');
    }

    if (!query) {
        return '';
    }

    return query.toLowerCase().replace(/[^A-Za-z0-9]*/g, '');
}
