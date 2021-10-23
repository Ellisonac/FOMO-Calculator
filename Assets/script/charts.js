// Placeholder api call to get workable data
var queryBase = "https://api.coinpaprika.com/v1/tickers/{coinName}/historical?start=";
var coinName = "BitCoin";
var calcsEl = document.querySelector("#section");

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

  let startDate = "2012-02-15";
  let coinSymbol = "btc-bitcoin";
  let interval = determineInterval(moment(startDate,'yyyy-mm-dd').format('mm-dd-yyyy'),moment().startOf('day').format('mm-dd-yyyy'));

  let queryUrl = queryBase.replace('{coinName}',coinSymbol) + startDate + "&interval="+interval

  fetch(queryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          console.log(data);
          values = extractData(data,'coin');
          displayCalcs(values,coinName,'coin');
          displayTicker(values,coinName,'coin');
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to API. Error Code ' + error);
    });
    
}

// Pull times and prices from coins or stocks historical data array
// checks if type is 'coin' or 'stock' to parse the passed in data structure
function extractData(data,type) {
  let times = [];
  let prices = [];

  if (type == 'coin') {
    data.forEach((entry) => {
      times.push(entry.timestamp);
      prices.push(entry.price);
    })
  } else if (type == 'stock') {
    // unsure of stock api data format yet
    data.forEach((entry) => {
      times.push(entry.timestamp);
      prices.push(entry.price);
    })
  }
  return {'times':times,'prices':prices}
}

// Coin api charting
function displayTicker(values,name,type) {
  console.log('Coin: '+name);
  
  let times = values.times;
  let prices = values.prices;

  // pull list of times and prices from data array

  let chartData = {
    labels: times,
    datasets: [{
      label: name + ' Price History',
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

function displayCalcs(values,name) {

  // pull list of times and prices from extracted data
  let times = values.times;
  let prices = values.prices;

  let investAmount = 10000;
  let result = "$"+((investAmount) * (prices[prices.length-1]/prices[0])).toFixed(2);

  // Add appropriate commas and formatting using regex a la https://www.codegrepper.com/code-examples/javascript/javascript+format+currency+with+commas
  result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  let mainResult = document.createElement("h2");
  mainResult.innerHTML = "If you had bought $" + investAmount + " of " + name + " on " + moment(times[0]).format('MMMM DD, YYYY') + ", you would have " + result;

  calcsEl.append(mainResult);

  calcsEl.append(document.createElement("br"));

  let statsMax = document.createElement("p");
  statsMax.innerHTML = "The best time to sell " + name + " was on "

}

callCoinApi();

// Stock api charting

