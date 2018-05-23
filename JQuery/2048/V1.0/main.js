(function($) // début du pluggin
    {
        //2048 By RAF
        /*      - walk over the array from the first to the last number
                - for each original number in the array that is not zero
                - look backwards for a target position that does not contain a zero (unless it is position zero)
                - if the target position does not contain the original number use the next position
                - if the target position is different from the original position
                - add the number to the number on the target position
                - replace the original number by zero */

        // Heres version of 2048 I created! Enjoy...
        var gameOver = false;
        var numbers = []; // array to store numbers in the grid
        var zeroes = []; //array to store location of zeroes
        var maxX = 4; //number of columns
        var maxY = 4; //numbers of rows
        var gridSq = 100; //size of blocks
        var gridSpace = 10; //space between blocks
        var gridSize = gridSq + gridSpace;
        var possibleMoves = 1; //if possible moves is set to 0 the game ends
        var oldNumbers = ""; //used to check if a move has occured
        var speed = 100; //animation speed
        var points = 0;
        //color the tile background behind a speicified number
        var colours = {
            2: "#F9BA32",
            4: "#D4AA42",
        };

        //Starts the game

        function gameStart() {
            containerBuild();
            addNumber();
            addNumber();
        }

        //Build empty container for grid

        function containerBuild() {
            $(".container").css({
                "width": (gridSq * maxX + gridSpace * (maxX - 1)) + "px",
                "height": (gridSq * maxY + gridSpace * (maxY - 1)) + "px",
                "padding": gridSpace + "px"
            });
            gridBuild();
            tileSize();
        }

        //places empty spaces into a grid

        function gridBuild() {
            for (y = 0; y < maxY; y++) {
                numbers.push([]);
                zeroes.push([]);
                for (x = 0; x < maxX; x++) {
                    numbers[y][x] = 0;
                    $(".container").append("<div class='empty' style='margin-left:" + (x * gridSize) + "px;margin-top:" + (y * gridSize) + "px'></div>");
                }
            }
        }

        //sets size of grid tiles

        function tileSize() {
            $(".active, .empty").css({
                "width": gridSq + "px",
                "height": gridSq + "px",
                "border-radius": "3px"
            });
        }

        //creates a div (tile) at locations x,y and with a value z

        function addTile(y, x, z) {
            $(".container").append("<div class='C" + x + " R" + y + " active'style='margin-left:" + (x * gridSize) + "px;margin-top:" + (y * gridSize) + "px;display:none'><p>" + z + "</p></div>");
            tileSize();
            var tile = $(".C" + x + ".R" + y);
            tile.delay(speed).fadeIn(speed * 2);
            tileColour(tile, z);
        }

        //colours a tile dependent upon its value
        function tileColour(tile, z) {
            c = z.toString();
            tile.css("background-color", colours[c]);
        }

        //controls keypresses
        $(document).keydown(function(event) {
            switch (event['key']) {
                case 'ArrowLeft':
                    shiftLeft();
                    break;
                case 'ArrowUp':
                    shiftUp();
                    break;
                case 'ArrowRight':
                    shiftRight();
                    break;
                case 'ArrowDown':
                    shiftDown();
                    break;
            }
            tileSpawn();
            oldNumbers = numbers.toString();

        });


        // spawn a tile

        function tileSpawn() {
            if (numbers.toString() !== oldNumbers) {
                addNumber();
                numberPrint();
                moveCheck();
            }
        }




        //finds the locations of zeroes in the numbers array
        //looping full GRID and compare to zero(charge 1 into array zeroes)
        function findZeroes() {
            for (y = 0; y < maxY; y++) {
                for (x = 0; x < maxX; x++) {
                    if (numbers[y][x] === 0) {
                        zeroes[y][x] = 1;
                    } else {
                        zeroes[y][x] = 0;
                    }
                }
            }
        }
        //test function to print zeroes in console
        function zeroPrint() {
            for (i = 0; i < zeroes.length; i++) {
                console.log(zeroes[i]);
            }
        }


        //adds a number to the array and calls addTile to display it

        function addNumber() {
            //Selects a zero by assigning each a random value and selecting the highest
            max = 0;
            findZeroes();

            for (y = 0; y < maxY; y++) {
                for (x = 0; x < maxX; x++) {
                    zeroes[y][x] = zeroes[y][x] * Math.random();
                    if (zeroes[y][x] > max) {
                        max = zeroes[y][x];
                    }
                }
            }
            //places a 2(90%) (or 4 with 10%) in the position of the selected zero
            for (y = 0; y < maxY; y++) {
                for (x = 0; x < maxX; x++) {
                    if (zeroes[y][x] === max) {
                        if (Math.random() < 0.9) {
                            z = 2;
                        } else {
                            z = 4;
                        }
                        addTile(y, x, z);
                        numbers[y][x] = z;
                    }
                }
            }
        }


        //Shifts and adds blocks to moving to the left

        function shiftLeft() {
            for (y = 0; y < maxY; y++) {
                x = 0;
                i = 0;
                added = false;
                while (numbers[y][i] === 0) {
                    i++;
                }
                if (i === maxX) {
                    x = maxX;
                } else {
                    numbers[y][x] = numbers[y][i];
                    animateShiftX(i, x, y);
                    i++;
                }
                for (i; i < maxX; i++) {
                    if (numbers[y][i] !== 0) {
                        if (numbers[y][i] === numbers[y][x] && added === false) {
                            numbers[y][x] += numbers[y][i];
                            animateAddX(i, y, x);
                            added = true;
                        } else {
                            x++;
                            numbers[y][x] = numbers[y][i];
                            animateShiftX(i, x, y);
                            added = false;
                        }
                    }
                }
                x++;
                for (x; x < maxX; x++) {
                    numbers[y][x] = 0;
                }
            }
        }

        //Shifts and adds blocks moving to the right

        function shiftRight() {
            for (y = 0; y < maxY; y++) {
                x = maxX - 1;
                i = maxX - 1;
                added = false;
                while (numbers[y][i] === 0) {
                    i--;
                }
                if (i === -1) {
                    x = -1;
                } else {
                    numbers[y][x] = numbers[y][i];
                    animateShiftX(i, x, y);
                    i--;
                }
                for (i; i > -1; i--) {
                    if (numbers[y][i] !== 0) {
                        if (numbers[y][i] === numbers[y][x] && added === false) {
                            numbers[y][x] += numbers[y][i];
                            animateAddX(i, y, x);
                            added = true;
                        } else {
                            x--;
                            numbers[y][x] = numbers[y][i];
                            animateShiftX(i, x, y);
                            added = false;
                        }
                    }
                }
                x--;
                for (x; x > -1; x--) {
                    numbers[y][x] = 0;
                }
            }
        }

        //shifts and add blocks moving up

        function shiftUp() {
            for (x = 0; x < maxX; x++) {
                y = 0;
                j = 0;
                added = false;
                while (numbers[j][x] === 0) {
                    j++;
                    if (j === maxY) {
                        break;
                    }
                }
                if (j === maxY) {
                    y = maxY;
                } else {
                    numbers[y][x] = numbers[j][x];
                    animateShiftY(j, x, y);
                    j++;
                }
                for (j; j < maxY; j++) {
                    if (numbers[j][x] !== 0) {
                        if (numbers[j][x] === numbers[y][x] && added === false) {
                            numbers[y][x] += numbers[j][x];
                            animateAddY(j, y, x);
                            added = true;
                        } else {
                            y++;
                            numbers[y][x] = numbers[j][x];
                            animateShiftY(j, x, y);
                            added = false;
                        }
                    }
                }
                y++;
                for (y; y < maxY; y++) {
                    numbers[y][x] = 0;
                }
            }
        }


        //function animates blocks shifting left/right

        function animateShiftX(i, x, y) {
            $(".C" + i + ".R" + y).animate({
                'marginLeft': '-=' + gridSize * (i - x) + 'px'
            }, speed).removeClass("C" + i).addClass("C" + x);
        }

        //function animates blocks adding to left/right

        function animateAddX(i, y, x) {
            $(".C" + i + ".R" + y).addClass("delete").css("z-index", "1").animate({
                'marginLeft': '-=' + gridSize * (i - x) + 'px'
            }, speed, function() {
                postAnimate(x, y);
            });
        }

        //shifts and adds blocks moving down

        function shiftDown() {
            for (x = 0; x < maxX; x++) {
                y = maxY - 1;
                j = maxY - 1;
                added = false;
                while (numbers[j][x] === 0) {
                    j--;
                    if (j === -1) {
                        break;
                    }
                }
                if (j === -1) {
                    y = -1;
                } else {
                    numbers[y][x] = numbers[j][x];
                    animateShiftY(j, x, y);
                    j--;
                }
                for (j; j > -1; j--) {
                    if (numbers[j][x] !== 0) {
                        if (numbers[j][x] === numbers[y][x] && added === false) {
                            numbers[y][x] += numbers[j][x];
                            animateAddY(j, y, x);
                            added = true;
                        } else {
                            y--;
                            numbers[y][x] = numbers[j][x];
                            animateShiftY(j, x, y);
                            added = false;
                        }
                    }
                }
                y--;
                for (y; y > -1; y--) {
                    numbers[y][x] = 0;
                }
            }
        }

        //function animates blocks shifting up/down

        function animateShiftY(j, x, y) {
            $(".C" + x + ".R" + j).animate({
                'marginTop': '-=' + gridSize * (j - y) + 'px'
            }, speed).removeClass("R" + j).addClass("R" + y);
        }

        //function animates blocks adding to up/down

        function animateAddY(j, y, x) {
            $(".C" + x + ".R" + j).addClass("delete").css("z-index", "1").animate({
                'marginTop': '-=' + gridSize * (j - y) + 'px'
            }, speed, function() {
                postAnimate(x, y);
            });
        }

        //function deletes old tile, updates added tile and animates the tile

        function postAnimate(x, y) {
            $(".delete").remove();
            var tile = $(".C" + x + ".R" + y);
            var z = numbers[y][x];
            tile.html("<p>" + z + "</p>");
            tileColour(tile, z);
            tile.animate({
                "marginLeft": "-=" + 10 + "px",
                "marginTop": "-=" + 10 + "px",
                "padding": "+=" + 10 + "px"
            }, speed / 2);
            tile.animate({
                "marginLeft": "+=" + 10 + "px",
                "marginTop": "+=" + 10 + "px",
                "padding": "-=" + 10 + "px"
            }, speed / 2);
            pointsDisplay(z);
        }

        //Checks for any possible moves; calls endGame if none available

        function moveCheck() {
            $(document).ready(findZeroes);
            totalZeroes = 0;
            for (y = 0; y < maxY; y++) {
                for (x = 0; x < maxX; x++) {
                    totalZeroes += zeroes[y][x];
                }
            }
            if (totalZeroes === 0) {
                possibleMoves = 0;
                for (y = 0; y < (maxY - 1); y++) {
                    q = y + 1;
                    for (x = 0; x < maxX; x++) {
                        if (numbers[y][x] === numbers[q][x]) {
                            possibleMoves += 1;
                        }
                    }
                }
                for (x = 0; x < (maxX - 1); x++) {
                    p = x + 1;
                    for (y = 0; y < maxY; y++) {
                        if (numbers[y][x] === numbers[y][p]) {
                            possibleMoves += 1;
                        }
                    }
                }
            }
            if (possibleMoves === 0) {
                $(".active").finish();
                endGame();
            }
        }

        function pointsDisplay(a) {
            points += a;
            $(".points").html("<b>Points:</b> " + points);
        }

        //TEST prints numbers array

        function numberPrint() {
            for (i = 0; i < numbers.length; i++) {
                console.log(numbers[i]);
            }
            console.log('-');
        }


        //Displays a message at the end of the game

        function endGame() {
            gameOver = true;
            $('.endgame').html("<p>Perdu! " + points + "</b></p>");
            $('.endgame').animate({
                top: "200px"
            }, 600);
            $('.container,.points').animate({
                opacity: "0.4"
            }, 600);
            $('.reset').css("box-shadow", "0px 0px 15px #FBD51E");
        }

        $(document).ready(gameStart);
    })(jQuery); // fin du pluggin