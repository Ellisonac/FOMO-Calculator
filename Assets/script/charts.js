// Placeholder api call to get workable data
var queryBase = "https://api.coinpaprika.com/v1/tickers/{coinName}/historical?start=";
var coinName = "BitCoin";
var calcsEl = document.querySelector("#section")

// TODO add functionality to calculate the required time step based on the given start date up 
// Function to determine which day interval to call from coinpaprika so that results are smooth and cover the whole date range.
function determineInterval(startDate,endDate) {
  let maxPoints = 900; // Maximum historical points from api call
  let intervals = [1,7,14,30,90]; // coinpaprika available day intervals
  let start = moment(startDate,'mm-dd-yyyy');
  let end = moment(endDate,'mm-dd-yyyy');
  
  let diffDays = moment.duration(end.diff(start)).asDays();
  
  for (let ii = 0; ii < intervals.length; ii++) {
    if (diffDays/intervals[ii] < maxPoints) {
      return intervals[ii]+"d"
    }
  }

  // if no matching interval was found default behavior as 14d
  return "14d"

}

function callCoinApi() {

  let startDate = "2018-02-15";
  let coinSymbol = "btc-bitcoin";
  let interval = determineInterval(moment(startDate,'yyyy-mm-dd').format('mm-dd-yyyy'),moment().startOf('day').format('mm-dd-yyyy'));

  console.log()

  let queryUrl = queryBase.replace('{coinName}',coinSymbol) + startDate + "&interval="+interval

  console.log(queryUrl)


  fetch(queryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayCalcs(data,coinName);
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

function displayCalcs(data,current) {



}

callCoinApi();

// Stock api charting

