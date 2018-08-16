export default class Query {
    filter: any
    sort: string|null
    page: number|null
    perPage: number|null

    constructor(parameters: Partial<Query>) {
        this.filter = parameters.filter || null;
        this.sort = parameters.sort || null;
        this.page = parameters.page || null;
        this.perPage = parameters.perPage || null;
    }
}
