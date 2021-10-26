// historical-data

// Implement user input, waiting for stock drop down list
function stockHistoricalData() {

	let startUnix = moment(document.getElementById("search-date").value).unix();
	let endUnix = moment().unix();

	let stockUrl = "https://yh-finance.p.rapidapi.com/stock/v2/get-chart?symbol=GOOGL&interval=1d&period1="+startUnix+"&period2="+endUnix+"&region=US"

	console.log(startUnix)
	console.log(endUnix)
	console.log(stockUrl)
	//"https://yh-finance.p.rapidapi.com/stock/v2/get-timeseries?symbol=AMRN&period1=493578000&period2=1625011200&region=US",
	fetch(stockUrl, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		"x-rapidapi-key": "fb7ef53e3dmshc4de20ea9b34326p14958djsn127176c1eef3"
	}}).then(response => {
		console.log(response);
		return response.json();
	}).then((data) => {
		console.log(data)
		let chartLen = data.chart.result[0].indicators.quote[0].length
		calcAndChart('Google',data.chart.result[0].indicators.quote[0].high[chartLen-1],data,'stock')
	})
	.catch(err => {
		console.error(err);
	});
}

document.querySelector("#submit-stock").addEventListener("click",stockHistoricalData)
