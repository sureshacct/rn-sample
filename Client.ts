import {createClient, RequestInterceptor} from 'react-fetching-library';
import {requestInterceptor} from './requestInterceptor';

export type ClientIdentifer = 'search';
export type ServiceConfig = {[id in ClientIdentifer]?: APIClient};

export interface APIClient {
  host: string;
  basePath: string;
  defaultQueryParams: {[key: string]: string};
}

export const createAPIClient = (clients: ServiceConfig): any => {
  const requestInterceptors = Object.keys(clients)
    .map((id) => {
      const clientId = id as ClientIdentifer;
      const client = clients[clientId];
      if (!client) {
        return null;
      }
      return requestInterceptor(
        clientId,
        client.host,
        client.basePath,
        client.defaultQueryParams,
      );
    })
    .filter(Boolean) as RequestInterceptor[];
  return createClient({requestInterceptors: requestInterceptors});
};
