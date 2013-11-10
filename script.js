


 $(document).mousedown(function(){

//req('tl');


});


function req(arg){
    //tl moves to the tab to the left, tr is for right
  chrome.runtime.sendMessage({req: arg});
}


function clickat(x,y){
$(document.elementFromPoint(x, y)).click();  

}

$(function() {

    console.log(location.href);
var leapc = $('<div id="leapcursor" style="border-radius:3px;position:fixed;background-color:orange;top:10px;left:10px;z-index:90000;"></div>');
leapc.height(10);
leapc.width(10);
// var addThis = document.createElement("div");
$("body").append(leapc);


//chrome.runtime.sendMessage({ req: 'url' }, function (response) {
//    console.log(response.u + 'abc');
//});


});


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.order == 'scroll') {
          sendResponse({ confirm: "conf" });
          pageScroll(request.dir);
      }
  });






function pageScroll(d) {
    window.scrollBy(0, d);
}


