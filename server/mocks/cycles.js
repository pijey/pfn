module.exports = function(app) {
  var express = require('express');
  var cyclesRouter = express.Router();
  var dataToSend = [
    {
      id: 10, ongoing: false, start_date:"2014-12-28T12:54:01", end_date:"2015-01-27T12:54:01", first_day_of_mucus_or_wet: 8, mucus_peak: 14, first_day_of_cervix_change: 10, cervix_peak: 14, third_day_hot_temperature: 19, profile: 1
    },
    {
      id: 11, ongoing: false, start_date:"2015-01-27T12:54:01", end_date:"2015-02-24T12:54:01", first_day_of_mucus_or_wet: 8, mucus_peak: 14, first_day_of_cervix_change: 10, cervix_peak: 14, third_day_hot_temperature: 19, profile: 1
    },
    {
      id: 12, ongoing: true, start_date:"2015-02-25T12:54:01", temperatures: [111, 112, 113, 114, 115, 116], mucusSamples: [121, 122, 123, 124, 125, 126], cervixFeelings: [131, 132, 133, 134, 135, 136], periods: [141, 142, 143, 144, 145, 146], profile: 1 
    }
  ];

  cyclesRouter.get('/', function(req, res) {
    res.send({
      'cycles': dataToSend
    });
  });

  cyclesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  cyclesRouter.get('/:id', function(req, res) {
    var id = req.query.id;
    var cycles;

    if (id) {
      cycles = dataToSend.filter(function(b) {
        return id.indexOf(b.id.toString()) > -1;
      });
    }
    else {
      cycles = dataToSend;
    }

    res.send({"cycles": cycles});
  });

  cyclesRouter.put('/:id', function(req, res) {
    res.send({
      'cycles': {
        id: req.params.id
      }
    });
  });

  cyclesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/cycles', cyclesRouter);
};
