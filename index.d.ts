type Query = {
    filter: any,
    sort: string|null,
    page: number|null,
    perPage: number|null,
}

type Filter<T> = (data: Array<T>, query: Query) => Array<T>
