// historical-data

fetch("https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data?symbol=GOOGL&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		"x-rapidapi-key": "fb7ef53e3dmshc4de20ea9b34326p14958djsn127176c1eef3"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

