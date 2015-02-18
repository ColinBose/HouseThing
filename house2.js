            var partArrary = new Array(50000);
                for (var i = 0; i < 5000; i++) {
                    partArrary[i] = new Array(4);
                }
                var colorSet = 0;
                var ctx;
                smokeReset = 0;
                var smokeVel = 2;
                var colors = new Array(4);
                colors[0] = ["#FAFAFA", "#F2F2F2", "#BDBDBD", "#585858"];
                colors[1] = ["#FF00FF", "#8A0886", "#FA58F4", "#DF01A5"];
                colors[2] = ["#0080FF", "#58FAD0", "#0B615E", "#00BFFF"];
                colors[3] = ["#FFBF00", "#FE642E", "#FF0000", "#FE642E"];
                //draw the components and start the interval
                function drawMe() {
                canvas = document.getElementById("myCanvas");
                            if (canvas.getContext)
                            {
                                ctx = canvas.getContext("2d");
                        }
                drawHouse(ctx);
                }
                //draws house
                function drawHouse(){
                    document.getElementById("myCanvas").style.backgroundColor="#0A0A2A";
                ctx.shadowColor ="rgba(0,0,0,0)";
                            ctx.strokeStyle ="rgba(0,0,0,1)";
                            ctx.lineWidth = 1;
                //left wall
                            ctx.beginPath();
                            ctx.moveTo(40,230);
                            ctx.lineTo(185,285);
                            ctx.lineTo(190,175);
                            ctx.lineTo(175,195);
                            ctx.lineTo(20,155);
                            ctx.lineTo(40,145);
                            ctx.lineTo(40,230);
                                ctx.fillStyle = "grey";
                                ctx.fill();
                            ctx.stroke();
                //right wall
                            ctx.beginPath();
                            ctx.moveTo(190, 175);
                            ctx.lineTo(245, 95);
                            ctx.lineTo(275,145);
                            ctx.lineTo(270,230);
                            ctx.lineTo(185,285);
                ctx.fillStyle = "grey";
                                ctx.fill();
                            ctx.stroke();
        //door
                            ctx.beginPath();
                            ctx.moveTo(225, 258);
                            ctx.lineTo(225, 210);
                            ctx.lineTo(245,200);
                            ctx.lineTo(245, 245);
                ctx.fillStyle = "blue";
                                ctx.fill();
                            ctx.stroke();
                //roof
                            ctx.beginPath();
                            ctx.moveTo(20,155);
                            ctx.lineTo(90, 80);
                            ctx.lineTo(245, 90);
                            ctx.lineTo(172,195);
                            ctx.fillStyle ="green";
                            ctx.fill();
                            ctx.stroke();
                //roof trim
                            ctx.beginPath();
                            ctx.moveTo(174,193);
                            ctx.lineTo(174, 195);
                            ctx.lineTo(20, 158);
                            ctx.lineTo(20,155);
                            ctx.fillStyle ="white";
                            ctx.fill();
                            ctx.stroke();
                //far side roof
                                ctx.beginPath();
                            ctx.moveTo(245,91);
                            ctx.lineTo(284, 155);
                            ctx.lineTo(283,158);
                ctx.lineTo(275,145);
                            ctx.fillStyle ="white";
                            ctx.fill();
                            ctx.stroke();
                            ctx.beginPath();
                        var tileCounter = 0;
                        var xStart = 26;
                        var yStart = 158;
                            var rowCounter = 0;
                while(rowCounter < 15){ctx.beginPath();
                            while(tileCounter < 16){
                            ctx.arc(xStart, yStart, 6, -3*Math.PI/4,-Math.PI/4);
                tileCounter++;
                xStart += 9.7;
                yStart += 2.3 - (rowCounter * .12);
                ctx.stroke();
                    }
                rowCounter++;
                yStart = 158 - (rowCounter * 4.9);
                xStart = 26 + (rowCounter * 4.7)
                tileCounter = 0;
                    }
                    //chimney
                ctx.beginPath();
                            ctx.moveTo(160,95);
                            ctx.lineTo(175, 95);
                            ctx.lineTo(180, 90);
                            ctx.lineTo(180,70);
                            ctx.lineTo(160,70);
                            ctx.fillStyle ="grey";
                            ctx.fill();
                            ctx.stroke();
                smoke(ctx);
                }
                //set up smoke
                function smoke(){
                var xVel;
                var yVel;
                var totalCir = 0;
                var posNeg = 0;
                var xCoord = 160 + Math.random()* 20;
                var yCoord = 70;
                while(totalCir < 400)
                {
                var setCol =Math.floor(Math.random()*4);
                setCol = colors[0][setCol];
                partArrary[totalCir][0] = Math.floor(Math.random()*7 + 7);
                partArrary[totalCir][1] = Math.random()*1.5 + .5;
                partArrary[totalCir][2] = xCoord;
                partArrary[totalCir][3] = yCoord;
                partArrary[totalCir][4] = Math.floor(Math.random()*10 + 10);
                partArrary[totalCir][5] = setCol;
                totalCir++;
                }
                setInterval(animateSmoke, 50);
                }
        //animate smoke
                function animateSmoke(){
                    if(smokeReset % 100 == 0){
            console.log("Broken");
            colorSet++;
            if(colorSet == 4)
            {
                colorSet = 0;
            }
        }
                console.log(smokeReset);
                smokeReset++;
                    ctx.clearRect(150,0, 150, 72);
                    var x = 0;
                while(x < 400){
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    ctx.arc(partArrary[x][2], partArrary[x][3], 2, 0, 2 * Math.PI, false);
                    ctx.fillStyle = partArrary[x][5];
                    ctx.fill();
                partArrary[x][2] += smokeVel;
                partArrary[x][3] -= partArrary[x][1];
                if(partArrary[x][0] == smokeReset){
                    partArrary[x][2] = 160 + Math.random()* 20;
                    partArrary[x][3] = 70;
                partArrary[x][0] = smokeReset + Math.floor(Math.random()*45 + 20);
                partArrary[x][5] = colors[colorSet][Math.floor(Math.random()*4)];
                }
                if(smokeReset % 100 == 0){
                    smokeVel = (Math.random()*1 + .5);
                }
                x++;
                }
                }