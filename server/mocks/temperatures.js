module.exports = function(app) {
  var express = require('express');
  var temperaturesRouter = express.Router();
  var dataToSend = [
    {
      id: 111, temperature: 36.75, date:"2015-02-25T08:00:00", cycle:12
    },
    {
      id: 112, temperature: 36.95, date:"2015-02-26T08:00:00", cycle:12
    },
    {
      id: 113, temperature: 37.95, date:"2015-02-27T08:00:00", cycle:12
    },
    {
      id: 114, temperature: 37.60, date:"2015-02-28T08:00:00", cycle:12
    },
    {
      id: 115, temperature: 37.30, date:"2015-03-01T08:00:00", cycle:12
    },
    {
      id: 116, temperature: 37.00, date:"2015-03-02T08:00:00", cycle:12
    }
  ];
  temperaturesRouter.get('/', function(req, res) {
    res.send({"temperatures": dataToSend});
  });

  temperaturesRouter.get('/:id', function(req, res) {
    var id = req.query.id;
    var temperatures;

    if (id) {
      temperatures = dataToSend.filter(function(b) {
        return id.indexOf(b.id.toString()) > -1;
      });
    }
    else {
      temperatures = dataToSend;
    }

    res.send({"temperatures": temperatures});
  });

  temperaturesRouter.put('/:id', function(req, res) {
    res.send({
      'temperatures': {
        id: req.params.id
      }
    });
  });

  temperaturesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/temperatures', temperaturesRouter);
};
