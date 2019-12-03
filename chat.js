let clients = [];

exports.subscribe = function(req, res) {
  clients.push(res);
}

exports.publish = function(message) {
  clients.forEach(client => client.end(message));
  clients = [];
}
