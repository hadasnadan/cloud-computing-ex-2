// put the current ip here
server_address = '52.25.215.154';

window.onload=function() {

        var zoomStep = Number(0.2);
        var zoomIn = Number(1);
        var curRange = Number(2);
        var x1val = Number(-1);
        var x2val = Number(1);
        var y1val = Number(-1);
        var y2val = Number(1);

        var xParts = getUrlVars()["xParts"];
        var yParts = getUrlVars()["yParts"];
        var iterations = getUrlVars()["iterations"];

        createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);

        $('#in').click(function() {
                if (zoomIn > -1) {
                        curRange = curRange - zoomStep;
                        zoomIn = zoomIn - zoomStep;
                        x2val = zoomIn;
                        y2val = zoomIn;
                        createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);
x2val = zoomIn;
                }
        });

        $('#out').click(function() {
                if (zoomIn < 1) {
                        curRange = curRange + zoomStep;
                        zoomIn = zoomIn + zoomStep;
                        x2val = zoomIn;
                        y2val = zoomIn;
                        createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);
x2val = zoomIn;

                }
        });

        $('#up').click(function() {
                if(y1val > -1) {
                        y1val = y1val - Number(0.2);
                        y2val = y2val - Number(0.2);
                        y1val = Number(y1val.toFixed(2));
                        y2val = Number(y2val.toFixed(2));
                }
                createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);

        });

        $('#down').click(function() {
                if(y2val < 1) {
                        y1val = y1val + Number(0.2);
                        y2val = y2val + Number(0.2);
                        y1val = Number(y1val.toFixed(2));
                        y2val = Number(y2val.toFixed(2));
                }
                createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);

        });

        $('#right').click(function() {
                var range = Number(1);
                var limit = range - zoomIn;
                console.log("zoom: " + zoomIn);
                console.log("limit: " + limit);
                if(x2val < 1) {
                        x1val = x1val + Number(0.2);
                        x2val = x2val + Number(0.2);
                        x1val = Number(x1val.toFixed(2));
                        x2val = Number(x2val.toFixed(2));
                }
                createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);
console.log(x2val);
                console.log("from " + x1val + " to " + x2val);
        });

        $('#left').click(function() {
                if(x1val > -1) {
                        x1val = x1val - Number(0.2);
                        x2val = x2val - Number(0.2);
                        x1val = Number(x1val.toFixed(2));
                        x2val = Number(x2val.toFixed(2));
                }
                createImage(x1val, y1val, x2val, y2val, xParts, yParts, iterations);

        });
}

var createImage = function(firstX, firstY, lastX, lastY, xParts, yParts, iterations) {
        var size = 500;
        var range = (lastX > 0) ? lastX - firstX : Math.abs(firstX - lastX);
        var xSize = size/xParts;
        var ySize = size/yParts;
        var xStep = range/xParts;
        var yStep = range/yParts;

        $('#mandelbrot').html("");
        var y = Number(firstY);
        var y1, y2;
        var i = 0;
        while (i < yParts) {
                i++;
                y1 = y;
                y = y + yStep;
                y2 = y;
                var x = new Number(firstX);
                var x1, x2, url;
                var j = 0;
                while (j < xParts) {
                        j++;
                        x1 = x;
                        x = x + xStep;
                        x2 = x;
                        url = "http://"+ server_address +":8080/" + x1 + "/" + x2 + "/" + y1 + "/" + y2 + "/" + iterations + "/" + xSize + "/" + ySize;
                        $('#mandelbrot').append("<img src=" + url + "></src>");
                }

        }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
