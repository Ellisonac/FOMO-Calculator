// Placeholder api call to get workable data
var query = "https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2010-02-15&interval=14d";
var coinName = "BitCoin";

function callCoinApi() {

  console.log(query);

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
    options: {}
  };

  let myChart = new Chart(
    document.querySelector("#stock-canvas"),
    config
  );

}

callCoinApi();

// Stock api charting