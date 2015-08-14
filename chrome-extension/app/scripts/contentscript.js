'use strict';

var twoFiveSon = function(){
	var html = jQuery('html').html();
	console.log(html);
};
if(jQuery){
	console.log('jQuery is loaded');
} else {
	console.log('jQuery is not exist');
}
console.log('Two five son is loaded');