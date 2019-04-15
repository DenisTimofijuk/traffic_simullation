interface params {
  color: string,
  size: number,
  x: number,
  y: number,
  [key: string]: any
}

type Direction = 'u' | 'd' | 'l' | 'r';

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

    constructor(host: HTMLCanvasElement, p: params) {
      this.context = host.getContext('2d');
      this.color = p.color;
      this.size = p.size;
      this.speed = parseFloat(Math.random().toFixed(1));
      this.x = p.x
      this.y = p.y;
      this.r = 10;
      this.dir = 'u';
    }


    draw(): void {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.font = "10px Arial";
      this.context.textBaseline = 'middle';
      this.context.textAlign = 'center';
      this.context.save();
      this.context.translate(this.x, this.y);
      var deg = this.dir === 'd' ? 90 : this.dir === 'u' ? 270 : this.dir === 'l' ? 180 : 0
      this.context.rotate(deg * Math.PI / 180);
      this.context.strokeStyle = 'white';
      this.context.strokeText('>',0, 0);
      this.context.restore();
      this.context.closePath();
    }

    drive(): void {
      this.setDirection();

      if(this.dir === 'u'){
        this.y--;
      }else if(this.dir === 'd'){
        this.y++;
      }else if(this.dir === 'r'){
        this.x++;
      }else{
        this.x--;
      }   
    }

    setDirection(): void {
      function _getOppositeDir(dir: Direction): Direction {
        return dir === 'u' ? 'd' : dir === 'd' ? 'u' : dir === 'l' ? 'r' : 'l';
      }
      var availableDirections = this.getAvailableDirections();
      var indexOfOpositeDir = availableDirections.indexOf(_getOppositeDir(this.dir));

      if (indexOfOpositeDir >= 0) {
        availableDirections.splice(indexOfOpositeDir, 1);
      }

      if(availableDirections.length > 0){
        this.dir = availableDirections[Math.floor(Math.random() * availableDirections.length)];
      }
    }

    invert(): void {
      var x = this.getXtoCheck(this.dir);
      var y = this.getYtoCheck(this.dir);
      var data = this.context.getImageData(x, y, this.r * 2, this.r * 2);

      for (var i = 0; i < data.data.length; i += 4) {
        data.data[i] = 255 - data.data[i];
        data.data[i + 1] = 255 - data.data[i + 1];
        data.data[i + 2] = 255 - data.data[i + 2];
      }
      this.context.putImageData(data, x, y);
    }

    getXtoCheck(dir: Direction): number {
      return dir === 'u' ? this.x : dir === 'd' ? this.x : dir === 'r' ? this.x + this.r : this.x - this.r - 1;
    }

    getYtoCheck(dir: Direction): number {
      return dir === 'u' ? this.y - this.r - 1 : dir === 'd' ? this.y + this.r : dir === 'r' ? this.y : this.y;
    }

    getAvailableDirections(): Array<Direction> {
      //TODO: get square size of moving speed
      var _this = this;
      var availableDirections: Array<Direction> = [];

      function _isAvailableRoad(dir: Direction): boolean {
        var x = _this.getXtoCheck(dir);
        var y = _this.getYtoCheck(dir);
        var w = 1;
        var h = 1;
        var nth = 4;
        var data = _this.context.getImageData(x, y, w, h);
        var flag = false;

        // data.data.forEach(function (value, index) {
        //   if (index % nth === nth - 1) {
        //     if (!_isPixelRoadColor(data.data, index)) {
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

      function _hasPixelColor(colors: Uint8ClampedArray, index: number): boolean {
        var r = colors[index + 0];
        var g = colors[index + 1];
        var b = colors[index + 2];
        var a = colors[index + 3];

        return r > 0 || g > 0 || b > 0;
      }

      function _isPixelRoadColor(colors: Uint8ClampedArray, index: number): boolean {
        var r = colors[index + 0];
        var g = colors[index + 1];
        var b = colors[index + 2];
        var a = colors[index + 3];

        return r > 250 && g == 0 && b == 0;
      }

      _isAvailableRoad('u') ? availableDirections.push('u') : '';
      _isAvailableRoad('d') ? availableDirections.push('d') : '';
      _isAvailableRoad('r') ? availableDirections.push('r') : '';
      _isAvailableRoad('l') ? availableDirections.push('l') : '';

      return availableDirections;
    }
  }
}