var cheerio = Meteor.npmRequire('cheerio');
var fs = Meteor.npmRequire('fs-extra');

// fs.outputFile('/Users/wongkinchun/Sites/racehorse-analysis/private/demo/demo.html', 'hello!', function (err) {
// 	console.log(err);
// })

// request('http://localhost:3000/race-result.html', function(err, res, body){
// 	if (!err && res.statusCode == 200) {
//         var $ = cheerio.load(body);
//         var title = $('title').text();
        // var dataArray = [];
        // $("#raceDateSelect option").each(function(){
        // 	var option = $(this);
        // 	dataArray.push({ date: option.text(), url: option.val() });
        // });
        // console.log(dataArray);
//     }
// });