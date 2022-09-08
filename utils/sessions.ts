import Cookies from 'js-cookie';

export const setSessionCookie = (session: any) => {
  Cookies.remove('session');
  Cookies.set('session', JSON.stringify(session), {
    expires: 14,
    sameSite: 'None'
  });
};

export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get('session');
  if (sessionCookie === undefined) {
    return {};
  }
  return JSON.parse(sessionCookie);
};
