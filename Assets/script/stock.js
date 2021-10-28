// historical-data
var submitStock = document.getElementById("submit-stock")

// Implement user input, waiting for stock drop down list
// Call StockAPI on submit button press
function callStockAPI() {

	// Getting user and current dates as unix timestamps
	let startUnix = moment(document.getElementById("search-date").value).unix();
	let endUnix = moment().unix();

	// yh-finance api call through rapidapi || This is limited usage
	let stockUrl = "https://yh-finance.p.rapidapi.com/stock/v2/get-chart?symbol=GOOGL&interval=1d&period1="+startUnix+"&period2="+endUnix+"&region=US"

	// Cal yh-finance api historical chart api and send data to chart plotting functions
	fetch(stockUrl, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		"x-rapidapi-key": "fb7ef53e3dmshc4de20ea9b34326p14958djsn127176c1eef3"
	}}).then(response => {
		return response.json();
	}).then((data) => {
		let chartLen = data.chart.result[0].indicators.quote[0].length
		calcAndChart('Google',data.chart.result[0].indicators.quote[0].high[chartLen-1],data,'stock')
	}).catch(err => {
		console.error(err);
	});
}

submitStock.addEventListener("click",callStockAPI)
