// Library used is p5.js
// Credits to emilyxxie & The Coding Train team
// I do not own any of the audio contents
// "Clubbed to Death" is a 1995 instrumental
// composition by Rob Dougan. 

var streams = [];
var letterScale = 18;
var audio = new Audio('clubbedtodeath.mp3');
audio.play();

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  var x = 0;
  for (var i=0; i <= width / letterScale; i++) {
    var stream = new Stream();
    stream.generateSymbols(
      x,
      random(-(window.innerHeight), 0) // to make each stream start on different y values rather than all at y=0
    );
    streams.push(stream);
    x += letterScale; // proper horizontal padding so that symbols don't overlap
  }
  textSize(letterScale);
}

function draw() {
  background(5, 120);
  streams.forEach(function(stream){
    stream.render();
  });
}

function Symbol(x, y, speed, firstLetter, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.firstLetter = firstLetter;
  this.opacity = opacity;

  this.interval = round(random(3, 30));

  this.generateRandom = function() {
    if (frameCount % this.interval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96)) //create a random japanese kana symbol
      );
    }
  }

  this.render = function() {
    this.generateRandom();
    text(this.value, this.x, this.y); //draw it
    fill(0, 255, 0); //give it a full green color in rgb values
    this.rain(); //make it rain!!
  }

  this.rain = function() {
    if(this.y > height + letterScale) { // if our symbol is below the bottom of our screen, reset it to the top
      this.y = 0;
    } else { // otherwise keep moving down
      this.y += this.speed;
    }
  }
}

function Stream() {
  this.symbols = [];
  this.range = round(random(10, 40));
  this.speed = random(2, 10);

  this.generateSymbols = function(x, y) {
    var firstLetter = true; //the firstLetter generated symbol is identified right before entering the loop (rest of symbols)
    var opacity = 255;

    for(var i=0; i <= this.range; i++) {
      symbol = new Symbol(x, y, this.speed, firstLetter, opacity);
      symbol.generateRandom();
      this.symbols.push(symbol);
      opacity -= (255 / this.range);
      y -= letterScale; // proper vertical padding so that symbols don't overlap
      firstLetter = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      symbol.firstLetter ? fill(140, 255, 170, symbol.opacity) : fill(0, 255, 70, symbol.opacity); // if it's the first letter, fill it lighter. otherwise, fill it darker
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.generateRandom();
    });
  }
}
