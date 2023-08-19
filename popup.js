document.addEventListener("DOMContentLoaded", function () {
  runContentMutationLogic();
  
    // Your code to execute when the popup is loaded
  console.log("popup.js: it is loaded");
  // Detect the extension icon click
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // tabs[0] will contain information about the currently active tab
    var activeTab = tabs[0];
    console.log("popup.js: extension is clicked");
    showLoadingState();
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
        if (!response) {
          showEmptyState();
        } else {
          if (
            response.data &&
            response.data.hasOwnProperty("headers") &&
            typeof response.data.headers === "object" &&
            response.data.headers.length > 0
          ) {
            createTable(response);
          } else {
            showEmptyState();
          }
        }
      }
    );
  });
});

function showLoadingState() {
  const table = document.getElementById("table");
  const infoContainer = document.getElementById("info-container");
  table.innerHTML = "";
  infoContainer.innerHTML = "<p>Loading data...</p>";
  return;
}

function showEmptyState() {
  const table = document.getElementById("table");
  const infoContainer = document.getElementById("info-container");
  table.innerHTML = "";
  infoContainer.innerHTML = "";
  infoContainer.innerHTML =
    `<p>Nothing to show here.</p>
    <p>Either you are not fetching data from crunchbase tables or some error occurred.</p>
    <p>Please try accordingly.</p>`;
  return;
}

function createTable(response) {
  function buildTable(tableData) {
    // Create table headers
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    tableData.headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    // Create table rows
    const tbody = table.createTBody();
    tableData.rows.forEach((rowData) => {
      const row = tbody.insertRow();
      rowData.forEach((cellText) => {
        const cell = row.insertCell();
        cell.innerHTML = cellText;
      });
    });
  }

  console.log(response.data);
  if (!response) {
    showEmptyState();
    return;
  }
  const table = document.getElementById("table");
  const infoContainer = document.getElementById("info-container");
  table.innerHTML = "";
  infoContainer.innerHTML = "";

  tdata = response.data;
  buildTable(tdata);
}

function runContentMutationLogic() {
    const table = document.getElementById("table");
    
    // Set up a MutationObserver to watch for changes in the contentDiv
    const tableObserver = new MutationObserver(function(mutations) {
        // Handle mutations here if needed
        // For now, simply log a message to indicate a change
        console.log('tableObserver Content has changed:');
    });
    
    // Configure and start the observer
    const tableObserverConfig = { childList: true, characterData: true, subtree: true };
    tableObserver.observe(table, tableObserverConfig);


    const infoContainer = document.getElementById("info-container");
    // Set up a MutationObserver to watch for changes in the contentDiv
    const infoContainerObserver = new MutationObserver(function(mutations) {
        // Handle mutations here if needed
        // For now, simply log a message to indicate a change
        console.log('info container Content has changed:');
    });
    
    // Configure and start the observer
    const infoContainerObserverConfig = { childList: true, characterData: true, subtree: true };
    infoContainerObserver.observe(infoContainer, infoContainerObserverConfig);

    return
}