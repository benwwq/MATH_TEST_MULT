
//sets up some default values and variables

var correctcount= 0; //amount correct
var wrongcount= 0;//amount wrong
var historylist=[];

//these are for changing button colors, assigning the buttons to a variable.

//these two are for the displaying history list
listContainer = document.createElement('div');
listContainer.id='listcontainer';
listElement = document.createElement('ul');
document.getElementById("question").innerHTML = "MATH!";
//ratio of correct answers. this is the default probably doesnt need to be here 
correctRatio=0;
testOn=false;
//starts it off- this function calculates the numbers and answers


//defualt for the correct answers and ratio
document.getElementById("count").innerHTML='Correct Answers: '+correctcount;
document.getElementById("ratio").innerHTML='Time: 60';

//only "0-9" , "." , and "-" for inputs also enter key works as a button click
function validate(evt) { 
    var theEvent = evt || window.event;

    var key = theEvent.keyCode || theEvent.which;
    

    key = String.fromCharCode(key);
    if (theEvent.keyCode === 13) {
        answerButtonOnClick();
    }
    var regex = /[0-9]|\.|-/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
//for when the answer button is clicked -> also called when the enterkey is pressed
function answerButtonOnClick() {
    if (testOn==true){
        input=document.getElementById("userInput").value;
        answerTest();
    }
    if (testOn==false){
        Name=document.getElementById("Name").value;
        if (Name!=""){
            document.getElementById("question").innerHTML = "MATH!";
            currentTime=5
            testOn=true
            refreshQ();
            timerID = setInterval(timer, 1000); 
        }

    }
    

};

//tests if users answer is correct, refreshed if correct and adds question to history. also counts correct/incorrect and calcs ratio
function answerTest() {
    if (input==qanswer){
        document.getElementById("userInput").value='';
        correctcount=correctcount+1;
        historylist.unshift((document.getElementById("question").innerHTML+' = '+qanswer));
        updatehistory(true);
        refreshQ();
    } else {
        wrongcount=wrongcount+1
    }
    correctRatio=correctcount/(wrongcount+correctcount);
    document.getElementById("count").innerHTML='Correct Answers: '+correctcount;
}

//calculates 2 random numbers based on limits from input/ changes button colors depending on mode and changes answer depending on mode
//can be called from starting program, getting correct answer, and changing mode.
function refreshQ() {
    var upperL = 3;
    var lowerL = 13;

    var qnumber1=Math.floor(Math.random() * (upperL-lowerL))+lowerL;
    var qnumber2=Math.floor(Math.random() * (upperL-lowerL))+lowerL;



    qanswer=qnumber1*qnumber2;
    document.getElementById("question").innerHTML = (qnumber1+' * '+qnumber2);
    
    qanswer=qanswer.toString()
}




//updates and displays the history-
function updatehistory() {


    let listData = historylist,
    // Make a container element for the list
    
    // Make the list
    
    // Set up a loop that goes through the items in listItems one at a time
    
    listItem;
  

    // Add it to the page
    document.getElementsByTagName('body')[0].appendChild(listContainer);
    listContainer.appendChild(listElement);

    //limit the history display to 7
    if(listElement.childNodes.length>6){
        listElement.removeChild(listElement.lastElementChild);
    }

    // create an item for each one
    listItem = document.createElement('li');

    // Add the item text
    listItem.innerHTML = listData[0];

    // Add listItem to the listElement
    listElement.insertBefore(listItem,listElement.childNodes[0]);
    
}


currentTime=0

function timer() {

    currentTime=currentTime-1
    document.getElementById("ratio").innerHTML='Time: '+currentTime;
    if (currentTime <= 0){
        clearInterval(timerID);
        uploadScore(Name, correctcount)
        testOn=false
        document.getElementById("question").innerHTML = "MATH!";
        document.getElementById("ratio").innerHTML='Time: 60';
    }
}    

//turns on the button listening for modes.
addButtonListeners();
