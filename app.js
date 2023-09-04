// Allow a variable viz
let viz;

//1. Create a variable to store the vizContainer

const containerDiv = document.getElementById("vizContainer");

//2.Create a variable to store the dashboard options

const options = {
  device: "desktop",
  height: "800px",
  width: "1200px",
};

//3. Create a variable to store the URL - if doesn't load, might need to specify height and width

const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-GB&:display_count=n&:origin=viz_share_link";

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

console.log("I've changed stuff");

document.addEventListener("DOMContentLoaded", initViz);

// Export PDF

const exportPDFButton = document.getElementById("exportPDF");

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

exportPDFButton.addEventListener("click", exportPDFfunction);

//Export PPT

const exportPPTButton = document.getElementById("exportPPT");

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

exportPPTButton.addEventListener("click", exportPPTfunction);

//Filter

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  //   need to get an active sheet, but this could be a dashboard or a worksheet

  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();

  //   inspect the sheets I need to filter
  console.log(sheets);

  //   index of the sheet I want to filter
  const sheetToFilter = sheets[0];

  //   do the filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}

const filterButton = document.getElementById("FilterButton");

filterButton.addEventListener("click", getRangeValues);
