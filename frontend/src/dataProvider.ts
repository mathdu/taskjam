
import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';
// import simpleRestProvider from "ra-data-simple-rest";

/**
 * @example
 *
 * getList          => GET http://my.api.url/posts
 * getOne           => GET http://my.api.url/posts/123
 * getMany          => GET http://my.api.url/posts
 * getManyReference => GET http://my.api.url/posts/tasks/
 * update           => PUT http://my.api.url/posts/123
 * create           => POST http://my.api.url/posts
 * delete           => DELETE http://my.api.url/posts/123
 */

const fetchJson = (url: string, options: any = {}) => {
  if (!options.headers)
    options.headers = new Headers({ Accept: 'application/json' });

  const authedUser = localStorage.getItem('auth');
  const token = authedUser && JSON.parse(authedUser)?.token;
  options.headers.set('Authorization', `Bearer ${token}`);

  console.log(authedUser, token);
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
      const url = `${apiUrl}/${resource}/${params.target}/${params.id}}`;
      return httpClient(url).then(({ json }) => {
        return {
            data: json,
        };
      });
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
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

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
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
});

export const dataProvider = restProvider(import.meta.env.VITE_SIMPLE_REST_URL, fetchJson);
