import Ember from 'ember';

export default Ember.ObjectController.extend({
    temperatureTakingModes: [
      {label: "Rectal", value: "RECTAL"},
      {label: "Vaginal",    value: "VAGINAL"},
      {label: "Oral",    value: "ORAL"}
    ],
  	profileData: function(){
  		var json = "##START_PROFILE##" + JSON.stringify(this.get('model')._data) + "##END_PROFILE##START_CYCLES##";
  		this.get("model.cycles").forEach(function(cycle){
  			json += "##START_CYCLE##";
  			json += JSON.stringify(cycle._data);
  			json += "##START_TEMPERATURES##";
  			cycle.get("temperatures").forEach(function(temperature){
  				json += "##START_TEMPERATURE##";
  				json += JSON.stringify(temperature._data);
  				json += "##END_TEMPERATURE##";
  			});
  			json += "##END_TEMPERATURES##";

			json += "##START_PERIODS##";
  			cycle.get("periods").forEach(function(period){
  				json += "##START_PERIOD##";
  				json += JSON.stringify(period._data);
  				json += "##END_PERIOD##";
  			});
  			json += "##END_PERIODS##";

  			json += "##START_MUCUS_SAMPLES##";
  			cycle.get("mucusSamples").forEach(function(mucusSample){
  				json += "##START_MUCUS_SAMPLE##";
  				json += JSON.stringify(mucusSample._data);
  				json += "##END_MUCUS_SAMPLE##";
  			});
  			json += "##END_MUCUS_SAMPLES##";

  			json += "##START_CERVIX_FEELINGS##";
  			cycle.get("cervixFeelings").forEach(function(cervixFeeling){
  				json += "##START_CERVIX_FEELING##";
  				json += JSON.stringify(cervixFeeling._data);
  				json += "##END_CERVIX_FEELING##";
  			});
  			json += "##END_CERVIX_FEELINGS##";

  			json += "##END_CYCLE##";

  		});
  		json += "##END_CYCLES##";
  		return json;
  	}.property('model'),
  	actions: {
	    save: function(profile) {
	    	profile.save();
	    }
  	}
});