module.exports = function(app) {
  var express = require('express');
  var cervixFeelingsRouter = express.Router();
  var dataToSend = [
    {
      id: 131, sensation: 'HARD', opening: 'CLOSED', position: 'LOW', inclining: 'HORIZONTAL', date:"2015-02-25T08:00:00", cycle_day_number: 1
    },
    {
      id: 132, sensation: 'HARD', opening: 'CLOSED', position: 'LOW', inclining: 'HORIZONTAL', date:"2015-02-26T08:00:00", cycle_day_number: 2
    },
    {
      id: 133, sensation: 'HARD', opening: 'CLOSED', position: 'LOW', inclining: 'HORIZONTAL', date:"2015-02-27T08:00:00", cycle_day_number: 3
    },
    {
      id: 134, sensation: 'HARD', opening: 'CLOSED', position: 'LOW', inclining: 'HORIZONTAL', date:"2015-02-28T08:00:00", cycle_day_number: 4
    },
    {
      id: 135, sensation: 'HARD', opening: 'CLOSED', position: 'LOW', inclining: 'HORIZONTAL', date:"2015-03-01T08:00:00", cycle_day_number: 5
    },
    {
      id: 136, sensation: 'SOFT', opening: 'CLOSED', position: 'LOW', inclining: 'HORIZONTAL', date:"2015-03-02T08:00:00", cycle_day_number: 6
    }
  ];
  cervixFeelingsRouter.get('/', function(req, res) {
    res.send({
      'cervix-feelings': dataToSend
    });
  });

  cervixFeelingsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  cervixFeelingsRouter.get('/:id', function(req, res) {
    var id = req.query.id;
    var cervixFeelings;

    if (id) {
      cervixFeelings = dataToSend.filter(function(b) {
        return id.indexOf(b.id.toString()) > -1;
      });
    }
    else {
      cervixFeelings = dataToSend;
    }

    res.send({"cervix-feelings": cervixFeelings});
  });

  cervixFeelingsRouter.put('/:id', function(req, res) {
    res.send({
      'cervix-feelings': {
        id: req.params.id
      }
    });
  });

  cervixFeelingsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/cervixFeelings', cervixFeelingsRouter);
};
