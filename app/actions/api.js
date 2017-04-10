import md5 from 'react-native-md5'

const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://eggpeg.superserious.co';

const api = {
  get: function(path, options) {
    const params = Object.assign({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, options || {})

    return api.request(path, Object.assign(params, options || {}));
  },

  post: function(path, body, options) {
    const params = Object.assign({
      method: 'POST',
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }, options || {})

    return api.request(path, params)
  },

  signedPost: function(path, body, options) {
    if( path[0] != '/' ) path = `/${path}`

    const bodyString = Object.keys(body).sort().map(function(k) {
      return k + ':' + body[k]
    }).join(',')
    const digest = path + ',' + bodyString
    const hash = md5.b64_hmac_md5(digest, 'sicknasty');

    const params = Object.assign({
      method: 'POST',
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-Signature':  hash,
      },
    }, options || {})
    return api.request(path, params)
  },

  request: function(path, options) {
    if( path[0] != '/' ) path = `/${path}`;
    return fetch(
      `${baseUrl}${path}`,
      options,
    ).then((response) => {
      if( !response.ok ) { throw new Error('' + response.status) }
      if( response.status === 204 ) { return true }
      return response.json()
    })
  }
}

export default api
