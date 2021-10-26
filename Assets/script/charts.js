// Placeholder api call to get workable data
var queryBase = "https://api.coinpaprika.com/v1/tickers/{coinName}/historical?start=";
var coinName = "BitCoin"; // TODO get user input
var calcsEl = document.querySelector("#calculations"); // Main container for chart and calculations
var myChart;

// Dummy historic coinapi call
// function callCoinApi() {

//   let startDate = "2012-02-15";
//   let coinSymbol = "btc-bitcoin";
//   let interval = determineInterval(moment(startDate,'yyyy-mm-dd').format('mm-dd-yyyy'),moment().startOf('day').format('mm-dd-yyyy'));

//   let queryUrl = queryBase.replace('{coinName}',coinSymbol) + startDate + "&interval="+interval


// Passing function to run displayTicker and displayCalcs
function calcAndChart(name,currentPrice,historicalData,type) {

  console.log(historicalData)
  values = extractData(historicalData,currentPrice,type);

  console.log(values)

  displayTicker(values,name,type);
  displayCalcs(values,currentPrice,name);
}


// Creating chart of historic stock or coin values
function displayTicker(values,name,type) {
  
  if (myChart) {
    myChart.destroy();
  }

  let times = values.times;
  let prices = values.prices;

  // Chart.js implemented plots
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

  myChart = new Chart(
    document.querySelector("#stock-canvas"),
    config
  );

}

// Calculating potential earnings and adding to ui
function displayCalcs(values,currentPrice,name) {

  // pull list of times and prices from extracted data
  let times = values.times;
  let prices = values.prices;

  let investAmount = document.querySelector("#invest").value; // TODO, replace with user input
  let result = (investAmount) * (currentPrice/prices[0]);
  
  // Display main FOMO calculation
  let mainResult = document.createElement("h2");
  mainResult.innerHTML = "If you had bought " + formatPrice(investAmount) + " of " + name + " on " + times[0] + ", you would have " + formatPrice(result);

  calcsEl.append(mainResult);

  calcsEl.append(document.createElement("br"));

  // Calculate best time to sell
  let statsMax = document.createElement("p");
  let maxIndex = prices.indexOf(Math.max(...prices));

  statsMax.innerHTML = "The best time to sell " + name + " was on " + times[maxIndex] + " at " + formatPrice(prices[maxIndex]);

  calcsEl.append(statsMax);

}

// Utility Functions
// Function to determine which day interval to call from coinpaprika so that results are smooth and cover the whole date range.
function determineInterval(startDate,endDate) {
  let maxPoints = 900; // Maximum historical points from api call
  let intervals = [1,7,14,30,90]; // coinpaprika available day intervals
  let start = moment(startDate,'mm-dd-yyyy');
  let end = moment(endDate,'mm-dd-yyyy');
  
  let diffDays = moment.duration(end.diff(start)).asDays();
  
  // Loop through intervals until the smallest interval that will cover the whole date range
  for (let ii = 0; ii < intervals.length; ii++) {
    if (diffDays/intervals[ii] < maxPoints) {
      return intervals[ii]+"d"
    }
  }

  // if no matching interval was found default behavior as 14d
  return "14d"

}

// Function to pull times and prices from coins or stocks historical data array
// checks if type is 'coin' or 'stock' to parse the passed in data structure
function extractData(data,currentPrice,type) {
  let times = [];
  let prices = [];

  if (type == 'coin') {
    data.forEach((entry) => {
      times.push(moment(entry.timestamp,'YYYY-MM-DDThh:mm:ssZ').format('MMMM DD, YYYY'));
      prices.push(entry.price);
    })
    times.push(moment().format('MMMM DD, YYYY'))
    prices.push(currentPrice)

  } else if (type == 'stock') {
    // unsure of stock api data format yet
    data.forEach((entry) => {
      times.push(entry.timestamp);
      prices.push(entry.price);
    })
  }
  return {'times':times,'prices':prices}
}

// Convert price string or number to formatted string
function formatPrice(price) {
  if (typeof price !== "string") {
    s = String(price.toFixed(2));
  } else {
    s = price;
  }
  // Add appropriate commas and formatting using regex a la https://www.codegrepper.com/code-examples/javascript/javascript+format+currency+with+commas
  return '$' + s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// call to dummy api for testing until user button implemented
// callCoinApi();

