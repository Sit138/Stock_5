var population = [
    119897000,
    123960000,
    127468000,
    129664000,
    131909000,
    134200000,
    137060000,
    139941000,
    142745000,
    145908000,
    147665100,
    148355900,
    148291600,
    147539400,
    145649300,
    143801000,
    142747500,
    142865400,
    143666900,
    146270033
];
function normaliz(num){//нормирование численности в px
    var px = 250 - 200 * (num - 110000000) / 40000000;//линейная интерполяция
    return px;
}
function inRad(num) {//переводит градусы в радианы
    return num * Math.PI / 180;
}
function paintOXY(){
    var canvas = document.getElementById('draw'),
        x = canvas.getContext("2d");
    var date;
    x.beginPath();
    x.lineWidth = 0.5;
    x.font = "15px sans-serif";
    for(var i = 50, j = 150; i < 260, j > 100; i += 50, j -= 10){
        x.moveTo(200, i);
        x.lineTo(1000, i);
        x.font = "15px sans-serif";
        x.fillText(j + "000 000", 100, i);
    }
    x.save();
    x.font = "italic 17px sans-serif";
    x.rotate(inRad(270));
    x.fillText("Население", -190, 70);
    x.rotate(inRad(45));
    for(i = 130, j = 330, date = 1960; i < 800, j < 520; i += 40, j += 10, date += 3){
        x.save();
        x.font = "13px sans-serif";
        x.translate (x.width/2, x.height/2);
        x.rotate(inRad(30));
        x.fillText(date, i, j += 0.5);
        x.restore();
    }
    x.stroke();
    //сама линия
    x.beginPath();
    x.restore();
    x.strokeStyle = "#1464fa";
    x.moveTo(210, normaliz(population[0]));
    x.lineWidth = "2";
    for(i = 255, j = 1;j < population.length - 1; i += 45, j++){
        console.log(normaliz(population[j]));
        x.lineTo(i, normaliz(population[j]));
    }
    x.stroke();
}
paintOXY();