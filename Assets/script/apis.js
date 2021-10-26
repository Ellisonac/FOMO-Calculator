// script to handle API calls and data transfer
//currently only grabbing bitcoin results and displaying. Need to add logic to dynamically grab the query parameters based on user input
var optionEl= document.querySelector("select")
var coinID =''
var localQueryUrl= "https://api.coinpaprika.com/v1/coins/"
var submitCrypto = document.getElementById("submit-crypto")
var container = document.querySelector('#results');
var dateEl= document.getElementById("search-date")
//function to get current price of crypto
function currentPrice(){
removeAllChildNodes(container)
fetch(localQueryUrl)
  .then(function(response){
   return response.json()
  }).then(function(data){
   console.log(data)
  displayText(data)
  
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
fetch(historicalUrl)
  .then(function(historicalResponse){
   return historicalResponse.json()
  }).then(function(historical){

var historicalPrice= historical[0].close
historicalPrice =historicalPrice.toFixed(2)
console.log(historicalPrice)
})
currentPrice()
  })

dateEl.addEventListener("click",function(e){
var searchDate= dateEl.value
var searchDate= moment(searchDate).format()
var queryDate= searchDate.split("T")[0]

// if(queryDate="Invalid date"){
//   return alert("Please Select a")
// }
})