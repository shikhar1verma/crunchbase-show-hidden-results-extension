// // background.js

// awake serivce worker
setInterval(()=>{self.serviceWorker.postMessage('test')},20000)

var perfWatch = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('background.js: event listener invoked')

    //   # from popup.js
  if (request.action === "callBackgroundScript") {
    console.log("background.js: background script is called from popup.js", request);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("background.js: in chrome tabs");
      if (tabs[0]) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "callContentScript" },
            function (response) {
              console.log(
                "background.js: content script executed and sending back to popup",
                response
              );
              sendResponse(response);
            }
          );
      } else {
        sendResponse({
            'data': {
                'headers': [],
                'rows': []
            }
        })
      }
    });
  }
  return true;
});


// Last checked this code not working for enabling disabling the extension
// chrome.webNavigation.onCommitted.addListener((details) => {
//     // Get the current URL.
//     const url = details.frameUrl;
  
//     // Check if the URL is in the list of websites that the extension should be enabled for.
//     const allowedSite = 'https://www.crunchbase.com';
//     if (url.startsWith(allowedSite)) {
//       // Enable the extension.
//       chrome.extension.getBackgroundPage().enable();
//     } else {
//       // Disable the extension.
//       chrome.extension.getBackgroundPage().disable();
//     }
//   });
