// content.js

// remove blurred css from table

function removeBlockingContent() {
    setTimeout(() => {
        // this wil remove the above wrapper from table
        let wrapperDiv = document.querySelector(".all-results-upsell-wrapper")
        if (wrapperDiv) wrapperDiv.remove();
        // this will remove the blurred csss
        let blurredRows = document.querySelectorAll("grid-row.blurred-row");
        if (blurredRows.length > 0) {
            blurredRows.forEach((e) => {
              e.classList.remove("blurred-row");
            });
        } 
    }, 2000); // after 2 seconds

}

removeBlockingContent();

// this code will listen a click and try to remove the tables if present
let tablesTab = document.querySelector('.mat-mdc-tab-link-container');
tablesTab.addEventListener("click", () => {
    removeBlockingContent();
});



const tableData = {
  action: "getContentData",
  data: {
    headers: [],
    rows: [],
  },
};

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
    if (headerName.toLowerCase() == "add column") {
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
      row = row.slice(0, row.length - 1);
    }

    rows.push(row);
  });

  return {
    headers: headers.slice(1),
    rows: rows,
  };
}
