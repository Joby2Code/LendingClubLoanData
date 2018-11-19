function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};


function drawLineChartForLoanAvg(lineGraph) {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Average Loan Amount"
            }
          }
        ]
      }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels:lineGraph.data.labels,
        datasets: lineGraph.data.datasets
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChartForLoanVol(barGraphData) {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Loan Volume"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: barGraphData.labels,
        datasets: [
          {
            label: "Lending Club Monthly Volumne",
            data: barGraphData.datasets,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 80, 102, 0.2)",
              "rgba(55, 102, 225, 0.2)",
              "rgba(255, 112, 96, 0.2)",
              "rgba(105, 142, 122, 0.2)",
              "rgba(123, 202, 255, 0.2)",
              "rgba(220, 159, 34, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235,1)",
              "rgba(255, 206, 86,1)",
              "rgba(75, 192, 192,1)",
              "rgba(153, 102, 255,1)",
              "rgba(255, 159, 64,1)",
              "rgba(255, 80, 102,2)",
              "rgba(55, 102, 225,2)",
              "rgba(255, 112, 96,2)",
              "rgba(105, 142, 122,2)",
              "rgba(123, 202, 255,2)",
              "rgba(220, 159, 34, 2)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: optionsBar
    };

    barChart = new Chart(ctxBar, configBar);
  }
}