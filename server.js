const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const next = require('next')

const port = process.env.PORT || 3000;

const nextApp = next({ dev: true })
const nextHandler = nextApp.getRequestHandler()


let numUsers = 0;
io.on('connection', (socket) => {
  let addedUser = false;

  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      message: data
    });
  });

  socket.on('add user', (username) => {
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;

    socket.emit('login', {
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});


nextApp.prepare().then((() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })
}))

server.listen(port, (err) => {
  if (err) throw err
  console.log('Server listening at port', port);
});