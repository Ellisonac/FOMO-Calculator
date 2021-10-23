// Placeholder api call to get workable data
var query = "https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2010-02-15&interval=14d";
var coinName = "BitCoin";

// TODO add functionality to calculate the required time step based on the given start date up until now
// Possible intervals 5m 10m 15m 30m 45m 1h 2h 3h 6h 12h 24h 1d 7d 14d 30d 90d 365d


function callCoinApi() {

  fetch(query)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayTicker(data,coinName);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to API. Error Code ' + error);
    });
    
}

// Coin api charting
function displayTicker(data,coinName) {
  console.log('Coin: '+coinName);
  console.log(data);

  // pull list of times and prices from data array
  let times = [];
  let prices = [];

  data.forEach((entry) => {
    times.push(entry.timestamp);
    prices.push(entry.price);
  })

  let chartData = {
    labels: times,
    datasets: [{
      label: coinName + ' Price History',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: prices,
    }]
  };
  
  let config = {
    type: 'line',
    data: chartData,
    options: {
      scales: {

      }
    }
  };

  let myChart = new Chart(
    document.querySelector("#stock-canvas"),
    config
  );

}

callCoinApi();

// Stock api charting