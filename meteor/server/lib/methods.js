var cheerio = Meteor.npmRequire('cheerio');
var fs = Meteor.npmRequire('fs-extra');
var requestURL = Meteor.wrapAsync(request);
var exportFile = Meteor.wrapAsync(fs.outputFile);

Meteor.methods({

	downloadableDates: function(){
		var result = requestURL('http://localhost:3000/race-result.html');
		var body = (result.body) ? result.body : '';
		
		if(!body) return false;
        
        var $ = cheerio.load(body);
        var title = $('title').text();
        var dataArray = [];
        $("#raceDateSelect option").each(function(){
        	var option = $(this);
        	dataArray.push({ date: option.text(), url: option.val() });
        });
        return dataArray;
	},

	downloadDate: function(date, url){

		var prefix = 'http://racing.hkjc.com/racing/Info/Meeting/Results/Chinese/' + url;
		var counter = 1;
		var timeoutCounter = 0;
		var totalRace = 0;
		var dateSplit = date.split('/');
		var dateString = dateSplit[2] + dateSplit[1] + dateSplit[0];
		var storagePath = '/Users/sc17temp/Desktop/hkjc/';
		var htmlArray = [];

		console.log('Start download files');
		console.log('URL - ' + prefix);
		console.log('Date - ' + dateString);
		console.log('Save to - ' + storagePath + dateString);

		var looper = Meteor.setInterval(function(){
			
			var result = requestURL(prefix + counter);
			
			var body = result.body;
	        var $ = cheerio.load(body);
	        var isContentExist = $('.raceNum td a').length > 0;

	        console.log(isContentExist);
	        
	        if(isContentExist){
		        if(!totalRace) totalRace = $('.raceNum td a').length;
		        var path = storagePath + dateString + '/race_'+ counter +'.html';
				var exportStatus = exportFile(path, body);
				htmlArray.push(path);
				counter += 1;
	        } else {
	        	timeoutCounter += 1;
	        }

	        if(timeoutCounter > 50){
	        	console.log('Request timeout');
		        Meteor.clearInterval(looper);
		        if(htmlArray.length > 0){
					var raceRecordID = RacingsRawData.insert({
						date: date,
						url: url,
						totalRace: counter,
						htmlRecord: htmlArray
					});
		        }
	        }
		}, 10000);

		return true;
	}
});

