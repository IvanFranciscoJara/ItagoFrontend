var app = require('express')()
var http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('<h1>Servidor ChatApp</h1>')
})

io.on('connection', socket => {
  // console.log('Se conecto un usuario', socket.id, clientes)

  socket.on('registro', data => {
    let NewCliente = {}
    if (data.idUsuario !== null && data.usuario !== null && data.idUsuario !== '') {
      NewCliente.ID_SOCKET = socket.id
      NewCliente.ID = data.idUsuario
      NewCliente.USUARIO = data.usuario
      clientes.push(NewCliente)
      console.log(data, clientes)
    } else {
      console.log('No se inserta vacio :DDD')
    }
    console.log('registro', JSON.stringify(clientes))
    io.emit('UsuariosDisponibles', clientes)
  })

  socket.on('mensaje_cliente_a_cliente', MENSAJE => {
    // MENSAJE.DESTINO
    console.log(MENSAJE)
    let IndexOrigen = clientes.findIndex(Cliente => Cliente.ID_SOCKET === socket.id)
    let IndexDestino = clientes.findIndex(Cliente => Cliente.ID === MENSAJE.DESTINO)
    // console.log(Index)
    if (IndexDestino !== -1) {
      // Solo envia si el usuario esta conectado
      io.to(clientes[IndexDestino].ID_SOCKET).emit('mensaje_cliente_a_cliente', {
        Origen: clientes[IndexOrigen].ID,
        Mensaje: MENSAJE.MENSAJE,
        Hora: MENSAJE.HORA,
        ReplyFrom: MENSAJE.REPLYFROM
      })
    }
    // console.log(Index, clientes[Index].ID_SOCKET)
    // socket.broadcast.emit('mensaje_servidor_a_cliente', message)
  })

  socket.on('usuario_revisado', MENSAJE => {
    console.log('Usando usuario_revisado')
    console.log(MENSAJE)
    let IndexOrigen = clientes.findIndex(Cliente => Cliente.ID_SOCKET === socket.id)
    let IndexDestino = clientes.findIndex(Cliente => Cliente.ID === MENSAJE.UsuarioRevisado)
    if (IndexDestino !== -1) {
      // Solo envia si el usuario esta conectado
      io.to(clientes[IndexDestino].ID_SOCKET).emit('usuario_revisado', {
        UsuarioQueReviso: clientes[IndexOrigen].ID,
        Hora: MENSAJE.Hora
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('Hubo una desconección', socket.id)
    let Index = clientes.findIndex(Cliente => Cliente.ID_SOCKET === socket.id)
    console.log(Index)
    if (Index !== -1) {
      clientes.splice(Index, 1)
    }
    console.log('disconnect', JSON.stringify(clientes))
    io.emit('UsuariosDisponibles', clientes)
    // const username = users[client.id];
    // delete users[client.id];
    // io.emit("disconnected", client.id);
  })
})

http.listen(3005, () => {
  console.log('listening on *:3005')
})

let clientes = []
