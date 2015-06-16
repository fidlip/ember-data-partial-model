export default function() {
  this.namespace = '/api';

  this.get('/users');
  this.get('/users/:id', function(db, request) {
    var id = request.params.id;

    return {
      user: db.user_extendeds.find(id)
    };
  });

  this.post('/users', function(db, request) {
    var attrs = JSON.parse(request.requestBody);
    var user = db.users.insert({ name: attrs.user.name });
    var userExtended = db.user_extendeds.insert(attrs.user);

    return {
      user: userExtended
    };
  });

  this.put('/users/:id', function(db, request) {
    var id = request.params.id;
    var attrs = JSON.parse(request.requestBody)['user'];
    var record = db.user_extendeds.update(id, attrs);

    return {
      user: record
    };
  });
}
