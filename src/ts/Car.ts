interface CarParams {
  color: string,
  size: number,
  x: number,
  y: number,
  [key: string]: any
}

interface Array<T> {
  diff(a: Array<any>): Array<any>;
}

type Direction = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

interface coord {
  x: number,
  y: number
}

module Car {
  export class init {
    private readonly context: CanvasRenderingContext2D;
    private readonly color: string;
    private readonly size: number;
    private readonly speed: Number;
    private x: number;
    private y: number;
    private readonly r: number;
    private dir: Direction;
    private safeDistance: number;
    private readonly dellayTimeConst: number;
    private dellayTime: number;

    constructor(host: HTMLCanvasElement, p: CarParams) {
      this.context = host.getContext('2d');
      this.color = p.color;
      this.size = p.size;
      this.speed = parseFloat(Math.random().toFixed(1));
      this.x = p.x
      this.y = p.y;
      this.r = 10;
      this.dir = '2';
      this.safeDistance = 5;
      this.dellayTimeConst = 80;
      this.dellayTime = 0;

      Array.prototype.diff = function (a: Array<any>): Array<any> {
        return this.filter(function (i: number) {
          return a.indexOf(i) === -1;
        });
      };
    }


    draw(): void {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.context.fillStyle = this.color;
      this.context.fill();
      if (this.dir !== '0') {
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
      }
      this.context.closePath();
    }

    drive(): void {
      if (this.dellayTime <= 0) {
        this.setDirection();
        this.handleCoordinates();
        if (this.dir == '0') {
          this.dellayTime = this.dellayTimeConst;
        }
      } else {
        this.dellayTime--;
      }
    }

    getDegreeToRotate(): number {
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
    }

    handleCoordinates(): void {
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
          this.x--
        default:
          this.x;
          this.y;
          break;
      }
    }

    setDirection(): void {

      function _getOppositeDir(dir: Direction): Array<Direction> {
        switch (dir) {
          case '1':
            return ['3', '4', '5', '6', '7'];
          case '2':
            return ['5', '6', '7'];
          case '3':
            return ['1', '8', '7', '6', '5'];
          case '4':
            return ['1', '8', '7'];
          case '5':
            return ['1', '2', '3', '8', '7'];
          case '6':
            return ['1', '2', '3'];
          case '7':
            return ['1', '2', '3', '4', '5'];
          case '8':
            return ['3', '4', '5'];
          default:
            return ['0'];
        }
      }

      var availableDirections = this.getAvailableDirections();
      availableDirections = availableDirections.diff(_getOppositeDir(this.dir));

      if (availableDirections.length > 0) {
        this.dir = availableDirections[Math.floor(Math.random() * availableDirections.length)];
      } else {
        this.dir = '0';
      }
    }

    getAvailableDirections(): Array<Direction> {
      var availableDirections: Array<Direction> = [];
      var _this = this;

      function _getCoordinates(dir: Direction, distance: number): coord {
        var x: number = _this.x;
        var y: number = _this.y;
        switch (dir) {
          case '1':
            x = _this.x - distance - 1;
            y = _this.y - distance - 1;
            break;
          case '2':
            y = _this.y - distance - 1;
            break;
          case '3':
            x = _this.x + distance + 1;
            y = _this.y - distance - 1;
            break;
          case '4':
            x = _this.x + distance + 1;
            break;
          case '5':
            x = _this.x + distance + 1;
            y = _this.y + distance + 1;
            break;
          case '6':
            y = _this.y + distance + 1;
            break;
          case '7':
            x = _this.x - distance - 1;
            y = _this.y + distance + 1;
          case '8':
            x = _this.x - distance - 1;
        }

        return { x: x, y: y };
      }
      function _isAvailableRoad(dir: Direction): boolean {

        var coord = _getCoordinates(dir, 0);
        var data = _this.context.getImageData(coord.x, coord.y, 1, 1);
        var flag = false;

        //var nth = 4;
        // data.data.forEach(function (value, index) {
        //   if (index % nth === nth - 1) {
        //     if (_isPixelRoadColor(data.data, index)) {
        //       flag = true;
        //     }
        //   }
        // })

        if (_isPixelRoadColor(data.data, 0)) {
          flag = true;
        }
        return flag;
      }

      function _isPixelRoadColor(colors: Uint8ClampedArray, index: number): boolean {
        var r = colors[index + 0];
        var g = colors[index + 1];
        var b = colors[index + 2];
        var a = colors[index + 3];

        return r > 250 && g == 0 && b == 0 && a >= 150;
      }

      function _isPixelWithOtherColor(colors: Uint8ClampedArray, index: number): boolean {
        var r = colors[index + 0];
        var g = colors[index + 1];
        var b = colors[index + 2];
        var a = colors[index + 3];

        return (r > 0 && g > 0 && b > 0) && (r < 255 && g < 255 && b < 255);
      }

      function _isOtherCar(dir: Direction): boolean {
        var flag = false;
        var coord = _getCoordinates(dir, _this.r + _this.safeDistance);
        var data = _this.context.getImageData(coord.x, coord.y, 1, 1);
        if (_isPixelWithOtherColor(data.data, 0)) {
          flag = true;
        }

        return flag;
      }

      //_isAvailableRoad('1') ? availableDirections.push('1') : '';
      _isAvailableRoad('2') && !_isOtherCar('2') ? availableDirections.push('2') : '';
      //_isAvailableRoad('3') ? availableDirections.push('3') : '';
      _isAvailableRoad('4') && !_isOtherCar('4') ? availableDirections.push('4') : '';
      //_isAvailableRoad('5') ? availableDirections.push('5') : '';
      _isAvailableRoad('6') && !_isOtherCar('6') ? availableDirections.push('6') : '';
      //_isAvailableRoad('7') ? availableDirections.push('7') : '';
      _isAvailableRoad('8') && !_isOtherCar('8') ? availableDirections.push('8') : '';

      return availableDirections;
    }
  }
}