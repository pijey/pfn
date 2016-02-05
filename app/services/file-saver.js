import Ember from 'ember';

export default Ember.Service.extend({
	save: function(fileContents, mimeType, filename) {
	    window.saveAs(new Blob([fileContents], {type: mimeType}), filename);
	}
});
