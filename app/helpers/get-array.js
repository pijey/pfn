import Ember from 'ember';

export function getArray(params) {
	var array = params[0];
	var index = params[1];
  	return(array[index]);
}

export default Ember.Helper.helper(getArray);
