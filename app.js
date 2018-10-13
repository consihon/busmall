'use strict';

var imageContainer = document.getElementById('images');
var chartContainer = document.getElementById('chart').getContext('2d');
var list = document.getElementById('list');
var ulEl = document.createElement('ul');
list.appendChild(ulEl);
var left = document.getElementById('left');
var right = document.getElementById('right');
var mid = document.getElementById('mid');
var clickCounter = 0;
var midIndex=1;
var leftIndex=0;
var rightIndex=2;

// Collect all document element references we need, inlcuding ctx for chartjs

// references to the current images on the page
//document.getElementById

// counter for all of our clicks


var Image = function (name,src){
  this.name=name;
  this.src=src;
  this.appeared=0;
  this.liked=0;
  allImages.push(this);
};

var allImages = []; // container for all images

var chooseNewImage=function(){
  var newRight;
  var newMid;
  var newLeft;
  do{
    newRight = Math.floor(Math.random() * allImages.length);
  }while(newRight === midIndex || newRight === leftIndex || newRight === rightIndex);
  do{
    newLeft = Math.floor(Math.random() * allImages.length);
  }while(newLeft === midIndex||newLeft === leftIndex || newLeft === rightIndex || newLeft === newRight);
  do{
    newMid = Math.floor(Math.random() * allImages.length);
  }while(newMid === midIndex || newMid === leftIndex || newMid === rightIndex || newMid === newRight || newMid === newLeft );
  console.log(newLeft,newMid,newRight);
  rightIndex=newRight;
  leftIndex=newLeft;
  midIndex=newMid;
  left.src=allImages[leftIndex].src;
  right.src=allImages[rightIndex].src;
  mid.src=allImages[midIndex].src;
// choose 3 new random images that dont repeat from the current images or each other
//change the source of the 3 images on the page currently
};

var handleBusmalClick = function(event){
  console.log(event.target);
  if(event.target.id==='left'||event.target.id==='mid'||event.target.id==='right'){
    clickCounter++;
    allImages[rightIndex].appeared++;
    allImages[midIndex].appeared++;
    allImages[leftIndex].appeared++;
    // check to make sure we click on the correct thing (image);
    if(event.target.id==='right'){
      allImages[rightIndex].liked++;
    }else if(event.target.id==='left'){
      allImages[leftIndex].liked++;
    }else{
      allImages[midIndex].liked++;
    }
    if(clickCounter<25){
      chooseNewImage();
    }else{
      imageContainer.removeEventListener('click',handleBusmalClick);
      renderChart();
    }

  }
  // increment the correct image's likes

  // increment all current images appeared count

  //call choose new image function ()

  // increment the total clicks on the page

  // test if we have clicked 25 times
  // shut the listener off
  // make chart appear

};

//instantiate all new images
// (new Image('cool.jpg))

imageContainer.addEventListener('click', handleBusmalClick);

// ======================================
// Charts
// ======================================

//function to render the chart
var renderChart = function () {
  var names = [];
  var likes = [];
  var colors = [];
  for (var i in allImages) { //does one pass over all goat images, and collects their name, likes and gives them a background color
    var liEl = document.createElement('li');
    names.push(allImages[i].name);
    likes.push(allImages[i].liked);
    liEl.textContent=allImages[i].name+' ';
    liEl.textContent+=allImages[i].liked;
    colors.push('#'+((1<<24)*Math.random()|0).toString(16));//god bless ZPiDER on stackoverflow
    ulEl.appendChild(liEl);
  }
  var chartData = {
    labels: names, // #Labels for individual rows of data
    datasets: [{ //takes in more than one set of data
      label: '# of Votes', // #Need to label your chart
      data: likes, //#array of values
      backgroundColor: colors,
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    animation: {
      duration: 800,
      easing: 'easeInCirc',
    },
    responsive: true,
  };

  var barChart = {
    type: 'horizontalBar', //refers to the type of chart
    data: chartData, // #insert actual array of chart Data
    options: chartOptions, // insert the default options
  };

  //render the chart
  var myChart = new Chart(chartContainer, barChart);
};
//   // chartjs needs ctx
//   //=================
//   //collect all data
//   // we need labels, data values, colors,

//   // create a data object that gets passed all our other arrays, based off of the example from chartjs
//   //============
//   //call a new Chart and pass in ctx and our data
// };






//+++++++++++++++++++method calls+++++++++++++++++++++++++++//
new Image('Bag','./assets/bag.jpg');
new Image('Banana','./assets/banana.jpg');
new Image('Bathroom','./assets/bathroom.jpg');
new Image('Boots','./assets/boots.jpg');
new Image('Breakfast','./assets/breakfast.jpg');
new Image('bubblegum','./assets/bubblegum.jpg');
new Image('Chair','./assets/chair.jpg');
new Image('Cthulhu','./assets/cthulhu.jpg');
new Image('Dog bill','./assets/dog-duck.jpg');
new Image('Dragon,', './assets/dragon.jpg');
new Image('Pen','./assets/pet-sweep.jpg');
new Image('Scissors','./assets/scissors.jpg');
new Image('Shark', './assets/shark.jpg');
new Image('Sweep', './assets/sweep.png');
new Image('tauntaun' , './assets/tauntaun.jpg');
new Image('Unicorn','./assets/unicorn.jpg');
new Image('USB','./assets/usb.gif');
new Image('Water can' , './assets/water-can.jpg');
new Image('Wine glass', './assets/wine-glass.jpg');
