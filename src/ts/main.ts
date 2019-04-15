//http-server
//tsc

function initMain() {
    const canvas = <HTMLCanvasElement>document.getElementById('mainCanv');
    const driveBTN = <HTMLButtonElement>document.getElementById('drive');

    var car = new Car.init(canvas, { color: "blue", size: 10, x: 15, y: 25 });
    var roads = new Roads.init(canvas);

    driveBTN.addEventListener('click', function(event){
        car.drive();
    })
    // var drawRoads = new Roads.init(canvas, function(){
    //     car.draw();
    //     car.checkRoad();
    // });

    
    roads.draw();
    car.draw();

    window.requestAnimationFrame(initSimulation)

    function initSimulation():void{
        car.drive();
        canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
        roads.draw();
        car.draw();

        window.requestAnimationFrame(initSimulation)
    }
}

document.addEventListener('DOMContentLoaded', initMain, false);