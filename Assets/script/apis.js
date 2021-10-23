// script to handle API calls and data transfer
//currently only grabbing bitcoin results and displaying. Need to add logic to dynamically grab the query parameters based on user input
function search(){
    var localQueryUrl= "https://api.coinpaprika.com/v1/coins/btc-bitcoin/markets"
      
        fetch(localQueryUrl)
        .then(function(response){
          return response.json()
        }).then(function(data){
          console.log(data)
          displayText(data)
        }) 
        }
        search()
        
       displayText=function(results){
        for (var i = 0; i < 1; i++) {
            var price = results[i].quotes.USD.price
            console.log(price)
            var priceEl = document.createElement("div")
            priceEl.innerHTML= price
            var element = document.getElementById("results")
            element.appendChild(priceEl)
            }
       }
    