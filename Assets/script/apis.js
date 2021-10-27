// script to handle API calls and data transfer
//Current Price for crypto selection logic.
var optionEl= document.querySelector("select")
var coinID =''
var localQueryUrl= "https://api.coinpaprika.com/v1/coins/"
var submitCrypto = document.getElementById("submit-crypto")
var container = document.querySelector('#results');
var dateEl= document.getElementById("search-date")
var investBox= document.querySelector("#invest")
var disableSearch = submitCrypto.disabled= true
var validDate= true
var cryptoSelect =document.querySelector("#select-crypto")
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
submitCrypto.addEventListener("click",function(e){
var searchValue= optionEl.value
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

var searchDate= dateEl.value
var queryDate= moment(searchDate).format().split("T")[0]
var historicalUrl= "https://api.coinpaprika.com/v1/coins/"+coinToID[searchValue]+"/ohlcv/historical?start="+queryDate
localQueryUrl= "https://api.coinpaprika.com/v1/coins/" +coinToID[searchValue] +"/markets"
console.log(historicalUrl)
console.log(localQueryUrl)
var historicalUrl = "https://api.coinpaprika.com/v1/coins/"+coinToID[searchValue]+"/ohlcv/historical?start="+queryDate;

var interval = determineInterval(moment(searchDate,'yyyy/mm/dd').format('mm-dd-yyyy'),moment().startOf('day').format('mm-dd-yyyy'));

historicalUrl = "https://api.coinpaprika.com/v1/tickers/"+coinToID[searchValue]+"/historical?start=" + queryDate + "&interval="+interval


// Long series of .then calls to make sure that both historical and current price data are passed to the charting functions
// TODO: Historical day is not precisely as input
fetch(historicalUrl)
  .then(function(historicalResponse){
   return historicalResponse.json()
  }).then(function(historical){
    fetch(localQueryUrl)
      .then(function(response){
        return response.json()
      }).then(function(data){
        calcAndChart(searchValue.split(' ')[0],data[0].quotes.USD.price,historical,'coin')
        }) 
    })
  })

dateEl.addEventListener("blur",function(){
var today=moment().format().split("T")[0]
var searchDate= dateEl.value
var searchDate= moment(searchDate).format()
var queryDate= searchDate.split("T")[0]
if (queryDate > today){
  validDate= false
} 
enableSearch()
errorMessage()
})

//Disabling button if info is missing 
function enableSearch(){
if (dateEl.value.length != "0" && investBox.value != "" && validDate==true && cryptoSelect.value !=""){
document.querySelector("#submit-crypto").disabled=false 
} 
}
//error message for invalid date 
function errorMessage() {

  if (validDate== false)
  {
    error.innerHTML = "<span style='color: red;'>"+ "Please enter a valid date"
  }
  else(error.innerHTML= null)
  console.log(error.innerHTML)
}
