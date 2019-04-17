
module Roads {
    export class init {
      private readonly context: CanvasRenderingContext2D;
      private readonly image: HTMLImageElement;

      constructor(private host: HTMLCanvasElement) {
        this.context = host.getContext('2d');
        // this.image = new Image(this.context.canvas.width, this.context.canvas.height);
        // this.image.src = './src/img/road_1.png';
        // this.image.onload = (event) => {
        //   this.draw();
        //   calback();
        // }
      }

      draw(): void {
        //this.context.drawImage(this.image, 0, 0);
        this.context.imageSmoothingEnabled = false;
        this.context.imageSmoothingQuality = 'low';
        var rectangle = new Path2D();
        rectangle.rect(15.5, 15.5, this.context.canvas.width-(15*2), this.context.canvas.height-(15*2));
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'rgba(255,0,0,255)';
        this.context.stroke(rectangle);

        var rectangle = new Path2D();
        rectangle.rect(15.5, 15.5, this.context.canvas.width/2, this.context.canvas.height/2);
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'rgba(255,0,0,255)';
        this.context.stroke(rectangle);

        var rectangle = new Path2D();
        rectangle.rect(15.5, 15.5, this.context.canvas.width/4, this.context.canvas.height-(15*2));
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'rgba(255,0,0,255)';
        this.context.stroke(rectangle);

        var rectangle = new Path2D();
        rectangle.rect(15.5, this.context.canvas.height - this.context.canvas.height / 4 - 14.5, this.context.canvas.width -(15*2), this.context.canvas.height / 4);
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'rgba(255,0,0,255)';
        this.context.stroke(rectangle);

        var rectangle = new Path2D();
        rectangle.rect(15.5, 15.5, this.context.canvas.width - this.context.canvas.width/4, this.context.canvas.height-(15*2));
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'rgba(255,0,0,255)';
        this.context.stroke(rectangle);
      }
    }
  }