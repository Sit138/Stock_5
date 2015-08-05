var canvas = document.getElementById('draw'),
    x = canvas.getContext("2d");//основная канва
var tipCanvas = document.getElementById("tip");//здесь будем выводить сообщения
var tipCtx = tipCanvas.getContext("2d");
var canvasOffset = $("#draw").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
function normaliz(num){//нормирование численности в px
    var px = 250 - 200 * (num - 110000000) / 40000000;//линейная интерполяция
    return px;
}
function inRad(num) {//переводит градусы в радианы
    return num * Math.PI / 180;
}
function paintOXY(json){
    //var ctx = canvas.getContext("2d");
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
    x.save();
    x.moveTo(200, normaliz(pop[0][masKey[1]]));
    x.lineWidth = "2";
    x.strokeStyle = "blue";
    x.lineJoin = "round";
    x.shadowOffsetX = -2;
    x.shadowOffsetY = 1;
    x.shadowBlur=1;
    x.shadowColor='blue';
    i = 200 + step;
    for(i, j = 1; j < length; i += step, j++){
        x.lineTo(i, normaliz(pop[j][masKey[1]]));

    }
    x.stroke();
    i = 200 + step;
    var dots = [];
    dots.push({//начальная позиция(запишем отдельно)
        x: 200,
        y: normaliz(pop[0][masKey[1]]),
        r: 4,
        rXr: 16,
        color: "red",
        tip: "Население" + pop[0][masKey[1]]
    });
    /*Будем рисовать тточку и сохранять координаты в объект*/
    for(i, j = 1; j < length; i += step, j++){
        x.beginPath();
        x.restore();
        x.save();
        x.strokeStyle = "red";
        x.fillStyle = "red";
        x.arc(i, normaliz(pop[j][masKey[1]]), 4, 0, Math.PI*2, false);
        x.fill();
        x.stroke();
        dots.push({
            x: i,
            y: normaliz(pop[j][masKey[1]]),
            r: 4,
            rXr: 16,
            color: "red",
            tip: "Население" + pop[j][masKey[1]]
        });
    }
    console.log(dots);
    x.restore();
    x.beginPath();
    x.font = "italic 10pt sans-serif";
    for(i = 200, j = 0; j < length; i += 3*step, j += 3){
        x.fillText(pop[j][masKey[0]], i, 270);
    }
    x.stroke();


    /*Добавляем событие на движение мыши*/
    canvas.addEventListener('mousemove', function(e) {
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here
        var hit = false;
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            var dx = mouseX - dot.x;
            var dy = mouseY - dot.y;
            if (dx * dx + dy * dy < dot.rXr) {
                tipCanvas.style.left = (dot.x + 100) + "px";
                tipCanvas.style.top = (dot.y + 100) + "px";
                tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
                //                  tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
                //tipCtx.fillText($(dot.tip).val(), 5, 10);
                document.getElementById("tip").style.display = "block";
                tipCtx.textBaseline = "middle";
                tipCtx.font = 'italic 10pt sans-serif';
                tipCtx.fillText("Год: " + pop[i][masKey[0]],5,10);
                tipCtx.fillText("Население: " + pop[i][masKey[1]],5,25);
                hit = true;
            }
        }
        if (!hit) {
            tipCanvas.style.left = "-100px";
            document.getElementById("tip").style.display = "none";
        }

    }, false);
}

/*Функция для загрузки json*/
function loadKeyFromJson(paintOXY){
    var xhttp = new XMLHttpRequest(),
        json, i;
    xhttp.open('GET', 'population1.json', true);
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
