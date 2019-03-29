var navBg = document.querySelector('.top-nav');
var x = 90,
    y = 90;
var flagX = 0;
    flagY = 2;
setInterval(function () {
    navBg.style.background = "linear-gradient(" + x +
        "deg, #3AA17E 10%, #00537E " + y + "%)";
    if (flagX == 0) {
        x++;
        if (x == 360) {
            flagX = 1;
        }
    } else if (flagX == 1) {
        x--;
        if (x == 90) {
            flagX = 2;
            flagY = 0;
        }
    }

    if (flagY == 0) {
        y++;
        if (y == 200) {
            flagY = 1;
        }
    } else if (flagY == 1) {
        y--;
        if (y == 90) {
            flagY = 2;
            flagX = 0;
        }
    }
}, 30);