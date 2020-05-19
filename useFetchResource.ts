import {useQuery, Action} from 'react-fetching-library';

export const useFetchResource = (): any => {
  const action: Action = {
    method: 'GET',
    endpoint: 'http://www.mocky.io/v2/5ec3d0fe300000f8c339c439',
  };
  let {payload, loading, error, errorObject} = useQuery(action);
  const mainResource = payload;
  return {
    loading: loading,
    error: error,
    errorObject: errorObject,
    mainResource: mainResource,
  };
};
