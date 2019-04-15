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
            var dirToGo = this.getDirection();
            if (dirToGo === 'u') {
                this.y--;
            }
            else if (dirToGo === 'd') {
                this.y++;
            }
            else if (dirToGo === 'r') {
                this.x++;
            }
            else {
                this.x--;
            }
            this.dir = dirToGo;
        };
        init.prototype.getDirection = function () {
            function _getOppositeDir(dir) {
                return dir === 'u' ? 'd' : dir === 'd' ? 'u' : dir === 'l' ? 'r' : 'l';
            }
            var availableDirections = this.getAvailableDirections();
            var indexOfOpositeDir = availableDirections.indexOf(_getOppositeDir(this.dir));
            if (indexOfOpositeDir >= 0) {
                availableDirections.splice(indexOfOpositeDir, 1);
            }
            if (availableDirections.length > 0) {
                var dirToGo = availableDirections[Math.floor(Math.random() * availableDirections.length)];
            }
            else {
                var dirToGo = this.dir;
            }
            return dirToGo;
        };
        init.prototype.invert = function () {
            var x = this.getXtoCheck(this.dir);
            var y = this.getYtoCheck(this.dir);
            var data = this.context.getImageData(x, y, this.r * 2, this.r * 2);
            for (var i = 0; i < data.data.length; i += 4) {
                data.data[i] = 255 - data.data[i];
                data.data[i + 1] = 255 - data.data[i + 1];
                data.data[i + 2] = 255 - data.data[i + 2];
            }
            this.context.putImageData(data, x, y);
        };
        init.prototype.getXtoCheck = function (dir) {
            return dir === 'u' ? this.x : dir === 'd' ? this.x : dir === 'r' ? this.x + this.r : this.x - this.r - 1;
        };
        init.prototype.getYtoCheck = function (dir) {
            return dir === 'u' ? this.y - this.r - 1 : dir === 'd' ? this.y + this.r : dir === 'r' ? this.y : this.y;
        };
        init.prototype.getAvailableDirections = function () {
            var _this = this;
            var availableDirections = [];
            function _isAvailableRoad(dir) {
                var x = _this.getXtoCheck(dir);
                var y = _this.getYtoCheck(dir);
                var w = 1;
                var h = 1;
                var nth = 4;
                var data = _this.context.getImageData(x, y, w, h);
                var flag = false;
                if (_hasPixelColor(data.data, 0)) {
                    flag = true;
                }
                return flag;
            }
            function _hasPixelColor(colors, index) {
                var r = colors[index + 0];
                var g = colors[index + 1];
                var b = colors[index + 2];
                var a = colors[index + 3];
                return r > 0 || g > 0 || b > 0;
            }
            _isAvailableRoad('u') ? availableDirections.push('u') : '';
            _isAvailableRoad('d') ? availableDirections.push('d') : '';
            _isAvailableRoad('r') ? availableDirections.push('r') : '';
            _isAvailableRoad('l') ? availableDirections.push('l') : '';
            return availableDirections;
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
            var rectangle = new Path2D();
            rectangle.rect(15, 15, this.context.canvas.width / 2, this.context.canvas.height / 2);
            this.context.lineWidth = 1.10;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15, 15, this.context.canvas.width / 4, this.context.canvas.height - (15 * 2));
            this.context.lineWidth = 1.10;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15, this.context.canvas.height - this.context.canvas.height / 4 - 15, this.context.canvas.width - (15 * 2), this.context.canvas.height / 4);
            this.context.lineWidth = 1.10;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15, 15, this.context.canvas.width - this.context.canvas.width / 4, this.context.canvas.height - (15 * 2));
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
    var car = new Car.init(canvas, { color: "blue", size: 10, x: 15, y: 25 });
    var roads = new Roads.init(canvas);
    driveBTN.addEventListener('click', function (event) {
        car.drive();
    });
    roads.draw();
    car.draw();
    window.requestAnimationFrame(initSimulation);
    function initSimulation() {
        car.drive();
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        roads.draw();
        car.draw();
        window.requestAnimationFrame(initSimulation);
    }
}
document.addEventListener('DOMContentLoaded', initMain, false);
//# sourceMappingURL=app.js.map