interface CarParams {
  color: string,
  size: number,
  x: number,
  y: number,
  [key: string]: any
}

type Direction = '0'|'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

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

    constructor(host: HTMLCanvasElement, p: CarParams) {
      this.context = host.getContext('2d');
      this.color = p.color;
      this.size = p.size;
      this.speed = parseFloat(Math.random().toFixed(1));
      this.x = p.x
      this.y = p.y;
      this.r = 10;
      this.dir = '2';
    }


    draw(): void {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.font = "10px Arial";
      this.context.textBaseline = 'middle';
      this.context.textAlign = 'center';
      // this.context.save();
      // this.context.translate(this.x, this.y);
      // var deg = this.dir === 'd' ? 90 : this.dir === 'u' ? 270 : this.dir === 'l' ? 180 : 0
      // this.context.rotate(deg * Math.PI / 180);
      // this.context.strokeStyle = 'white';
      // this.context.strokeText('>', 0, 0);
      // this.context.restore();
      this.context.closePath();
    }

    drive(): void {
      this.setDirection();

      //console.log('destination', this.dir)

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
      function _getOppositeDir(dir: Direction): Direction {
        switch (dir) {
          case '1':
            return '5';
            break;
          case '2':
            return '6';
            break;
          case '3':
            return '7';
            break;
          case '4':
            return '8';
            break;
          case '5':
            return '1';
            break;
          case '6':
            return '2';
            break;
          case '7':
            return '3';
          case '8':
            return '4';
          default:
            return '0';
            break;
        }
      }
      var availableDirections = this.getAvailableDirections();
      var indexOfOpositeDir = availableDirections.indexOf(_getOppositeDir(this.dir));

      if (indexOfOpositeDir >= 0) {
        availableDirections.splice(indexOfOpositeDir, 1);
      }

      if (availableDirections.length > 0) {
        this.dir = availableDirections[Math.floor(Math.random() * availableDirections.length)];
      }else{
        this.dir = '0';
      }
    }

    getAvailableDirections(): Array<Direction> {
      var availableDirections: Array<Direction> = [];
      var _this = this;

      function _isAvailableRoad(dir: Direction): boolean {

        //var nth = 4;
        var x: number = _this.x;
        var y: number = _this.y;
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
            y = _this.y-1;
            break;
          case '4':
            x = _this.x+1;
            break;
          case '5':
            x = _this.x+1;
            y = _this.y+1;
            break;
          case '6':
            y = _this.y+1;
            break;
          case '7':
            x = _this.x-1;
            y = _this.y+1;
          case '8':
            x = _this.x-1;
        }

        var data = _this.context.getImageData(x, y, 1, 1);
        var flag = false;

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

        // console.log('dir', dir)
        // console.log(x, y);
        // console.log(data);

        return flag;
      }

      function _isPixelRoadColor(colors: Uint8ClampedArray, index: number): boolean {
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

      //console.log('availableDirections', availableDirections);

      return availableDirections;
    }
  }
}