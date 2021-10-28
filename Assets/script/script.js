var stocksSwitch = document.querySelector('.stockBtn');
var cryptoSwitch = document.querySelector('.cryptoBtn')
var stocksQuestions = document.querySelector(".stocks");
var cryptoQuestions = document.querySelector(".crypto");
var otherQuestions = document.querySelector(".otherQuestions");
var stockCalBtn = document.querySelector('.stockCalBtn');
var cryptoCalBtn = document.querySelector('.cryptoCalBtn');


var stockBtn
stocksSwitch.addEventListener("click", function() {
    // console.log('click');
    cryptoQuestions.style.display = "none";
    stocksQuestions.style.display = "block";
    otherQuestions.style.display = "block";
    stocksSwitch.style.display = "none";
    cryptoSwitch.style.display = "none";
	stockCalBtn.style.display = "block";
});

var cryptoBtn
cryptoSwitch.addEventListener("click", function() {
    // console.log('click');
    cryptoQuestions.style.display = "block";
    stocksQuestions.style.display = "none";
    otherQuestions.style.display = "block";
    stocksSwitch.style.display = "none";
    cryptoSwitch.style.display = "none";
	cryptoCalBtn.style.display = "block";
});


// next step is to add a reset function to restore the orighinal stock or crypto button so they can calculate more if needed. this will have to be done after we establiush the results area. I was thinking to add a button there "calcute again" or something like that and it will reset the fuction. not sure but that would be my next
