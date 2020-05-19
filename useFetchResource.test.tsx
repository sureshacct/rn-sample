import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { ClientContextProvider } from 'react-fetching-library';
import { useFetchResource } from './useFetchResource';
import { createAPIClient } from './Client';

describe('useFetchResource', () => {
  it('fetches resource and returns proper data on success', async () => {

    const resourceSuccess = {
      key: 'value',
    };
    const fetchFunction: () => Promise<any> = async () => ({
      error: false,
      status: 200,
      payload: resourceSuccess,
    });

    const Client = createAPIClient({
      search: {
        host: 'https://mockHost',
        basePath: 'mockPath',
        defaultQueryParams: {},
      },
    });
    Client.query = fetchFunction;

    const wrapper = ({ children }: any): any => (
      <ClientContextProvider client={Client}>{children}</ClientContextProvider>
    );

    jest.useFakeTimers();

    const { result } = renderHook<void, any>(() => useFetchResource(), {
      wrapper: wrapper,
    });

    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(false);
    expect(result.current.mainResource).toBeUndefined();

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(false);
  });
});
