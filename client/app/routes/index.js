import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
	setupController: function () {
		ajax({
			url: '/api/hello'
		}).then(function (data) {
			console.log(data);
		})
		console.log('bye');
	}
});