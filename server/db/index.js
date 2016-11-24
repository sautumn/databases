var mysql = require('mysql');
var Promise = require('bluebird');


var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

con.connect(function(err) {
  if (err) {
    console.log('error');
    return;
  }
  console.log('connection established');
});

con.query('USE Chat');

var query = function(query) {
  return new Promise(function(resolve, reject) {
    con.query(query, function(err, rows) {
      if (err) {
        reject(err);
      } else if (rows.length === 0) {
        reject();
      } else {
        resolve(rows);
      }
    });
  });
};
module.exports.getUser = function(name) {
  return query('SELECT id FROM users WHERE name = \"' + name + '\";');
};

module.exports.getRoom = function(room) {
  return query('SELECT id FROM rooms WHERE name = \"' + room + '\";');
};

module.exports.getRoomUser = function(user, room) {
  console.log('user', user, 'room', room);
  console.log('SELECT r.id, u.id FROM users u INNER JOIN ' +
    'rooms r ON u.name=\"' + user + '\" AND r.name=\"' + room + '\";');
  return query('SELECT r.id, u.id FROM users u INNER JOIN ' +
    'rooms r ON u.name=\"' + user + '\" AND r.name=\"' + room + '\";'); 
};

module.exports.getMessages = function(messages) {
  return query('SELECT m.message, u.name, r.name m.createdAt FROM ' +
    'messages m ' +
    'INNER JOIN users u ' +
    'on m.user_id = u.id ' +
    'INNER JOIN rooms r ' +
    'on m.room_id = r.id;');
};
module.exports.getUserMessages = function(user) {
  return query('SELECT m.message, u.name, r.name m.createdAt FROM ' +
    'messages m ' +
    'INNER JOIN users u ' +
    'on m.user_id = u.id AND u.name = ' + user +
    ' INNER JOIN rooms r ' +
    'on m.room_id = r.id;');
};

module.exports.getRoomMessages = function(room) {
  return query('SELECT m.message, u.name, r.name m.createdAt FROM ' +
    'messages m ' +
    'INNER JOIN users u ' +
    'on m.user_id = u.id ' +
    'INNER JOIN rooms r ' +
    'on m.room_id = r.id AND r.name = ' + room + ';');
};

module.exports.insertRoom = function(room) {
  var obj = {};
  obj.name = room;
  con.query('INSERT INTO rooms SET ?', obj, function(err, result) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.insertUser = function(user) {
  var obj = {};
  obj.name = user;
  console.log(user);
  con.query('INSERT INTO users SET ?', obj, function(err, result) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.insertMessage = function(user, message, room) {
  console.log('hello');
  var msg = {};
  msg.message = message;
  msg.createdAt = new Date();
  module.exports.getRoomUser(user, room).then(function(result) {
    console.log('hey', result);
    msg.user_id = result[0].id; 
    msg.room_id = result[1].id;
  }).then(function() {
    con.query('INSERT INTO messages SET ?', msg, function(err, result) {
      if (err) {
        console.log(err);
      }
    });
  });
};
module.exports.insertMessage('thor', 'hello', 'lobby');