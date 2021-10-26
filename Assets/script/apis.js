// script to handle API calls and data transfer
//Current Price for crypto selection logic.
var optionEl= document.querySelector("select")
var localQueryUrl= "https://api.coinpaprika.com/v1/coins/"
var submitCrypto = document.getElementById("submit-crypto")
var container = document.querySelector('#results');
var dateEl= document.getElementById("search-date")

// Crypto drop down conversion to ID for coinpaprika call
// Taking Coin dropdown and converting it to coin ID for query 
var coinToID = {
  'Bitcoin (BTC)': 'btc-bitcoin',
  'Ethereum (ETH)': 'eth-ethereum',
  'Tether (USDT)': 'usdt-tether',
  'Cardano (ADA)': 'ada-cardano',
  'Binance Coin (BNB)': 'bnb-binance-coin',
  'XRP (XRP)': 'xrp-xrp',
  'Solana (SOL)': 'sol-solana',
  'USD Coin (USDC)': 'usdc-usd-coin',
  'Polkadot (DOT)': 'dot-polkadot',
  'Dogecoin (DOGE)':'doge-dogecoin',
  }


//function to get current price of crypto
function currentPrice(){
  removeAllChildNodes(container)
  fetch(localQueryUrl)
    .then(function(response){
      return response.json()
    }).then(function(data){
      console.log(data)
      displayText(data)
      return data
    }) 
}

//Removing the price info if there is a previous price result present 
function removeAllChildNodes(parent){
  parent.removeChild(parent.firstChild)
}

// Likely removable now that charts and calculations are implemented
displayText=function(results){
  for (var i = 0; i < 1; i++) {
    var price = results[i].quotes.USD.price
    price = price.toFixed(2)
    container.innerHTML= "Current Price"
    var priceEl = document.createElement("div")
    priceEl.setAttribute('class','results1')
    priceEl.innerHTML= price
    var element = document.getElementById("results")
    
    element.appendChild(priceEl)
  }
}

///event listener on submit crypto button
function callCryptoAPI() {
  let searchValue= optionEl.value;
  let searchDate = dateEl.value;

  let queryDate= moment(searchDate).format().split("T")[0]

  // Calculating interval between points to call coinpaprika over
  let startMoment = moment(searchDate,'YYYY-MM-DD');
  let endMoment = moment();
  let interval = determineInterval(startMoment.format('mm-dd-yyyy'),endMoment.format('mm-dd-yyyy'));

  // Historical chart data api url
  let historicalUrl = "https://api.coinpaprika.com/v1/tickers/"+coinToID[searchValue]+"/historical?start=" + queryDate + "&interval="+interval+"d";

  // Old historical call url
  //var historicalUrl= "https://api.coinpaprika.com/v1/coins/"+coinToID[searchValue]+"/ohlcv/historical?start="+queryDate

  // Current price data api url
  let currentUrl= "https://api.coinpaprika.com/v1/coins/" +coinToID[searchValue] +"/markets";
  
  // Long series of .then calls to make sure that both historical and current price data are passed to the charting functions
  fetch(historicalUrl)
    .then(function(historicalResponse){
    return historicalResponse.json()
    }).then(function(historical){
      fetch(currentUrl)
        .then(function(response){
          return response.json()
        }).then(function(data){
          calcAndChart(searchValue.split(' ')[0],data[0].quotes.USD.price,historical,'coin');
        }) 
    })
}


submitCrypto.addEventListener("click",callCryptoAPI);

dateEl.addEventListener("click",function(e){
  var searchDate= dateEl.value
  var searchDate= moment(searchDate).format()
  var queryDate= searchDate.split("T")[0]

  // if(queryDate="Invalid date"){
  //   return alert("Please Select a")
  // }
})