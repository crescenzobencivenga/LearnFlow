
let posizioni = new Array
var ris = new Array
let ind
var todrop

var json = $.getJSON("es2.json",function(data){
    var index = 0
    for (let index = 0; index < data.shapes.length; index++) {
        draw(data.shapes[index],data.array[index],index)
    }
    $.each(data.ordineCorretto, function(key, val){
        var drop = document.createElement("div");
        drop.id=val+100
        drop.className="row droppable ui-widget-header"
        drop.setAttribute("style","clear:both")
        var element = document.getElementById("todrop")
        element.appendChild(drop)
    });
});


function prova(){
todrop = document.getElementById('todrop').childNodes
var j = 0
console.log(todrop)
for (let index = 0; index < todrop.length; index++) {
    posizioni.push(0)
    ris.push(0)
    }    
}

function find_free(){
    console.log(posizioni)
    for (let index = 0; index < todrop.length; index++) {
        if(posizioni[index]==0){
            posizioni[index] = 1
            ind=index
            return todrop[index].id
        }
    }
}


function move(element){
    if(element.classList.contains("off")){
    var el = document.getElementById(find_free())
    el.appendChild(element)
    element.classList.remove("off")
    element.classList.add("on")
    ris[ind]=parseInt(element.id)
    }else{
        var pos = document.getElementById("items")
        updateposizioni(element)
        element.classList.remove("on")
        element.classList.add("off")
        pos.appendChild(element)
    }
}

function updateposizioni(element){
    for (let index = 0; index < todrop.length; index++) {
        if(posizioni[index]==1){
        if(todrop[index].hasChildNodes){
            var chi = todrop[index].childNodes
            if(chi[0].id==element.id){
                posizioni[index]=0;
            }
        }
    }
}
}


function draw(forma,testo,index){
    var canv = document.createElement('canvas')
    canv.id=index
    canv.height = 100
    canv.width = 200
    canv.style="border:1px solid #d3d3d3;"
    canv.className = "off"
    canv.onclick=function(){
        move(this)
      }
    if(forma=="rombo"){
        canv = creaRombo(canv)
    }else if(forma=="par"){
        canv = creaParall(canv)
    }else if(forma=="rett"){
        canv = creaRett(canv)
    }
    var x = canv.width/2
    var y = canv.height/2
    var ctx = canv.getContext("2d")
    ctx.font = "20px Georgia"
    ctx.textAlign="center"
    ctx.fillText(testo, x, y)
    var element = document.getElementById("items")
    element.appendChild(canv)
    console.log(canv.getBoundingClientRect())

}

function linedraw(ax,ay,bx,by)
{
    console.log(ax,ay,bx,by)
    if(ay>by)
    {
        bx=ax+bx;  
        ax=bx-ax;
        bx=bx-ax;
        by=ay+by;  
        ay=by-ay;  
        by=by-ay;
    }
    var calc=Math.atan((ay-by)/(bx-ax));
    calc=calc*180/Math.PI;
    var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
    var di= document.getElementById('cane')
    di.innerHTML += "<div id='line' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
}

function linedraw2(Ax,Ay,Bx,By){
    var bla = ""
    var lineLength = Math.sqrt( (Ax-Bx)*(Ax-Bx)+(Ay-By)*(Ay-By) );
    for( var i=0; i<lineLength; i++ )
    {
    bla += "<div style='position:absolute;left:"+ Math.round( Ax+(Bx-Ax)*i/lineLength  ) +"px;top:"+ Math.round( Ay+(By-Ay)*i/lineLength  ) +"px;width:1px;height:1px;background:#000'></div>";
    }
    var di= document.getElementById('cane')
    di.innerHTML += bla;
}

function creaRombo(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d')
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(l/2,h/10)
        ctx.lineTo(l/10,h/2)
        ctx.lineTo(l/2,h-h/10)
        ctx.lineTo(l-l/10,h/2)
        ctx.lineTo(l/2,h/10)
        $.getJSON("es2.json",function(data){
            if(data.if[1]!=null){
                ctx.moveTo(0,h/2)
                ctx.lineTo(l/10,h/2)
                ctx.stroke();
            }
            if(data.if[2]!=null){
                ctx.moveTo(l,h/2)
                ctx.lineTo(l-l/10,h/2)
                ctx.stroke();
            }
        });
        ctx.stroke();
        
    }
    return canvas
}

function creaParall(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d')
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(l/10*2,h/10)
        ctx.lineTo(l/10,h-h/10)
        ctx.lineTo(l-(l/10)*2,h-h/10)
        ctx.lineTo(l-(l/10),h/10)
        ctx.lineTo(l/10*2,h/10)
        $.getJSON("es2.json",function(data){
            if(data.if[1]==parseInt(canvas.id)){
                ctx.moveTo(0,h/2)
                ctx.lineTo(l/10,h/2)
                ctx.stroke();
            }
            if(data.if[2]==parseInt(canvas.id)){
                ctx.moveTo(l,h/2)
                ctx.lineTo(l-l/10,h/2)
                ctx.stroke();
            }
        });
        ctx.stroke();
    }
    return canvas
}

function creaRett(canvas){
    if(canvas.getContext){
        var ctx = canvas.getContext("2d")
        var h = canvas.height
        var l = canvas.width
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        $.getJSON("es2.json",function(data){
            if(data.if[1]==parseInt(canvas.id)){
                ctx.moveTo(0,h/2)
                ctx.lineTo(l/10,h/2)
                ctx.stroke();
            }
            if(data.if[2]==parseInt(canvas.id)){
                ctx.moveTo(l,h/2)
                ctx.lineTo(l-l/10,h/2)
                ctx.stroke();
            }
        });
        ctx.strokeRect(l/10, h/10, l-(l/10)*2, h-(h/10)*2);
    }
    return canvas
}

function drawLines(){
    $.getJSON("es2.json",function(data){
        creaLinee(data.if)
    });
}

function creaLinee(toconn){
    console.log("da connettere "+toconn)
    var elPart = document.getElementById(toconn[0])
    var start1 = elPart.getBoundingClientRect()
    var h = elPart.height
    var l = elPart.width
    var leftLine = document.getElementById(toconn[1])
    var end1 = leftLine.getBoundingClientRect()
    linedraw2(end1.x,end1.y+h/2,start1.x,start1.y+h/2)
    var rightLine=document.getElementById(toconn[2])
    var end2 = rightLine.getBoundingClientRect()
    linedraw2(end2.x+l,end2.y+h/2,start1.x+l,start1.y+h/2)
}


function check(){
    var corrette = 0
    $.getJSON("es2.json",function(data){
        $.each(data.ordineCorretto,function(key,val){
            if(ris[key]==val){
                corrette=corrette+1
            }
        });
        console.log(corrette.length)
        alert(corrette/ris.length)
    });
}