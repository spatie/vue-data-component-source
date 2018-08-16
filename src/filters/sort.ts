import { Query } from '../Resource';

export default function sort() {
    return function<T>(data: T[], query: Query): T[] {
        if (!query.sort) {
            return data;
        }

        const sortOrder = query.sort.charAt(0) === '-' ? 'desc' : 'asc';
        const sortBy = sortOrder === 'desc' ? query.sort.slice(1) : query.sort;

        // Based on https://stackoverflow.com/a/4760279
        const compareFunction = (a: T, b: T) => {
            const sortOrderIndex = sortOrder === 'desc' ? -1 : 1;

            const result =
                a[sortBy as keyof T] < b[sortBy as keyof T]
                    ? -1
                    : a[sortBy as keyof T] > b[sortBy as keyof T]
                        ? 1
                        : 0;

            return result * sortOrderIndex;
        };

        return data.sort(compareFunction);
    };
}
