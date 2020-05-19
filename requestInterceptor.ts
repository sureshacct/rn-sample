import { RequestInterceptor } from 'react-fetching-library';
import { ClientIdentifer } from './Client';
import { Action } from 'react-fetching-library';

export const requestInterceptor: (
    clientIdentifier: ClientIdentifer,
    host: string,
    rootPath: string,
    baseParams: { [key: string]: any },
) => RequestInterceptor = (clientIdentifier, host, rootPath, baseParams) => () => async (
    action: Action,
) => {
    const modifiedAction = {
        ...action,
        endpoint: `${host}${rootPath}${action.endpoint}?${queryString({ ...baseParams, ...action.params })}`,
    };
    console.log(`clientIdentifier = ${clientIdentifier}, endpoint = ${modifiedAction.endpoint}`);
    return modifiedAction;
};

const queryString = (params: { [key: string]: any } = {}): string => {
    return Object.keys(params)
        .map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        })
        .join('&');
};