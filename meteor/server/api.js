Router.route('/api/raceRecord:test', function(params, req, res, next){
	// console.log(params);
	var test = this.params.test;
	var req = this.request;
	var res = this.response;
	console.log(req);
	console.log(res);
	console.log(test);
	res.end('hello from the server\n');
}, { where: 'server' });
