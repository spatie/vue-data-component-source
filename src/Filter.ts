import Query from './Query';

type Filter<T> = (data: Array<T>, query: Query) => Array<T>

export default Filter;
