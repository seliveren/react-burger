export const cookieValue = document.cookie
  .split('; ')
  .find((el) => el.startsWith('refreshToken='))
  ?.split('=')[1];


type TProps = {
  expires?: Date | number | string,
  path?: string,
  domain?: string,
  secure?: boolean,
}


export function setCookie(name: string, value: string, props?: TProps) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  let propName: keyof TProps;
  for (propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}


export function getCookie(name: string | undefined) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name?.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export function deleteCookie(name: string) {
  setCookie(name, '', {expires: -1});
}