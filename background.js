// // background.js
var perfWatch = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('background.js: event listener invoked')
  // from content.js
  if (request.action === "getContentData") {
    //   sendResponse(request.data);
    console.log(request.data);
    console.log(chrome);
    console.log(chrome.storage);
    // chrome.storage.local.set({ tableData: JSON.stringify(request.data) });
    // perfWatch = request.data || null;
    // localStorage.setItem('some', 'data')

    // chrome.runtime.sendMessage(null, {
    //   method: "tableData",
    //   data: request.data,
    // });
  }

  //   # from popup.js
  if (request.action === "callBackgroundScript") {
    console.log("background.js: background script is called from popup.js", request);
    // The message is from the popup script.
    // Do something with the message.
    // Call the content script.
    // chrome.runtime.sendMessage(
    //   null,
    //   {
    //     action: "callContentScript",
    //   },
    //   function (response) {
    //     console.log(
    //       "content script executed and sending back to popup",
    //       response
    //     );
    //     sendResponse(response);
    //   }
    // );

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("background.js: in chrome tabs");
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
    });
  }
  return true;
});

// chrome.extension.onRequest.addListener(function (
//   request,
//   sender,
//   sendResponse
// ) {
//   // From content script.
//   if (sender.tab) {
//     if (request.action == "getContentData") {
//       localStorage.setItem("tableData", request.data); // in this case there will now be a localStorage variable called 'welcome-message' set with the value of 'hey hey!'. This will be viewable in the chrome:extensions page, click on the 'background.html / generated background.html' then view the 'Development Tools' or in Windows hit 'CTRL + SHIFT + I' and look at the 'LocalStorage' tab...
//     }
//   }
// });
