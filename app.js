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
        }
        init.prototype.draw = function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
        };
        init.prototype.drive = function () {
        };
        return init;
    }());
    Car.init = init;
})(Car || (Car = {}));
var Roads;
(function (Roads) {
    var init = (function () {
        function init(host, calback) {
            var _this = this;
            this.host = host;
            this.context = host.getContext('2d');
            this.image = new Image(this.context.canvas.width, this.context.canvas.height);
            this.image.src = './src/img/road_1.png';
            this.image.onload = function (event) {
                _this.draw();
                calback();
            };
        }
        init.prototype.draw = function () {
            this.context.drawImage(this.image, 0, 0);
        };
        return init;
    }());
    Roads.init = init;
})(Roads || (Roads = {}));
function initMain() {
    var canvas = document.getElementById('mainCanv');
    var car = new Car.init(canvas, { color: "brown", size: 10, x: 20, y: 50 });
    var drawRoads = new Roads.init(canvas, function () {
        car.draw();
    });
}
document.addEventListener('DOMContentLoaded', initMain, false);
//# sourceMappingURL=app.js.map