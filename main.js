// set the border
// document.body.style.border = "5px solid red";

// get number of divs in the web page
// var result=document.getElementsByTagName("div").length;
// console.log(result)

// window.onscroll = function() {    
// 	console.log("scroll");   
// }

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// $(window).scroll(function() {
// 	//console.log('scroll')
// 	var cur_div = 0;
// 	for (i = cur_div; i < $('div').length; i++) {
// 	    if (isScrolledIntoView($('div')[i]))
// 	    {	
// 	    	console.log(i);
// 	    	cur_div = i;
// 	    	break;
// 	    }
// 	}
// 	if (cur_div > 1000) {
// 		document.body.style.filter = 'grayscale(100%)';
// 	}
// });

var isScrolling;
var cur_div = 0;

window.addEventListener('scroll', function ( event ) {
	window.clearTimeout(isScrolling);

	isScrolling = setTimeout(function() {
		console.log( 'Scrolling has stopped.' );
		for (i = cur_div; i < $('div').length; i++) {
	    	if (isScrolledIntoView($('div')[i])) {	
	    		console.log(i);
	    		cur_div = i;
	    		break;
	    	}
		}
		if (cur_div > 1000) {
			document.body.style.filter = 'grayscale(100%)';
		}
	}, 66);

}, false);
