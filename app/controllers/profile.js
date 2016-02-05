import Ember from 'ember';
import EmberValidations, { validator } from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  application:Ember.inject.controller(),
  isLoading:false,
  fileName:null,
  fileSaver:Ember.inject.service("file-saver"),
    temperatureTakingModes: [
      {label: "Rectal", value: "RECTAL"},
      {label: "Vaginal",    value: "VAGINAL"},
      {label: "Oral",    value: "ORAL"}
    ],
    validations: {
      "model.temperature_taking_hour": {
        inline: validator(function() {
          if (!this.model.get('model.temperature_taking_hour')){
            return "doit être renseignée";
          }
          else if(moment(this.model.get('model.temperature_taking_hour')).hour() < 4 || moment(this.model.get('model.temperature_taking_hour')).hour() > 11) {
            return "doit être effectuée entre 4h et 11h du matin";
          }
          //TODO Tester que le relevé doit etre unique par jour
        }) 
      },
      "model.temperature_taking_mode": {
        presence: {message: "doit être renseigné"}
      },
    },
  	actions: {
	    save() {
	    	this.get("model").save();
	    },
      exportProfile(){
        this.set("application.isLoading", true);
        var fileContent = "";

        //Profile XML object
        fileContent += "<profile>"+
          "<surname>"+this.get("model.surname")+"</surname>"+
          "<temperature_taking_hour>"+moment(this.get("model.temperature_taking_hour")).format("HH:mm")+"</temperature_taking_hour>"+
          "<temperature_taking_mode>"+this.get("model.temperature_taking_mode")+"</temperature_taking_mode>"+
          "<cycles>";

        //Cycles XML objects
        this.get("model.cycles").forEach(function(cycle){
          fileContent += "<cycle>"+
          "<ongoing>";
          if(cycle.get("ongoing")){
            fileContent += "true";
          }
          else {
            fileContent += "false";
          }
          fileContent +="</ongoing>" +
          "<start_date>"+moment(cycle.get("start_date")).format("DD/MM/YYYY")+"</start_date>";
          fileContent += "<end_date>";
          if(cycle.get("end_date")){
             fileContent += moment (cycle.get("end_date")).format("DD/MM/YYYY");
          }
          fileContent += "</end_date>";
          fileContent += "<temperatures>";

          //Temperature XML Objects
          cycle.get("temperatures").forEach(function(temperature){
            fileContent += "<temperature>" +
            "<temperature>"+temperature.get("temperature")+"</temperature>" +
            "<date>"+moment(temperature.get("date")).format("DD/MM/YYYY")+"</date>" +
            "<comment>"+temperature.get("comment")+"</comment>"+"<ignore>";
            if(temperature.get("ignore")){
              fileContent += "true";
            }else {
              fileContent += "false";
            }
            fileContent += "</ignore>" +
            "</temperature>";
          });
          fileContent += "</temperatures>";

          //Period XML Objects
          fileContent += "<periods>";
          cycle.get("periods").forEach(function(period){
            fileContent += "<period>" +
            "<present>";
            if(period.get("present")){
              fileContent += "true";
            }else {
              fileContent += "false";
            }
            fileContent += "</present>" +
            "<date>"+moment(period.get("date")).format("DD/MM/YYYY")+"</date>" +
            "<comment>"+period.get("comment")+"</comment>" +
            "<volume>"+period.get("volume")+"</volume>" +
            "</period>";
          });
          fileContent +="</periods>";

          fileContent += "<mucusSamples>";
          cycle.get("mucusSamples").forEach(function(mucusSample){
            fileContent += "<mucusSample>" +
              "<sensation>"+mucusSample.get("sensation")+"</sensation>" +
              "<apparency_at_vulva>"+mucusSample.get("apparency_at_vulva")+"</apparency_at_vulva>" +
              "<apparency_at_cervix>"+mucusSample.get("apparency_at_cervix")+"</apparency_at_cervix>" +
              "<at_cervix>";
              if(mucusSample.get("at_cervix")){
                fileContent += "true";
              }else {
                fileContent += "false";
              }
              fileContent += "</at_cervix>" +
              "<date>"+moment(mucusSample.get("date")).format("DD/MM/YYYY")+"</date>" +
              "<comment>"+mucusSample.get("comment")+"</comment>" +
              "</mucusSample>";
          });
          fileContent +="</mucusSamples>";

          fileContent += "<cervixFeelings>";
          cycle.get("cervixFeelings").forEach(function(cervixFeeling){
            fileContent += "<cervixFeeling>" +
            "<sensation>"+cervixFeeling.get("sensation")+"</sensation>" +
            "<opening>"+cervixFeeling.get("opening")+"</opening>" +
            "<position>"+cervixFeeling.get("position")+"</position>" +
            "<inclining>"+cervixFeeling.get("inclining")+"</inclining>" +
            "<date>"+moment(cervixFeeling.get("date")).format("DD/MM/YYYY")+"</date>" +
            "<comment>"+cervixFeeling.get("comment")+"</comment>" +
            "</cervixFeeling>";
          });
          fileContent +="</cervixFeelings>";
          fileContent +="</cycle>";
        });

        fileContent += "</cycles></profile>";
        
        fileContent = fileContent.replace(/>null</g, "><");
        fileContent = fileContent.replace(/>undefined</g, "><");

        var fileName = this.get("model.surname") +  moment().format("YYYYMMDD-HHmmss") + ".xml";
        if(typeof LocalFileSystem !== "undefined"){
          this.send("saveFileCordova",fileName, fileContent);
        }
        else {
          this.get("fileSaver").save(
            fileContent, 
            "application/xml",
            fileName
          );
          this.set("application.isLoading", false);
        }
      },
      saveFileCordova(fileName, fileData){
        var that=this;
        // Get access to the file system
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            // Create the file.
            fileSystem.root.getFile(fileName, { create: true, exclusive: false }, function (entry) {
                // After you save the file, you can access it with this URL
                var myFileUrl = entry.toURL();
                entry.createWriter(function (writer) {
                   writer.onwriteend = function () {
                        that.set("application.isLoading", false);
                        alert("Profil sauvegardé avec succès dans ce répertoire : " + myFileUrl);
                    };
                    // Write to the file
                    writer.write(fileData);
                }, function (error) {
                    that.set("application.isLoading", false);
                    alert("Error: Could not create file writer, " + error.code);
                });
            }, function (error) {
                that.set("application.isLoading", false);
                alert("Error: Could not create file, " + error.code);
            });
        }, function (evt) {
            that.set("application.isLoading", false);
            alert("Error: Could not access file system, " + evt.target.error.code);
        });
      },
      importProfile(){
        this.set("application.isLoading", true);
        var file = this.get("fileName");
        var reader = new FileReader();
        reader.readAsText(file);
        var that=this;
        reader.onloadend = function(){
          Ember.$.get('/utils/profile.xsd', function(data) {
            var validationResult = xmllint.validateXML({
               xml:reader.result,
               schema:data
            }); 
            if (!validationResult.errors) {

              var xmlFile = Ember.$(Ember.$.parseXML(reader.result));

              //Profile
              var xmlProfile = xmlFile.find("profile");
              var cycles = [];
              var xmlCycles = xmlProfile.find("cycle");

              for (var i = 0; i < xmlCycles.length; i++) {
                var xmlCycle = Ember.$(xmlCycles[i]);
                
                var temperatures=[];
                var xmlTemperatures = xmlCycle.find("temperatures>temperature");
                for (var j = 0; j < xmlTemperatures.length; j++) {
                  var xmlTemperature = Ember.$(xmlTemperatures[j]);
                  var temperature=that.store.createRecord('temperature', {
                    temperature:parseFloat(xmlTemperature.find("temperature").text()),
                    date:moment(xmlTemperature.find("date").text(), "DD/MM/YYYY HH:mm"),
                    comment:xmlTemperature.find("comment").text(),
                    ignore:xmlTemperature.find("ignore").text().toLowerCase() === 'true',
                  });
                  temperatures.push(temperature);
                }

                var periods=[];
                var xmlPeriods = xmlCycle.find("periods>period");
                for (var k = 0; k < xmlPeriods.length; k++) {
                  var xmlPeriod = Ember.$(xmlPeriods[k]);
                  var period=that.store.createRecord('period', {
                    present:xmlPeriod.find("present").text().toLowerCase() === 'true',
                    date:moment(xmlPeriod.find("date").text(), "DD/MM/YYYY"),
                    comment:xmlPeriod.find("comment").text(),
                    volume:xmlPeriod.find("volume").text(),
                  });
                  periods.push(period);
                }

                var mucusSamples=[];
                var xmlMucusSamples = xmlCycle.find("mucusSamples>mucusSample");
                for (var l = 0; l < xmlMucusSamples.length; l++) {
                  var xmlMucusSample = Ember.$(xmlMucusSamples[l]);
                  var mucusSample=that.store.createRecord('mucusSample', {
                    sensation:xmlMucusSample.find("sensation").text(),
                    apparency_at_vulva:xmlMucusSample.find("apparency_at_vulva").text(),
                    apparency_at_cervix:xmlMucusSample.find("apparency_at_cervix").text(),
                    at_cervix:xmlMucusSample.find("at_cervix").text().toLowerCase() === 'true',
                    date:moment(xmlMucusSample.find("date").text(), "DD/MM/YYYY"),
                    comment:xmlMucusSample.find("comment").text(),
                  });
                  mucusSamples.push(mucusSample);
                }

                var cervixFeelings=[];
                var xmlCervixFeelings = xmlCycle.find("cervixFeelings>cervixFeeling");
                for (var m = 0; m < xmlCervixFeelings.length; m++) {
                  var xmlCervixFeeling = Ember.$(xmlCervixFeelings[m]);
                  var cervixFeeling=that.store.createRecord('cervixFeeling', {
                    sensation:xmlCervixFeeling.find("sensation").text(),
                    opening:xmlCervixFeeling.find("opening").text(),
                    position:xmlCervixFeeling.find("position").text(),
                    inclining:xmlCervixFeeling.find("inclining").text(),
                    date:moment(xmlCervixFeeling.find("date").text(), "DD/MM/YYYY"),
                    comment:xmlCervixFeeling.find("comment").text(),
                  });
                  cervixFeelings.push(cervixFeeling);
                }

                var endDate=null;
                if(xmlCycle.find("end_date").text() !== ""){
                  endDate = moment(xmlCycle.find("end_date").text(),"DD/MM/YYYY");
                }

                var cycle=that.store.createRecord('cycle', {
                  ongoing:xmlCycle.find("ongoing").text().toLowerCase() === 'true',
                  start_date:moment(xmlCycle.find("start_date").text(),"DD/MM/YYYY"),
                  end_date:endDate,
                  temperatures:temperatures,
                  periods:periods,
                  mucusSamples:mucusSamples,
                  cervixFeelings:cervixFeelings
                });
                cycles.push(cycle);
              }

              var profile = that.store.createRecord('profile', {
                surname:xmlProfile.find("surname").text(),
                temperature_taking_hour:moment(xmlProfile.find("temperature_taking_hour").text(), "HH:mm"),
                temperature_taking_mode:xmlProfile.find("temperature_taking_mode").text(),
                cycles:cycles
              });

              if(confirm("Êtes-vous sûr de vouloir remplacer le profil actuel par le profil issu du fichier ?")){
                profile.save().then(function(){
                  profile.get("cycles").forEach(function(cycle){
                    cycle.save().then(function(){
                      cycle.get("temperatures").forEach(function(tmp) {
                        tmp.set("cycle", cycle);
                        tmp.save();
                      });
                      cycle.get("periods").forEach(function(per) {
                        per.set("cycle", cycle);
                        per.save();
                      });
                      cycle.get("mucusSamples").forEach(function(muc) {
                        muc.set("cycle", cycle);
                        muc.save();
                      });
                      cycle.get("cervixFeelings").forEach(function(cer) {
                        cer.set("cycle", cycle);
                        cer.save();
                      });
                    });
                  });
                });
                that.set("model", profile);
                that.get("application.model").destroyRecord();
                that.set("application.model", profile);
                alert("Le profil a été importé avec succès");
              }
              else{
                profile.destroyRecord();
              }
            }
            else {
              that.set("application.isLoading", false);
            } 
            that.set("application.isLoading", false);
          },"text");
        };
      },
      selectTemperatureTakingMode(takingMode) {
        this.set('model.temperature_taking_mode', takingMode);
      }
  	},
});