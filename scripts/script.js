   //global variables for counters and ending setintervals
  var colorSet = 0;
  var tpCounter = 1;
  var dropCounter = 0;
  var smokeReset = 0;
  var smokeVel = 2;
  var partArrary = new Array(400);
  var startSmoke = 0;
  var dropper = 0;
  var closeTo = 0;
  var totalAnimations = 0;
   //array to hold colors for smoke
  var colors = new Array(4);
  colors[0] = ["##00FF00", "#01DF01", "#ACFA58", "#088A08"];
  colors[1] = ["#FF00FF", "#8A0886", "#FA58F4", "#DF01A5"];
  colors[2] = ["#0080FF", "#58FAD0", "#0B615E", "#00BFFF"];
  colors[3] = ["#FFBF00", "#FE642E", "#FF0000", "#FE642E"];
   //arrays for drawig house and smoke
  for (var i = 0; i < 400; i++) {
      partArrary[i] = new Array(5);
  }
  var sandArray = new Array(2000);
  for (var i = 0; i < 2000; i++) {
      sandArray[i] = new Array(10);
  }
   //more variables for drawing and ending timers
  var setStuff = 0;
  var ctx;
  var setint = 0;
  var ctx2;
  var starTurn = 0;
  var buildCounter = 0;
  var windSpeed = 3;
  smokeReset = 0;
   //draw the components and start the interval
  function drawMe() {
      //get canvas and assign to ctx.
      canvas = document.getElementById("secondCanvas");
      if (canvas.getContext) {
          ctx2 = canvas.getContext("2d");
      }
      intro();
  }
   //set background and call buuldhouse
  function intro() {
      document.getElementById("secondCanvas").style.backgroundColor = "#0A0A2A";
      buildHouse();
  }
   //sets the coordinates that the circles/particles are going to mvoe to.
  function buildHouse() {

      //variables for properties of each circle.
      var xVel;
      var yVel;
      var totalCir = 0;
      var xCoord = 180;
      var yCoord = 70;
      var lineSel;
      //determines the starting coordinates for each line
      var lineSet = [
          [20, 155],
          [90, 80],
          [245, 90],
          [172, 195],
          [190, 175],
          [245, 95],
          [275, 145],
          [270, 230],
          [185, 285],
          [40, 230],
          [40, 230],
          [160, 95],
          [175, 95],
          [180, 90],
          [180, 70],
          [160, 70],
          [225, 258],
          [225, 210],
          [245, 200]
      ];
      //determines the growth for each line
      var lineBuild = [
          [70, -75],
          [155, 10],
          [-77, 105],
          [-152, -40],
          [55, -80],
          [30, 50],
          [-5, 85],
          [-85, 55],
          [5, -110],
          [145, 55],
          [0.1, -70],
          [15, 0.1],
          [5, -5],
          [0.1, -20],
          [-20, 0.1],
          [0.1, 25],
          [0.1, -48],
          [20, -10],
          [0.1, 45]
      ];
      var lineGrow;
      var xTime = 0;
      //loops through the array. sets all the variables of each circle randomly
      while (totalCir < 2000) {
          lineSel = Math.floor(Math.random() * 30);
          if (lineSel <= 22) {
              lineSel = Math.floor(lineSel / 2);
          } else {
              lineSel = lineSel - 11;
          }
          if (totalAnimations == 0) {
              xStart = Math.random() * 300;
              yStart = Math.random() * 5 + 295;
          } else {
              xStart = sandArray[totalCir][4];
              yStart = sandArray[totalCir][5];
          }
          //calculates x and y velocties
          xCoord = lineSet[lineSel][0] + Math.random() * lineBuild[lineSel][0];
          lineGrow = (xCoord - lineSet[lineSel][0]) / (lineBuild[lineSel][0]);
          yCoord = lineSet[lineSel][1] + lineGrow * lineBuild[lineSel][1];
          xTime = Math.floor(Math.random() * 50 + 100);
          xVel = (xCoord - xStart) / xTime;
          yVel = (yCoord - yStart) / xTime;
          //stores all the values in an array
          sandArray[totalCir][0] = xVel;
          sandArray[totalCir][1] = yVel;
          sandArray[totalCir][2] = xCoord;
          sandArray[totalCir][3] = yCoord;
          sandArray[totalCir][4] = xStart;
          sandArray[totalCir][5] = yStart;
          sandArray[totalCir][6] = xTime;
          sandArray[totalCir][7] = lineSel;
          sandArray[totalCir][8] = 1000;
          sandArray[totalCir][9] = Math.random() * 3 + 4;
          totalCir++;
      }
      totalAnimations++;
      buildCounter = 0;
      setint = setInterval(animateBuild, 30);
  }
   //animates the house particles moving around to draw the house
  var animateBuild = function() {
      var x = 0;
      ctx2.clearRect(0, 0, 300, 300);
      while (x < 2000) {
          ctx2.globalAlpha = 1;
          ctx2.beginPath();
          ctx2.arc(sandArray[x][4], sandArray[x][5], 0.5, 0, 2 * Math.PI, false);
          ctx2.fillStyle = 'white';
          ctx2.fill();
          sandArray[x][4] += sandArray[x][0];
          sandArray[x][5] += sandArray[x][1];
          if (sandArray[x][6] == buildCounter) {
              sandArray[x][0] = 0;
              sandArray[x][1] = 0;
          }
          x++;
      }
      buildCounter++;
      //stops interval
      if (buildCounter == 180) {
          clearInterval(setint);
          startSmoke = setTimeout(smoke, 10);
          // buildHouse2();
      }
  }
   //gives properties to the smoke circles/particles
      function smoke() {
          var xVel;
          var yVel;
          var totalCir = 0;
          var posNeg = 0;
          var xCoord = 160 + Math.random() * 20;
          var yCoord = 66;
          //loops through giving circles properties
          while (totalCir < 400) {
              var setCol = Math.floor(Math.random() * 4);
              setCol = colors[0][setCol];
              partArrary[totalCir][0] = Math.floor(Math.random() * 7 + 7);
              partArrary[totalCir][1] = Math.random() * 1.5 + .5;
              partArrary[totalCir][2] = xCoord;
              partArrary[totalCir][3] = yCoord;
              partArrary[totalCir][4] = Math.floor(Math.random() * 10 + 10);
              partArrary[totalCir][5] = setCol;
              partArrary[totalCir][6] = Math.floor(Math.random() * 30 + 5);
              totalCir++;
          }
          startSmoke = setInterval(animateSmoke, 50);
      }
      //animaes the smoke
      function animateSmoke() {
          var zz = true;
          if (smokeReset % 25 == 0) {
              colorSet++;
          }
          if (colorSet == 16) {
              smokeReset = 0;
              colorSet = 1;
              setTimeout(deconstruct, 10);
              clearInterval(startSmoke);
              //buildHouse2();
          }
          if (smokeReset > 330) {
              zz = false;
          }
          smokeReset++;
          ctx2.clearRect(150, 0, 240, 67);
          var x = 0;
          while (x < 400) {
            //loops through and redraws the circles. Logic to allow delayed start, random
            //fade out and redraw and sets colors.
              if (partArrary[x][6] < smokeReset) {
                  ctx2.globalAlpha = 0.5;
                  ctx2.beginPath();
                  ctx2.arc(partArrary[x][2], partArrary[x][3], 2, 0, 2 * Math.PI, false);
                  ctx2.fillStyle = partArrary[x][5];
                  ctx2.fill();
                  partArrary[x][2] += smokeVel;
                  partArrary[x][3] -= partArrary[x][1];
                  if (partArrary[x][0] + partArrary[x][6] == smokeReset) {
                      if (!zz) {
                          partArrary[x][2] = 999;
                          partArrary[x][3] = 999;
                      } else {
                          partArrary[x][2] = 160 + Math.random() * 20;
                          partArrary[x][3] = 66;
                          partArrary[x][0] = smokeReset + Math.floor(Math.random() * 45 + 20);
                          partArrary[x][5] = colors[colorSet % 4][Math.floor(Math.random() * 4)];
                      }
                  }
                  if (smokeReset % 100 == 0) {
                      smokeVel = (Math.random() * 1 + .5);
                  }
              }
              x++;
          }
      }
      //sets the properties for the deconstruction of the house
      function deconstruct() {
          for (var x = 0; x < 2000; x++) {
              var goalX = 150;
              var goalY = 80;
              //sets a value so that the falling begins at differtent times.
              if (sandArray[x][7] == 18 || sandArray[x][7] == 16 || sandArray[x][7] == 17) {
                  sandArray[x][8] = 25;
              } else if (sandArray[x][7] == 6 || sandArray[x][7] == 8 || sandArray[x][7] == 4 || sandArray[x][7] == 5 || sandArray[x][7] == 7) {
                  sandArray[x][8] = 35;
              } else if (sandArray[x][7] == 9 || sandArray[x][7] == 10) {
                  sandArray[x][8] = 45;
              } else if (sandArray[x][7] == 0 || sandArray[x][7] == 2 || sandArray[x][7] == 3 || sandArray[x][7] == 1) {
                  sandArray[x][8] = 52;
              } else {
                  sandArray[x][8] = 5;
                  sandArray[x][0] = Math.random() * 20 - 10;
                  sandArray[x][1] = Math.random() * 20 - 10;
              }
              if (sandArray[x][8] != 5) {
                  sandArray[x][0] = Math.random() - 0.5;
                  sandArray[x][1] = Math.random() * 2 + 3;
                  sandArray[x][6] = 300;
              }
          }
          dropper = setInterval(drop, 100);
      }
      //deconstructs the house, dropping the pixels in a set way.
  var drop = function() {
      ctx2.clearRect(0, 0, 600, 300);
      ctx2.globalAlpha = 1;
      for (var x = 0; x < 2000; x++) {
          //delayed start for some pieces. logic for the different things each circle does.
          if (sandArray[x][8] < dropCounter) {
              ctx2.beginPath();
              ctx2.arc(sandArray[x][4], sandArray[x][5], 0.5, 0, 2 * Math.PI, false);
              ctx2.fillStyle = 'white';
              ctx2.fill();
              if (sandArray[x][8] == 5 && sandArray[x][4] < 298 && sandArray[x][4] > 3 && sandArray[x][5] > 298 && sandArray[x][5] < 3) {
                  sandArray[x][4] += sandArray[x][0];
                  sandArray[x][5] += sandArray[x][1];
              } else if (sandArray[x][8] == 5 && sandArray[x][4] > 298 || sandArray[x][4] < 3) {
                  sandArray[x][4] += 0;
                  sandArray[x][5] += 7;
              } else if (sandArray[x][8] == 5 && sandArray[x][5] < 6) {
                  if (sandArray[x][4] > 150) {
                      sandArray[x][4] += 15;
                  } else {
                      sandArray[x][4] -= 15;
                  }
              } else if (sandArray[x][8] == 5 && sandArray[x][5] > 297) {
                  sandArray[x][4] += 0;
                  sandArray[x][5] += 0;
              } else {
                  sandArray[x][4] += sandArray[x][0];
                  sandArray[x][5] += sandArray[x][1];
              }
              if (sandArray[x][5] > 297) {
                  sandArray[x][0] = 0;
                  sandArray[x][1] = 0;
                  sandArray[x][8] = 9;
              }
              if (dropCounter == 149 && sandArray[x][5] < 295 || sandArray[x][5] > 300) {
                  sandArray[x][5] = 299;
              }
              if (dropCounter > 150) {
                  closeTo = sandArray[x][4] - 150;
                  closeTo = closeTo / 10;
                  ctx2.beginPath();
                  ctx2.arc(sandArray[x][4], sandArray[x][5], 0.5, 0, 2 * Math.PI, false);
                  ctx2.fillStyle = 'white';
                  ctx2.fill();
                  if (sandArray[x][5] < 82) {
                      sandArray[x][0] = 0;
                      sandArray[x][1] = 0;
                  } else {
                      sandArray[x][4] -= closeTo;
                      sandArray[x][5] -= 5;
                  }
              }
          } else {
              ctx2.beginPath();
              ctx2.arc(sandArray[x][4], sandArray[x][5], 0.5, 0, 2 * Math.PI, false);
              ctx2.fillStyle = 'white';
              ctx2.fill();
          }
      }
      dropCounter++;
      if (dropCounter == 210) {
          dropCounter = 0;
          clearInterval(dropper);
          buildHouse();
      }
  }