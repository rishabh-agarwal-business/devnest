import { UrlFormQUeryParams, UrlRemoveQueryParams } from '@/types/global';
import qs from 'query-string';

export const formUrlQuery = ({ params, key, value }: UrlFormQUeryParams) => {
    const queryString = qs.parse(params);

    queryString[key] = value;

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString,
    })
}

export const removeKeysFromQuery = ({ params, keysToRemove }: UrlRemoveQueryParams) => {
    const queryString = qs.parse(params);

    keysToRemove.forEach((key: string) => delete queryString[key]);

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString,
    }, { skipNull: true })
}