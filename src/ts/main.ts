function initMain() {
    const canvas = <HTMLCanvasElement>document.getElementById('mainCanv');

    var car = new Car.init(canvas, { color: "brown", size: 10, x: 20, y: 50 });

    var drawRoads = new Roads.init(canvas, function(){
        car.draw();
    });
    

    //analise image and create road map

}

document.addEventListener('DOMContentLoaded', initMain, false);