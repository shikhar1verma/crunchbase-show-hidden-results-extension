// content.js
const tableData = {
  action: "getContentData",
  data: {
    headers: [],
    rows: [],
  },
};

// alert('heelo');

// tableData.data = extractTableData();
// chrome.runtime.sendMessage(tableData);
// chrome.extension.sendRequest(tableData);
// localStorage.setItem("tableData", JSON.stringify(tableData.data));

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("content.js: content script is called");
  if (message.action === "callContentScript") {
    console.log("content.js: content script in if function");
    // Send a message back to the background script.
    tableData.data = extractTableData();
    sendResponse(tableData);
  }
  return true;
});

function extractTableData() {
  const headers = [];
  const rows = [];

  // Select the header cells
  const headerCells = document.querySelectorAll(
    ".grid-container .header-contents"
  );

  let lastAddColumnPresent = false;
  // Extract header names
  headerCells.forEach((cell) => {
    const headerName = cell.textContent.trim();
    if (headerName.toLowerCase() == 'add column') {
        lastAddColumnPresent = true;
    } else {
        headers.push(headerName);
    }
  });

  // Select the rows
  const rowsElements = document.querySelectorAll("grid-row");

  // Extract row data
  rowsElements.forEach((rowElement) => {
    let row = [];
    const rowCells = rowElement.querySelectorAll(".non-select-column");

    rowCells.forEach((cell) => {
      let cellData = "";
      let anchorTag = cell.querySelector("a");
      if (anchorTag) {
        cellData =
          "<a href=" +
          anchorTag.href +
          ' target="_blank">' +
          cell.textContent.trim() +
          "</a>";
      } else {
        cellData = cell.textContent.trim();
      }
      row.push(cellData);
    });

    if (lastAddColumnPresent) {
        row = row.slice(0, row.length - 1)
    }

    rows.push(row);
  });

  return {
    headers: headers.slice(1),
    rows: rows,
  };
}
