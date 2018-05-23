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
var colours = {
    2: "#F9BA32",
    4: "#D4AA42",
    8: "#AF9B53",
    16: "#8B8C64",
    32: "#667D75",
    64: "#426E86",
    128: "#3E6175",
    256: "#3A5564",
    512: "#364953",
    1024: "#323D42",
    2048: "#2F3131",
    4096: "#232424",
    8192: "#171818",
    16384: "080C0C",
    32768: "#000000"
};

//Starts the game... duh!

function gameStart() {
    containerBuild();
    addNumber();
    addNumber();
}

//Builds the blank container for the game grid

function containerBuild() {
    $(".container").css({
        "width": (gridSq * maxX + gridSpace * (maxX - 1)) + "px",
        "height": (gridSq * maxY + gridSpace * (maxY - 1)) + "px",
        "padding": gridSpace + "px"
    });
    gridBuild();
    tileSize();
}

//places the empty spaces into a grid

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

//finds the locations of zeroes in the numbers array

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
    //places a 2 (or 4) in the position of the selected zero
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


//TEST prints numbers array

function numberPrint() {
    for (i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
    }
    console.log('-');
}

//TEST prints zeroes array

function zeroPrint() {
    for (i = 0; i < zeroes.length; i++) {
        console.log(zeroes[i]);
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

//Adds the new points to the total and displays them

function pointsDisplay(a) {
    points += a;
    $(".points").html("<b>Points:</b> " + points);
}

//controls keypresses

function keyPress() {
    $(this).keydown(function(key) {
        $(".active").finish(); //<-- this prevents animations and array becoming out of sync
        switch (parseInt(key.which, 10)) {
            // Left arrow key pressed
            case 37:
                shiftLeft();
                break;
                // Up Arrow Pressed
            case 38:
                shiftUp();
                break;
                // Right Arrow Pressed
            case 39:
                shiftRight();
                break;
                // Down Arrow Pressed
            case 40:
                shiftDown();
        }
        tileSpawn();
        oldNumbers = numbers.toString();
    });
}

//this function spawns a new tile by calling addNumber, but prevents doing so if none have moved

function tileSpawn() {
    if (numbers.toString() !== oldNumbers) {
        addNumber();
        numberPrint();
        moveCheck();
    }
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

//Displays a message at the end of the game

function endGame() {
    gameOver = true;
    $('.endgame').html("<p>Oops! It looks like you're stuck!<br><b>Your Score: " + points + "</b></p>");
    $('.endgame').animate({
        top: "200px"
    }, 600);
    $('.container,.points').animate({
        opacity: "0.4"
    }, 600);
    $('.reset').css("box-shadow", "0px 0px 15px #FBD51E");
}

//Controls the reset button
function btnReset() {
    $(".reset").click(gameReset);
}

//Resets the game
function gameReset() {
    for (y = 0; y < maxY; y++) {
        for (x = 0; x < maxX; x++) {
            numbers[y][x] = 0;
        }
    }
    if (gameOver === true) {
        $('.endgame').animate({
            top: "-160px"
        }, 600, function() {
            $('.endgame').html("");
        });
        $('.container,.points').animate({
            opacity: "1"
        }, 600);
        $('.reset').css("box-shadow", "2px 2px 3px #F0EFEE");
        gameOver = false;
    }
    $(".active").remove();
    possibleMoves = 1;
    points = 0;
    addNumber();
    addNumber();
    $(".points").html("<b>Points:</b> ");
}

$(document).ready(gameStart).ready(keyPress).ready(btnReset);