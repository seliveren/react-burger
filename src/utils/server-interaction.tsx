import {baseUrl} from "./constants";


export type TRes = {
  success?: boolean;
  ok: boolean;
  status: number;
  json(): any;
  data?: [] | undefined;
  user?: {};
  accessToken?: string;
  refreshToken?: string;
  order?: {};
};


function checkResponse(res: TRes) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function checkSuccess(res: TRes) {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
}

export function request(endpoint: string, options?: {}) {
  return fetch(`${baseUrl}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}
