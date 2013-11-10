

function sendCircle(){

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {method: 'circle'}, function(response) {
        console.log(response.data);
      });
    });
    timeout = timeto;

}

function next(){

chrome.windows.getLastFocused(
 // Without this, window.tabs is not populated.
 {populate: true},
 function (window)
 {
  var foundSelected = false;
  for (var i = 0; i < window.tabs.length; i++)
  {
   // Finding the selected tab.
   if (window.tabs[i].active)
   {
    foundSelected = true;
    chrome.tabs.update(window.tabs[(i+1) % window.tabs.length].id, {active: true});

   }
   // Finding the next tab.
   // else if (foundSelected)
   // {
   //  // Selecting the next tab.
   //  chrome.tabs.update(window.tabs[i].id, {active: true});
   //  return;
   // }
  }
    chrome.tabs.update(0, {active: true});

 });

}

function currentURL() {


 chrome.windows.getLastFocused(
 // Without this, window.tabs is not populated.
 { populate: true },
 function (window) {
     for (var i = 0; i < window.tabs.length; i++) {
         // Finding the selected tab.
         if (window.tabs[i].active) {
             return window.tabs[i].url;

         }
         // Finding the next tab.
         // else if (foundSelected)
         // {
         //  // Selecting the next tab.
         //  chrome.tabs.update(window.tabs[i].id, {active: true});
         //  return;
         // }
     }

 });



}


function sendCircle() {

    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, { method: 'circle' }, function (response) {
            console.log(response.data);
        });
    });
    timeout = timeto;

}


function last(){

chrome.windows.getLastFocused(
 // Without this, window.tabs is not populated.
 {populate: true},
 function (window)
 {
  var foundSelected = false;
  for (var i = window.tabs.length - 1; i >= 0; i--)
  {
   // Finding the selected tab.
   if (window.tabs[i].active)
   {
    foundSelected = true;
    if(i > 0)
    {
    chrome.tabs.update(window.tabs[i-1].id, {active: true});
    return;
    }

   }
   // Finding the next tab.
   // else if (foundSelected)
   // {
   //  // Selecting the next tab.
   //  chrome.tabs.update(window.tabs[i].id, {active: true});
   //  return;
   // }
  }
    chrome.tabs.update(window.tabs[window.tabs.length - 1].id, {active: true});

 });

}


function getCurrent() {

    chrome.windows.getLastFocused(
     { populate: true },
     function (window) {
         var foundSelected = false;
         for (var i = window.tabs.length - 1; i >= 0; i--) {
             if (window.tabs[i].active) {
                 foundSelected = true;
                 return i;
             }
         }
     });
}


function remove() {

    chrome.windows.getLastFocused(
     { populate: true },
     function (window) {
         var foundSelected = false;
         for (var i = window.tabs.length - 1; i >= 0; i--) {
             if (window.tabs[i].active) {
                 foundSelected = true;
                 chrome.tabs.remove(window.tabs[i].id);
             }
         }
     });
}

function sendEnter() {
    var e = jQuery.Event("keypress");
    e.which = 13; //choose the one you want
    e.keyCode = 13;
    $("body").trigger(e);

}


function reload(b) {


    chrome.tabs.reload(b);


}

function pageScroll() {
    window.scrollBy(0, 50);
}


function closeTab() {

    chrome.tabs.remove(parseInt(getCurrent()));
}

function makeNew() {
    
    chrome.tabs.create({});
    console.log('create');

}


    var timeout = 0;
    var timeTo = 100;
    var controller = new Leap.Controller({ enableGestures: true });
          Leap.loop(function(frame) {
            if(timeout > 0)
                timeout--;
                    var frame = controller.frame(0);
                        if (frame.gestures.length > 0) {
                        for (var i = 0; i < frame.gestures.length; i++) {
                          var gesture = frame.gestures[i];
                          if(timeout == 0)
                          switch (gesture.type) {
                                    case "swipe":
                            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                            if(isHorizontal && frame.pointables.length > 6){
                                          if(gesture.direction[0] > 0){
                                              // req('tr');
                                              next();
                                              console.log('swipe');
                                          } else {
                                              // req('tl');
                                              last();
                                              console.log('swipe back')
                                          }
                                          timeout = timeTo;
                            }
                            if (!isHorizontal && frame.pointables.length >= 6 && gesture.direction[1] < 0)
                            {
                                remove();
                                timeout = timeTo;


                            }
                            else if (!isHorizontal && frame.pointables.length >= 6 && gesture.direction[1] > 0) {
                                makeNew();
                                timeout = timeTo;


                            }
                            else if (!isHorizontal && gesture.direction[1] > 0){
                                makeScroll(-200);
                                timeout = timeTo / 4;



                            }
                            else if (!isHorizontal && gesture.direction[1] < 0) {
                                makeScroll(200);
                                timeout = timeTo / 4;


                            }

                                      break;
                                      case "circle":
                                          if (gesture.state == 'stop' && frame.pointables.length == 2)
                                          {
                                              

                                                  reload(getCurrent());
                                                  timeout = timeTo;
                                              

                                          }
                                          break;
                              case "screenTap":
                                  if (frame.pointables.length >= 2) {
                                      console.log('tap');
                                      //remove();

                                      timeout = timeTo;

                                  }
                                  break;
                              case "keyTap":
                                   {
                                      //remove();
                                      console.log('keyTap');
                                      timeout = timeTo;
                                      console.log('scroll');

                                  }
                                  break;

                            }
                        }
                    }     
});
      controller.connect();




      function makeScroll(arg) {

          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { order : 'scroll', dir :  arg}, function (response) {
                  console.log(response.confirm);
              });
          });

      }
