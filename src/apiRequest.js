let Api = GLOBAL_URL

async function ApiRequest(route, data, method) {
  console.log('😍', 'iniciando apirequest')
  let response = await fetch(`${Api}${route}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  var info = await response.json()
  console.log('😍', 'finalizando apirequest')
  return info
}

export default ApiRequest
