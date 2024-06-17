
import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';

/**
 * @example
 *
 * getList          => GET http://my.api.url/tasks
 * getOne           => GET http://my.api.url/tasks/123
 * getMany          => GET http://my.api.url/tasks
 * getManyReference => GET http://my.api.url/tasks/project/123
 * update           => PUT http://my.api.url/tasks/123
 * create           => POST http://my.api.url/tasks
 * delete           => DELETE http://my.api.url/tasks/123
 * register         => POST http://my.api.url/auth/register
 */
const fetchJson = (url: string, options: any = {}) => {
  if (!options.headers)
    options.headers = new Headers({ Accept: 'application/json' });

  const authedUser = localStorage.getItem('auth');
  const token = authedUser && JSON.parse(authedUser)?.token;
  options.headers.set('Authorization', `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
};

const restProvider = (
    apiUrl: string,
    httpClient = fetchUtils.fetchJson,
): DataProvider => ({
    getList: (resource) => {
      const url = `${apiUrl}/${resource}`;

      return httpClient(url).then(({ json }) => {
        return {
          data: json,
          total: json.length,
        };
      });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.target}/${params.id}`;
      return httpClient(url).then(({ json }) => {
        return {
            data: json,
            total: json.length,
        };
      });
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'text/plain',
            }),
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                    }),
                })
            )
        ).then(responses => ({
            data: responses.map(({ json }) => json.id),
        })),

    register: (params: { email: string; name: string, password: string }) =>
      httpClient(`${apiUrl}/auth/register`, {
          method: 'POST',
          body: JSON.stringify(params),
      }),
});

export const dataProvider = restProvider(import.meta.env.VITE_SIMPLE_REST_URL, fetchJson);
