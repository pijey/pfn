module.exports = function(app) {
  var express = require('express');
  var periodsRouter = express.Router();
  var dataToSend = [
    {
      id: 141, present: true, date:"2015-02-25T08:00:00", cycle_day_number: 1
    },
    {
      id: 142, present: true, date:"2015-02-26T08:00:00", cycle_day_number: 2
    },
    {
      id: 143, present: true, date:"2015-02-27T08:00:00", cycle_day_number: 3
    },
    {
      id: 144, present: true, date:"2015-02-28T08:00:00", cycle_day_number: 4
    },
    {
      id: 145, present: true, date:"2015-03-01T08:00:00", cycle_day_number: 5
    },
    {
      id: 146, present: false, date:"2015-03-02T08:00:00", cycle_day_number: 6
    }
  ]
  periodsRouter.get('/', function(req, res) {
    res.send({
      'periods': dataToSend
    });
  });

  periodsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  periodsRouter.get('/:id', function(req, res) {
    var id = req.query.id;
    var periods;

    if (id) {
      periods = dataToSend.filter(function(b) {
        return id.indexOf(b.id.toString()) > -1;
      });
    }
    else {
      periods = dataToSend;
    }

    res.send({"periods": periods});
  });

  periodsRouter.put('/:id', function(req, res) {
    res.send({
      'periods': {
        id: req.params.id
      }
    });
  });

  periodsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/periods', periodsRouter);
};
