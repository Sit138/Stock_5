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
var canvas = document.getElementById('draw'),
    x = canvas.getContext("2d");
function normaliz(num){//нормирование численности в px
    var px = 250 - 200 * (num - 110000000) / 40000000;//линейная интерполяция
    return px;
}
function inRad(num)     {//переводит градусы в радианы
    return num * Math.PI / 180;
}
function paintOXY(json){
    var mas = [];
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
    x.restore();

    var pop = json,
        length = pop.length,
        masKey = Object.keys(pop[0]),
        step = (1000 - 200)/length;
    console.log(masKey);
    x.stroke();
    x.beginPath();
    x.restore();
    x.strokeStyle = "blue";
    x.moveTo(200, normaliz(pop[0][masKey[1]]));
    x.lineWidth = "2";
    i = 200 + step;
    for(i, j = 1; j < length; i += step, j++){
        x.lineTo(i, normaliz(pop[j][masKey[1]]));
        x.stroke();
    }
    x.save();
    i = 200 + step;
    for(i, j = 1; j < length; i += step, j++){
        x.beginPath();
        x.strokeStyle = "blue";
        x.fillStyle = "blue";
        x.arc(i, normaliz(pop[j][masKey[1]]), 2, 0, Math.PI*2, false);
        var buf = [i, normaliz(pop[j][masKey[1]]), pop[j][masKey[0]],pop[j][masKey[1]]];
        mas[j] = buf;//массив координат, год, население
        x.fill();
        x.stroke();
    }
    console.log(mas);
    x.restore();
    x.beginPath();
    for(i = 200, j = 0; j < length; i += 3*step, j += 3){
        x.fillText(pop[j][masKey[0]], i, 270);
    }
    x.stroke();

    /*Добавляем событие на движение мыши*/
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(message);

        console.log(message);

    }, false);
}


/*Функция для загрузки json*/
function loadKeyFromJson(paintOXY){
    var xhttp = new XMLHttpRequest(),
        json, i;
    xhttp.open('POST', 'population.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        try{
            if(xhttp.readyState == 4) {
                console.log(xhttp.status);
                json = eval('('+xhttp.responseText+')');
                paintOXY(json);
            }
        }
        catch (e) {
            //document.getElementById('blockWithPhone').style.display = 'none';
            alert('Sorry, the data error...');
        }
    }
}
loadKeyFromJson(paintOXY);

/*Тут вывод координат*/
function writeMessage(message) {
    //x.clearRect(0, 0, canvas.width, canvas.height);
    //x.font = '10pt Calibri';
    //x.fillStyle = 'black';
    //x.fillText(message, 10, 25);
    document.getElementById('res').innerHTML = message;

}
/*Отслеживание положение курсора*/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
