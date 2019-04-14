var Car;
(function (Car) {
    var init = (function () {
        function init(host, p) {
            this.context = host.getContext('2d');
            this.color = p.color;
            this.size = p.size;
            this.speed = parseFloat(Math.random().toFixed(1));
            this.x = p.x;
            this.y = p.y;
            this.r = 10;
            this.dir = 'u';
        }
        init.prototype.draw = function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
        };
        init.prototype.drive = function () {
            this.invert();
        };
        init.prototype.invert = function () {
            var x = this.dir === 'u' ? this.x - this.r : this.dir === 'd' ? this.x - this.r : this.dir === 'r' ? this.x + this.r : this.x - this.r * 3;
            var y = this.dir === 'u' ? this.y - this.r * 3 : this.dir === 'd' ? this.y + this.r : this.dir === 'r' ? this.y - this.r : this.y - this.r;
            var data = this.context.getImageData(x, y, this.r * 2, this.r * 2);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] = 255 - data.data[i];
                data.data[i + 1] = 255 - data.data[i + 1];
                data.data[i + 2] = 255 - data.data[i + 2];
            }
            this.context.putImageData(data, x, y);
        };
        init.prototype.checkRoad = function () {
            var x = this.dir === 'u' ? this.x - this.r : this.dir === 'd' ? this.x - this.r : this.dir === 'r' ? this.x + this.r : this.x - this.r * 3;
            var y = this.dir === 'u' ? this.y - this.r * 3 : this.dir === 'd' ? this.y + this.r : this.dir === 'r' ? this.y - this.r : this.y - this.r;
            var data = this.context.getImageData(x, y, this.r * 2, this.r * 2);
            var nth = 4;
            data.data.forEach(function (value, index) {
                if (index % nth === nth - 1) {
                    var row = Math.ceil((index + 1) / (data.width * 4));
                    console.log(row);
                }
            });
            function _isPixelWhite(colors, index) {
                var r = colors[index + 0];
                var g = colors[index + 1];
                var b = colors[index + 2];
                var a = colors[index + 3];
                return r > 0 || g > 0 || b > 0;
            }
        };
        return init;
    }());
    Car.init = init;
})(Car || (Car = {}));
var Roads;
(function (Roads) {
    var init = (function () {
        function init(host) {
            this.host = host;
            this.context = host.getContext('2d');
        }
        init.prototype.draw = function () {
            var rectangle = new Path2D();
            rectangle.rect(15, 15, this.context.canvas.width - (15 * 2), this.context.canvas.height - (15 * 2));
            this.context.lineWidth = 1.10;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
        };
        return init;
    }());
    Roads.init = init;
})(Roads || (Roads = {}));
function initMain() {
    var canvas = document.getElementById('mainCanv');
    var driveBTN = document.getElementById('drive');
    var car = new Car.init(canvas, { color: "brown", size: 10, x: 15, y: 100 });
    var drawRoads = new Roads.init(canvas);
    driveBTN.addEventListener('click', function (event) {
        car.drive();
    });
    drawRoads.draw();
    car.draw();
}
document.addEventListener('DOMContentLoaded', initMain, false);
//# sourceMappingURL=app.js.map