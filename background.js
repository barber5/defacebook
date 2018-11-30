var atBottom = 0;

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}


function waitForBottom() {
	while(atBottom == 0) {

	}
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {  	
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "bottom_scroll") {
		atBottom = request.bottom;
		console.log("bottom scroll event: ");
		console.log(request)
		sendResponse({farewell: "goodbye_scroll"});
  	}
  	return true;
  });



chrome.webRequest.onBeforeRequest.addListener(
        function(details) {  
        	var url = details.url;
        	if(url.search('scontent-ort2') != -1) {
        		// sleepFor(50);
        	}
        	if(url.search('LitestandTailLoadPagelet') != -1) {
        		sleepFor(15000);
        	}
        },
        {urls: ["<all_urls>"]},
        ["blocking"]);

