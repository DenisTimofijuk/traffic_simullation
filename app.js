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
            this.dir = '2';
            Array.prototype.diff = function (a) {
                return this.filter(function (i) {
                    return a.indexOf(i) === -1;
                });
            };
        }
        init.prototype.draw = function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.font = "10px Arial";
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            this.context.save();
            this.context.translate(this.x, this.y);
            var deg = this.getDegreeToRotate();
            this.context.rotate(deg * Math.PI / 180);
            this.context.strokeStyle = 'white';
            this.context.strokeText('>', 0, 0);
            this.context.restore();
            this.context.closePath();
        };
        init.prototype.drive = function () {
            this.setDirection();
            this.handleCoordinates();
        };
        init.prototype.getDegreeToRotate = function () {
            switch (this.dir) {
                case '1':
                    return 225;
                case '2':
                    return 270;
                case '3':
                    return 315;
                case '4':
                    return 0;
                case '5':
                    return 45;
                case '6':
                    return 90;
                case '7':
                    return 135;
                case '8':
                    return 180;
                default:
                    return 0;
            }
        };
        init.prototype.handleCoordinates = function () {
            switch (this.dir) {
                case '1':
                    this.x--;
                    this.y--;
                    break;
                case '2':
                    this.y--;
                    break;
                case '3':
                    this.x++;
                    this.y--;
                    break;
                case '4':
                    this.x++;
                    break;
                case '5':
                    this.x++;
                    this.y++;
                    break;
                case '6':
                    this.y++;
                    break;
                case '7':
                    this.x--;
                    this.y++;
                case '8':
                    this.x--;
                default:
                    this.x;
                    this.y;
                    break;
            }
        };
        init.prototype.setDirection = function () {
            function _getOppositeDir(dir) {
                switch (dir) {
                    case '1':
                        return ['3', '4', '5', '6', '7'];
                    case '2':
                        return ['1', '3', '5', '6', '7'];
                    case '3':
                        return ['1', '8', '7', '6', '5'];
                    case '4':
                        return ['1', '3', '8', '7', '5'];
                    case '5':
                        return ['1', '2', '3', '8', '7'];
                    case '6':
                        return ['1', '2', '3', '5', '7'];
                    case '7':
                        return ['1', '2', '3', '4', '5'];
                    case '8':
                        return ['1', '3', '4', '5', '7'];
                    default:
                        return ['0'];
                }
            }
            var availableDirections = this.getAvailableDirections();
            availableDirections = availableDirections.diff(_getOppositeDir(this.dir));
            if (availableDirections.length > 0) {
                this.dir = availableDirections[Math.floor(Math.random() * availableDirections.length)];
            }
            else {
                this.dir = '0';
            }
        };
        init.prototype.getAvailableDirections = function () {
            var availableDirections = [];
            var _this = this;
            function _isAvailableRoad(dir) {
                var x = _this.x;
                var y = _this.y;
                switch (dir) {
                    case '1':
                        x = _this.x - 1;
                        y = _this.y - 1;
                        break;
                    case '2':
                        y = _this.y - 1;
                        break;
                    case '3':
                        x = _this.x + 1;
                        y = _this.y - 1;
                        break;
                    case '4':
                        x = _this.x + 1;
                        break;
                    case '5':
                        x = _this.x + 1;
                        y = _this.y + 1;
                        break;
                    case '6':
                        y = _this.y + 1;
                        break;
                    case '7':
                        x = _this.x - 1;
                        y = _this.y + 1;
                    case '8':
                        x = _this.x - 1;
                }
                var data = _this.context.getImageData(x, y, 1, 1);
                var flag = false;
                if (_isPixelRoadColor(data.data, 0)) {
                    flag = true;
                }
                return flag;
            }
            function _isPixelRoadColor(colors, index) {
                var r = colors[index + 0];
                var g = colors[index + 1];
                var b = colors[index + 2];
                var a = colors[index + 3];
                return r > 250 && g == 0 && b == 0 && a >= 150;
            }
            _isAvailableRoad('1') ? availableDirections.push('1') : '';
            _isAvailableRoad('2') ? availableDirections.push('2') : '';
            _isAvailableRoad('3') ? availableDirections.push('3') : '';
            _isAvailableRoad('4') ? availableDirections.push('4') : '';
            _isAvailableRoad('5') ? availableDirections.push('5') : '';
            _isAvailableRoad('6') ? availableDirections.push('6') : '';
            _isAvailableRoad('7') ? availableDirections.push('7') : '';
            _isAvailableRoad('8') ? availableDirections.push('8') : '';
            return availableDirections;
        };
        return init;
    }());
    Car.init = init;
})(Car || (Car = {}));
var d1;
(function (d1) {
    var init = (function () {
        function init() {
        }
        init.prototype.getRandomIntInclusive = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return init;
    }());
    d1.init = init;
})(d1 || (d1 = {}));
var Roads;
(function (Roads) {
    var init = (function () {
        function init(host) {
            this.host = host;
            this.context = host.getContext('2d');
        }
        init.prototype.draw = function () {
            this.context.imageSmoothingEnabled = false;
            this.context.imageSmoothingQuality = 'low';
            var rectangle = new Path2D();
            rectangle.rect(15.5, 15.5, this.context.canvas.width - (15 * 2), this.context.canvas.height - (15 * 2));
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15.5, 15.5, this.context.canvas.width / 2, this.context.canvas.height / 2);
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15.5, 15.5, this.context.canvas.width / 4, this.context.canvas.height - (15 * 2));
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15.5, this.context.canvas.height - this.context.canvas.height / 4 - 14.5, this.context.canvas.width - (15 * 2), this.context.canvas.height / 4);
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            var rectangle = new Path2D();
            rectangle.rect(15.5, 15.5, this.context.canvas.width - this.context.canvas.width / 4, this.context.canvas.height - (15 * 2));
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke(rectangle);
            this.context.beginPath();
            this.context.lineWidth = 1;
            this.context.moveTo(15, 15.5);
            this.context.lineTo(this.context.canvas.width - 15, this.context.canvas.height - 15.5);
            this.context.strokeStyle = 'rgba(255,0,0,255)';
            this.context.stroke();
            this.context.closePath();
        };
        return init;
    }());
    Roads.init = init;
})(Roads || (Roads = {}));
function initMain() {
    var canvas = document.getElementById('mainCanv');
    var driveBTN = document.getElementById('drive');
    var fsBTN = document.getElementById('fs');
    var carsCount = 5;
    var carsArray = [];
    var d = new d1.init();
    var size = 10;
    var x = 15;
    var y = 50;
    for (var index = 0; index < carsCount; index++) {
        y = y + size + 15;
        carsArray.push(new Car.init(canvas, { color: getColor(), size: size, x: x, y: y }));
    }
    var roads = new Roads.init(canvas);
    roads.draw();
    carsArray.forEach(function (element) { return element.draw(); });
    function getColor() {
        var r = d.getRandomIntInclusive(0, 255);
        var g = d.getRandomIntInclusive(0, 255);
        var b = d.getRandomIntInclusive(50, 255);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    function initSimulation() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        roads.draw();
        carsArray.forEach(function (element) { return element.drive(); });
        carsArray.forEach(function (element) { return element.draw(); });
        window.requestAnimationFrame(initSimulation);
    }
    driveBTN.addEventListener('click', initSimulation, false);
    fsBTN.addEventListener('click', function () {
        document.getElementById('mainCanv').requestFullscreen();
    });
}
document.addEventListener('DOMContentLoaded', initMain, false);
//# sourceMappingURL=app.js.map