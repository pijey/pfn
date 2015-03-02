module.exports = function(app) {
  var express = require('express');
  var mucusSamplesRouter = express.Router();
  var dataToSend = [
    {
      id: 121, sensation: 'DRY', date:"2015-02-25T08:00:00", cycle_day_number: 1, apparency_at_vulva: ''
    },
    {
      id: 122, sensation: 'DRY', date:"2015-02-26T08:00:00", cycle_day_number: 2, apparency_at_vulva: ''
    },
    {
      id: 123, sensation: 'DRY', date:"2015-02-27T08:00:00", cycle_day_number: 3, apparency_at_vulva: ''
    },
    {
      id: 124, sensation: 'DRY', date:"2015-02-28T08:00:00", cycle_day_number: 4, apparency_at_vulva: ''
    },
    {
      id: 125, sensation: 'DRY', date:"2015-03-01T08:00:00", cycle_day_number: 5, apparency_at_vulva: ''
    },
    {
      id: 126, sensation: 'DRY', date:"2015-03-02T08:00:00", cycle_day_number: 6, apparency_at_vulva: ''
    }
  ];
  mucusSamplesRouter.get('/', function(req, res) {
    res.send({
      'mucus-samples': dataToSend
    });
  });

  mucusSamplesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  mucusSamplesRouter.get('/:id', function(req, res) {
    var id = req.query.id;
    var mucusSamples;

    if (id) {
      mucusSamples = dataToSend.filter(function(b) {
        return id.indexOf(b.id.toString()) > -1;
      });
    }
    else {
      mucusSamples = dataToSend;
    }

    res.send({"mucus-samples": mucusSamples});
  });

  mucusSamplesRouter.put('/:id', function(req, res) {
    res.send({
      'mucus-samples': {
        id: req.params.id
      }
    });
  });

  mucusSamplesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/mucusSamples', mucusSamplesRouter);
};
