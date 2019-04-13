
module Roads {
    export class init {
      private readonly context: CanvasRenderingContext2D;
      private readonly image: HTMLImageElement;

      constructor(private host: HTMLCanvasElement, calback: any) {
        this.context = host.getContext('2d');
        this.image = new Image(this.context.canvas.width, this.context.canvas.height);
        this.image.src = './src/img/road_1.png';
        this.image.onload = (event) => {
          this.draw();
          calback();
        }
      }

      draw(): void {
        this.context.drawImage(this.image, 0, 0);
      }
    }
  }