//http-server
//tsc

function initMain() {
    const canvas = <HTMLCanvasElement>document.getElementById('mainCanv');
    const driveBTN = <HTMLButtonElement>document.getElementById('drive');

    var car = new Car.init(canvas, { color: "brown", size: 10, x: 15, y: 100 });
    var drawRoads = new Roads.init(canvas);

    driveBTN.addEventListener('click', function(event){
        car.drive();
    })
    // var drawRoads = new Roads.init(canvas, function(){
    //     car.draw();
    //     car.checkRoad();
    // });

    
    drawRoads.draw();
    car.draw();

    

    //analise image and create road map

}

document.addEventListener('DOMContentLoaded', initMain, false);