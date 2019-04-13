interface params {
    color: string,
    size: number,
    x: number,
    y:number,
    [key:string]:any
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
          this.context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
          this.context.fillStyle = this.color;
          this.context.fill();
          this.context.closePath();
      }

      drive(): void{
        //move per 1 pixel

      }
    }
  }