module.exports = function(app) {
  var express = require('express');
  var profilesRouter = express.Router();
  var dataToSend = [
    { 
      id: 1, surname: 'Miloune', temperature_taking_hour: '07:00', temperature_taking_mode: 'Vaginal', cycles : [10,11,12]
    }
  ];
  profilesRouter.get('/', function(req, res) {
    res.send({
      'profiles': dataToSend
    });
  });

  profilesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  profilesRouter.get('/:id', function(req, res) {
    var id = req.query.id;
    var profiles;

    if (id) {
      profiles = dataToSend.filter(function(b) {
        return id.indexOf(b.id.toString()) > -1;
      });
    }
    else {
      profiles = dataToSend;
    }

    res.send({"profiles": profiles});
  });

  profilesRouter.put('/:id', function(req, res) {
    res.send({
      'profiles': {
        id: req.params.id
      }
    });
  });

  profilesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/profiles', profilesRouter);
};
