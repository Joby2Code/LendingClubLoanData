var apigClient = apigClientFactory.newClient({});

var apigClient = apigClientFactory.newClient({
  accessKey: 'AKIAZT452VYZRYJWKQRC',
  secretKey: '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',
});


var params = {
  year: ''
};


var body = {};

var additionalParams = {
  // If there are any unmodeled query parameters or headers that must be
  //   sent with the request, add them here.
  headers: {
    'Access-Control-Allow-Origin':'*'
  }
};

var getLoanSummary = function(year){
  params.year = year
  apigClient.generateReportGet(params, body, additionalParams)
    .then(function(result){
      renderData(result.data)
      plotLoanByCreditGrade(result.data.amount_by_grade,drawLineChartForLoanAvg)
      plotLoanByMonthlyVolume(result.data.amount_by_month,drawBarChartForLoanVol)
    })
    .catch( function(result){
      console.log(result)
    });
};


