import { Query } from '../Resource';

export default function paginate() {
    return function <T>(data: T[], query: Query): T[] {
        if (!query.perPage) {
            return data;
        }

        const page = query.page || 1;

        const fromIndex = (page - 1) * query.perPage;
        const toIndex = fromIndex + query.perPage;

        return data.slice(fromIndex, toIndex);
    }
}
