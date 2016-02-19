import Ember from "ember";

export default Ember.Route.extend({
  type:null,
  model(params) {
    var store = this.store;
    var cycle = this.modelFor('daily-report');
    var dayNumber = parseInt(this.paramsFor("daily-report")["day_number"]);
    var now = moment();
    var takingDate = moment(cycle.get("start_date")).add(dayNumber-1,'days').hour(now.hour()).minute(now.minute()).second(0).millisecond(0);
    this.set("type",params.report_type);
    this.controllerFor('daily-report').set("type",params.report_type);

    return store.query(params.report_type, {cycle: cycle.get("id")}).then(function(reps){
      var reports = reps.filter(function(report){
        return report.get("cycle_day_number") === dayNumber;
      });
      if(reports.get("length") > 0){
        return reports.objectAt(0);
      } else {
        return store.createRecord(params.report_type, {
          date:takingDate,
          cycle:cycle
        });
      }
    }, function() {
      return store.createRecord(params.report_type, {
        date:takingDate,
        cycle:cycle
      });
    });
  },
  renderTemplate: function(controller, model) {
    // Render the `favoritePost` template into
    // the outlet `posts`, and display the `favoritePost`
    // controller.
    this.render(this.get("type"), {
      outlet: 'main',
      //into: 'daily-report.report',
      // outlet: 'main',
      controller: this.get("type"),
      model:model
    });
  }
});