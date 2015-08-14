Template.home.helpers({
	downloadableDates: function(){
		return Session.get('downloadableDates');
	}
});

Template.home.events({
	'click .downloadRecord': function(event){
		var date = $(event.target).data('date');
		var url = $(event.target).data('url');
		Meteor.call('downloadDate', date, url, function(err, result){
			console.log(err);
			console.log(result);
		});
	}
});

Template.home.onRendered(function(){
	Meteor.call('downloadableDates', function(err, result){
		Session.set('downloadableDates', result);
	});
});