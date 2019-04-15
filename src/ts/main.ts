//http-server
//tsc

function initMain() {
    const canvas = <HTMLCanvasElement>document.getElementById('mainCanv');
    // const driveBTN = <HTMLButtonElement>document.getElementById('drive');
    const carsCount = 5;
    const carsArray: Array<Car.init> = [];

    var size = 10;
    var x = 15;
    var y = 50;
    for (let index = 0; index < carsCount; index++) {
        y = y + size + 15;
        carsArray.push(new Car.init(canvas, { color: "blue", size: size, x: x, y: y }))
    }
    var roads = new Roads.init(canvas);

    roads.draw();

    window.requestAnimationFrame(initSimulation)

    function initSimulation(): void {
        carsArray.forEach((element) => element.drive())
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        roads.draw();
        carsArray.forEach((element) => element.draw())

        window.requestAnimationFrame(initSimulation)
    }
}

document.addEventListener('DOMContentLoaded', initMain, false);