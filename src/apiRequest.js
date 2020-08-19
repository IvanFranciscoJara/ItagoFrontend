let Api = GLOBAL_URL

async function ApiRequest(route, data, method) {
  console.log('API_REQUEST', 'ruta', route)
  let response = await fetch(`${Api}${route}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      xtoken: localStorage.getItem('token') // Enviando token actual
    },
    body: JSON.stringify(data)
  })
  var info = await response.json()
  for (var entry of response.headers.entries()) {
    if (entry[0] === 'refreshtoken' && entry[1] !== '') {
      localStorage.setItem('token', entry[1])
    }
  }
  console.table('API_REQUEST', 'Respuesta', info)
  return info
}

export default ApiRequest
