function FetchErrorException(code, statusText, response, xrId) {
  this.code = code;
  this.response = response;
  this.statusText = statusText;
  this.errorId = xrId;
}

const handleErrors = (res) => {
  let xrId = '';
  for(let entry of res.headers.entries()) {
    if (entry[0] === 'x-request-id') {
      xrId = entry[1];
    }
  }
  if (res.ok) {
    return res;
  }
  throw new FetchErrorException(res.status, res.statusText, res, xrId);
};

export default async function fetchWithErrorHandling(url, options) {
  return fetch(url, options)
    .catch((e) => { throw Error(e); })
    .then(handleErrors)
    .then((res) => res);
}
