// script to handle API calls and data transfer
//currently only grabbing bitcoin results and displaying. Need to add logic to dynamically grab the query parameters based on user input
var optionEl= document.querySelector("select")
var coinID =''
var localQueryUrl= "https://api.coinpaprika.com/v1/coins/"
var submitCrypto = document.getElementById("submit-crypto")
var container = document.querySelector('#results');


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
   
function removeAllChildNodes(parent){
parent.removeChild(parent.firstChild)
}

displayText=function(results){
  for (var i = 0; i < 1; i++) {
  var price = results[i].quotes.USD.price
  container.innerHTML= "Current Price"
  var priceEl = document.createElement("div")
  priceEl.setAttribute('class','results1')
  priceEl.innerHTML= price
  var element = document.getElementById("results")
  
  element.appendChild(priceEl)
    }
  }
///Logic behind the Submit Crypto Button 
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

coinToID[searchValue]
console.log(coinToID);
localQueryUrl= "https://api.coinpaprika.com/v1/coins/" +coinToID[searchValue] +"/markets"
currentPrice()
  })



//https://api.coinpaprika.com/v1/coins/{coin_id}/ohlcv/historical *** Link for historical API logic 

    
