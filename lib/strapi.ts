import qs from 'qs';

interface Query {
    populate: string | string[] | Record<string, unknown>,
    fields: string[],
    filters: {
        [key: string]: { [operator in Operator]?: string } | string | number,
    },
}

type Operator = '$eq' | '$eqi' | '$ne' | '$nei' | '$gt' | '$gte' | '$lt' | '$lte' | '$in' | '$notIn' | '$contains' | '$notContains' | '$containsi' | '$notContainsi' | '$null' | '$notNull' | '$between' | '$startsWith' | '$startsWithi' | '$endsWith' | '$endsWithi' | '$not' | '$and' | '$or'


interface Props {
    endpoint: string;
    query?: Partial<Query>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
    endpoint,
    query,
    wrappedByKey,
    wrappedByList,
}: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }

    const url = new URL(`/api/${endpoint}`, import.meta.env.STRAPI_URL ?? process.env.STRAPI_URL);

    url.href += qs.stringify(query, { addQueryPrefix: true, });

    const res = await fetch(url.toString());
    let data = await res.json();

    if (wrappedByKey) {
        data = data[wrappedByKey];
    }

    if (wrappedByList) {
        data = data[0];
    }

    return data as T;
}