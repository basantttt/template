// dom manipulation
const quoteContainer=document.getElementById("quote-container");
const quote=document.getElementById("quote");
const QuoteAuthor=document.getElementById("author");
const newQuote=document.getElementById("new-quote");
const Twitter=document.getElementById("twitter");
const Loader=document.getElementById("loader");


let apiQuote=[];

// show Loading spinner
function loading() {
    Loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loading spinner
function complete() {
    Loader.hidden=true;
    quoteContainer.hidden=false;
}
function fetchQuote() {
    loading();
   let randomQuote=apiQuote[Math.floor(Math.random()*apiQuote.length)];
   if (!randomQuote.author) {
    QuoteAuthor.textContent="basant";
   }else{
    QuoteAuthor.textContent=randomQuote.author;
   }

   if(randomQuote.text.length>50){
   quote.classList.add("long-quote");
   }else {
    quote.classList.remove("long-quote");
   }

   quote.textContent=randomQuote.text;
   complete();
}
// fetching the data from the api 
async function getQuotes () {
        const url="https://type.fit/api/quotes";
    try{
        loading();
        const response=await fetch(url);
        apiQuote= await response.json(); 
        
        fetchQuote();  
    } catch(e){
     console.log(e);
    }   
}

function tweetcode(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote.textContent} - ${QuoteAuthor.textContent}`
    window.open(twitterUrl,"_blank");
}
// setting up event listener
newQuote.addEventListener("click",fetchQuote)
Twitter.addEventListener("click",tweetcode)

 getQuotes();

