var users = [
  { _id: 'sdfhsdklfnsdf', Name: 'ElIvan', chatrooms: ['idachtroom', 'idachtroom2'] },
  { _id: 'sdfhsdklfnsdf', Name: 'Pepe', chatrooms: ['idachtroom', 'idachtroom2'] }
]

var chatrooms = [
  {
    _id: 'idachtroom',
    admin: 'sdfhsdklfnsdf',
    name: 'group name',
    description: 'group description',
    users: [
      {
        _id: 'sdfhsdklfnsdf',
        name: 'ElIvan',
        joinDate: 'Wed Jul 29 2020 15:05:09 GMT-0500 (hora estándar de Perú)',
        lastView: 'Wed Jul 29 2020 17:05:09 GMT-0500 (hora estándar de Perú)',
        state: 'active' //'leave','leavecomplete'
      },
      {
        _id: 'jdfkjgndfkjng',
        Name: 'Pepe',
        JoinDate: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        LastView: 'Wed Jul 29 2020 21:05:09 GMT-0500 (hora estándar de Perú)',
        state: 'active' //'leave','leavecomplete'
      }
    ],
    Events: [
      {
        date: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        type: 'join', //left
        name: ''
      }
    ],
    Conversation: [
      {
        user_id: 'sdfhsdklfnsdf',
        date: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        message: 'Hola como estas?',
        ReplyFrom: ''
      },
      {
        user_id: 'sdfhsdklfnsdf',
        date: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        message: 'Yo estoy perfecto',
        attach: {}
      }
    ]
  },
  {
    _id: 'idachtroom',
    admin: 'sdfhsdklfnsdf',
    users: [
      {
        _id: 'sdfhsdklfnsdf',
        name: 'ElIvan',
        joinDate: 'Wed Jul 29 2020 15:05:09 GMT-0500 (hora estándar de Perú)',
        lastView: 'Wed Jul 29 2020 17:05:09 GMT-0500 (hora estándar de Perú)',
        state: 'active' //'leave','leavecomplete'
      },
      {
        _id: 'jdfkjgndfkjng',
        Name: 'Pepe',
        JoinDate: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        LastView: 'Wed Jul 29 2020 21:05:09 GMT-0500 (hora estándar de Perú)',
        state: 'active' //'leave','leavecomplete'
      }
    ],
    Events: [
      {
        date: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        type: 'join', //left
        name: ''
      }
    ],
    Conversation: [
      {
        user_id: 'sdfhsdklfnsdf',
        date: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        message: 'Hola como estas?',
        ReplyFrom: ''
      },
      {
        user_id: 'sdfhsdklfnsdf',
        date: 'Wed Jul 29 2020 19:05:09 GMT-0500 (hora estándar de Perú)',
        message: 'Yo estoy perfecto',
        attach: {}
      }
    ]
  }
]
