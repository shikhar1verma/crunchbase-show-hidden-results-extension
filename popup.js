// chrome.runtime.sendMessage({ action: "getData" }, (response) => {
//   const table = document.getElementById("table");

//   // Create table headers
//   const thead = table.createTHead();
//   const headerRow = thead.insertRow();
//   response.headers.forEach((headerText) => {
//     const th = document.createElement("th");
//     th.textContent = headerText;
//     headerRow.appendChild(th);
//   });

//   // Create table rows
//   const tbody = table.createTBody();
//   response.rows.forEach((rowData) => {
//     const row = tbody.insertRow();
//     rowData.forEach((cellText) => {
//       const cell = row.insertCell();
//       cell.textContent = cellText;
//     });
//   });
// });

// Retrieve the stored data from background script
// chrome.storage.local.get("tableData", (result) => {
//   console.log(result);
//   const res = JSON.parse(result);
//   const data = result.getContentData;
//   // Display the data in your popup's HTML
//   const table = document.getElementById("table");

//   // Create table headers
//   const thead = table.createTHead();
//   const headerRow = thead.insertRow();
//   res.headers.forEach((headerText) => {
//     const th = document.createElement("th");
//     th.textContent = headerText;
//     headerRow.appendChild(th);
//   });

//   // Create table rows
//   const tbody = table.createTBody();
//   res.rows.forEach((rowData) => {
//     const row = tbody.insertRow();
//     rowData.forEach((cellText) => {
//       const cell = row.insertCell();
//       cell.textContent = cellText;
//     });
//   });
// });
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log("outside");
//   if (message.data === "clicked") {
//     console.log("inside");
//     // The extension's icon was clicked.
//     chrome.runtime.sendMessage(
//       null,
//       {
//         action: "getGlobalVariable",
//         variableName: "perfWatch",
//       },
//       function (response) {
//         console.log("doubelinside");
//         // Do something with the response.
//         console.log(response);
//         const table = document.getElementById("table");

//         // Create table headers
//         const thead = table.createTHead();
//         const headerRow = thead.insertRow();
//         response.headers.forEach((headerText) => {
//           const th = document.createElement("th");
//           th.textContent = headerText;
//           headerRow.appendChild(th);
//         });

//         // Create table rows
//         const tbody = table.createTBody();
//         response.rows.forEach((rowData) => {
//           const row = tbody.insertRow();
//           rowData.forEach((cellText) => {
//             const cell = row.insertCell();
//             cell.textContent = cellText;
//           });
//         });
//       }
//     );
//   }
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.method === "tableData") {
//     createTable(message);
//   }
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log("popup event listener ran");
//   if (message.data === "clicked") {
//     console.log("clicked");
//     // Call the background script.
//     chrome.runtime.sendMessage(
//       null,
//       {
//         action: "callBackgroundScript",
//       },
//       function (response) {
//         // The background script has responded.
//         // Do something with the response.
//         console.log("Got response from content.js");
//         createTable(response);
//       }
//     );
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  // Your code to execute when the popup is loaded
    console.log('popup.js: it is loaded')
  // Detect the extension icon click
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // tabs[0] will contain information about the currently active tab
    var activeTab = tabs[0];
    console.log("popup.js: extension is clicked");
    // Call the background script.
    chrome.runtime.sendMessage(
      null,
      {
        action: "callBackgroundScript",
        clickedTab: activeTab,
      },
      function (response) {
        // The background script has responded.
        // Do something with the response.
        console.log("popup.js: Got response from content.js");
        createTable(response);
      }
    );
  });
});

function createTable(response) {
  console.log(response.data);
  const table = document.getElementById("table");
  table.innerHTML = "";

  // Create table headers
  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  response.data.headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Create table rows
  const tbody = table.createTBody();
  response.data.rows.forEach((rowData) => {
    const row = tbody.insertRow();
    rowData.forEach((cellText) => {
      const cell = row.insertCell();
      cell.innerHTML = cellText;
    });
  });
}

// window.addEventListener("DOMContentLoaded", () => {
//   let bg = chrome.extension.getBackgroundPage();

//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     let currentTabId = tabs[0].id;
//     console.log("bg", bg);
//     if (!bg) {
//       return;
//     }
//     let currentPerf = bg.perfWatch[currentTabId];

//     // Display the data in your popup's HTML
//     const table = document.getElementById("table");

//     // Create table headers
//     const thead = table.createTHead();
//     const headerRow = thead.insertRow();
//     currentPerf.headers.forEach((headerText) => {
//       const th = document.createElement("th");
//       th.textContent = headerText;
//       headerRow.appendChild(th);
//     });

//     // Create table rows
//     const tbody = table.createTBody();
//     currentPerf.rows.forEach((rowData) => {
//       const row = tbody.insertRow();
//       rowData.forEach((cellText) => {
//         const cell = row.insertCell();
//         cell.textContent = cellText;
//       });
//     });
//   });
// });
