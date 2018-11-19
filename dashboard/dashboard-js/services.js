const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

var renderData = function(data){
	var amount_applied_id = $("#tot_amnt_applied");
	amount_applied_id.html("<h2>"+formatter.format(parseInt(data.total_amnt_applied))+"</h2>");

	var amount_funded_id = $("#tot_amnt_funded");
	amount_funded_id.html("<h2>"+formatter.format(parseInt(data.total_amnt_funded))+"</h2>");

	var amount_invested_id = $("#tot_amnt_invested");
	amount_invested_id.html("<h2>"+formatter.format(parseInt(data.total_amnt_inv))+"</h2>");
};

var plotLoanByCreditGrade = function(data,callback){
	console.log('plotting line graph ')
	var graphData = {
		labels:""
	}
	var lineGraph = {
		data:graphData,
		datasets:""
	}

	var gradeMap = {}
	
	label_list=[]
	
	for (var key in data){
		attr = key.split('-')
		if(!isInArray(attr[1],label_list)){
			label_list.push(attr[1])
		}

		loan_value = data[key]
		avg = loan_value.avg
		if(attr[0] in gradeMap){
			index = label_list.indexOf(attr[1])
			gradeMap[attr[0]].insert(index,avg)
		} else {
			gradeMap[attr[0]] = []
			gradeMap[attr[0]].push(avg)
		}
	}
	//console.log(gradeMap)
	lineGraph.data.labels = label_list
	if(gradeMap!= null){
		lineGraph.data.datasets = createLineGraphDataset(gradeMap)
	}
	callback(lineGraph)
};

function createLineGraphDataset(gradeMap){
	color = [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ];
	i = 0;
	datasets=[]
	Object.keys(gradeMap).forEach(function(key) {
		var temp = {};
		temp.label = key;
		temp.data = gradeMap[key]
		temp.fill = false
		temp.backgroundColor=color[i];
		temp.lineTension = 0.1
		datasets.push(temp)
		i = i+1;
	});
	return datasets;
}


function plotLoanByMonthlyVolume(data,callback){
	debugger
	console.log('plotting bar graph ')
	var barGraph = {
		labels:"",
		datasets:""
	}
	label_list=[]
	dataset=[]
	Object.keys(data).forEach(function(key) {
    	//console.log(key, data[key]);
    	attr = key.split('-')
    	if(!isInArray(attr[0],label_list)){
			label_list.push(attr[0])
		}
		loan_amnt = data[key];
		index = label_list.indexOf(attr[0])
		dataset.insert(index,loan_amnt)
	});
	barGraph.labels = label_list
	if(dataset!= null){
		barGraph.datasets = dataset
	}
	callback(barGraph)
}






