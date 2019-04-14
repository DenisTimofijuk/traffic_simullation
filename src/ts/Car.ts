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
      this.context.closePath();
    }

    drive(): void {
      this.invert();
      //move per 1 pixel
      //check road
      //if crosroad randomly choose direction
      //change coordinates accordingly
      //call draw()

    }

    invert(): void {
      var x = this.dir === 'u' ? this.x - this.r : this.dir === 'd' ? this.x - this.r : this.dir === 'r' ? this.x + this.r : this.x - this.r * 3;
      var y = this.dir === 'u' ? this.y - this.r * 3 : this.dir === 'd' ? this.y + this.r : this.dir === 'r' ? this.y - this.r : this.y - this.r;
      var data = this.context.getImageData(x, y, this.r * 2, this.r * 2);

      for (var i = 0; i < data.data.length; i += 4) {
        data.data[i] = 255 - data.data[i];     // red
        data.data[i + 1] = 255 - data.data[i + 1]; // green
        data.data[i + 2] = 255 - data.data[i + 2]; // blue
      }
      this.context.putImageData(data, x, y);
    }

    checkRoad() {
      var x = this.dir === 'u' ? this.x - this.r : this.dir === 'd' ? this.x - this.r : this.dir === 'r' ? this.x + this.r : this.x - this.r * 3;
      var y = this.dir === 'u' ? this.y - this.r * 3 : this.dir === 'd' ? this.y + this.r : this.dir === 'r' ? this.y - this.r : this.y - this.r;

      var data = this.context.getImageData(x, y, this.r * 2, this.r * 2);
      var nth = 4;

      data.data.forEach(function (value, index) {

        if (index % nth === nth - 1) {
          var row: number = Math.ceil((index + 1) / (data.width * 4));
          console.log(row)
          //tikslas rasti sankryza arba posuki, jie toks darinys neaptiktas, palikti krypti kokia buvo

        }

      })

      function _isPixelWhite(colors: Array<number>, index: number): boolean {
        var r = colors[index + 0];
        var g = colors[index + 1];
        var b = colors[index + 2];
        var a = colors[index + 3];

        return r > 0 || g > 0 || b > 0;
      }
    }
  }
}