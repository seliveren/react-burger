function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}