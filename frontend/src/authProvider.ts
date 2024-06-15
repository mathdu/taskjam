import { AuthProvider } from 'react-admin';

const authUrl = `${import.meta.env.VITE_SIMPLE_REST_URL}/auth/login`;

export const authProvider: AuthProvider = {
  login: ({ username, password }) =>  {
    const request = new Request(authUrl, {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then(response => {
          if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
          }
          return response.json();
      })
      .then(auth => {
          localStorage.setItem('auth', JSON.stringify(auth));
      })
      .catch(() => {
          throw new Error('Network error')
      });
  },
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem('auth');
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
