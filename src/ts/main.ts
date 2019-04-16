//http-server
//tsc

function initMain() {
    const canvas = <HTMLCanvasElement>document.getElementById('mainCanv');
    const driveBTN = <HTMLButtonElement>document.getElementById('drive');
    const fsBTN = <HTMLButtonElement>document.getElementById('fs');
    const carsCount = 5;
    const carsArray: Array<Car.init> = [];
    const d = new d1.init();

    var size = 10;
    var x = 15;
    var y = 50;
    for (let index = 0; index < carsCount; index++) {
        y = y + size + 15;
        carsArray.push(new Car.init(canvas, { color: getColor(), size: size, x: x, y: y }))
    }
    var roads = new Roads.init(canvas);

    roads.draw();
    carsArray.forEach((element) => element.draw())

    function getColor(): string {
        var r = d.getRandomIntInclusive(0, 255);
        var g = d.getRandomIntInclusive(0, 255);
        var b = d.getRandomIntInclusive(50, 255);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function initSimulation(): void {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        roads.draw();
        carsArray.forEach((element) => element.drive())
        carsArray.forEach((element) => element.draw())

        window.requestAnimationFrame(initSimulation)
    }

    driveBTN.addEventListener('click', initSimulation, false);
    fsBTN.addEventListener('click', function(){
        document.getElementById('mainCanv').requestFullscreen();
    });
}

document.addEventListener('DOMContentLoaded', initMain, false);