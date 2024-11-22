//const  ctx = document.getElementById('pintura')
//const  ctx = document.querySelector('pintura').getContext('2d');
const  ctx = pintura.getContext('2d');
let objetos = [
    {nombre:'juanito perez',x:50,y:0,width:10,color:'#aa9900',velocidad:0.1},
    {nombre:'piedra2',x:80,y:0,width:10,color:'#BB1100',velocidad:1},
    {nombre:'piedra3',x:20,y:60,width:10,color:'#aa99CC',velocidad:2},
    {nombre:'piedra4',x:350,y:0,width:10,color:'#025',velocidad:2},
];

const minRad=10;
const rangeRad=20;
let p=0;
let x=0,y=0;
let mouseRadioCrece = true;
colision=(objecto1,objecto2)=>{
    const distancia = Math.sqrt((objecto2.x-objecto1.x)**2+(objecto2.y-objecto1.y)**2)
    return distancia <= (objecto1.width/2+objecto2.width/2)?true:false;
}
let finJuego=false;
function animate(){


    if(mouseRadioCrece)
    {
        p=p+0.01;
        if(p>1){
            //p = 0;
            mouseRadioCrece=false;
        }
    }else{
        p=p-0.01;
        if(p<0.1){
            //p = 0;
            mouseRadioCrece=true;
        }
    }
    const rad=minRad+rangeRad*p;
    //console.log('p',p,'-----',rad)
    ctx.clearRect(0,0,pintura.width,pintura.height);
    objetos.forEach(objeto=>{
        ctx.beginPath();
        ctx.arc(objeto.x,objeto.y,objeto.width,0,Math.PI*2);
        ctx.fillStyle=objeto.color;
        ctx.fill();
        ctx.stroke();
        ctx.font = "10px Arial";
        const a = ctx.measureText(objeto.nombre);
        ctx.fillText(objeto.nombre,objeto.x-a.width/2,objeto.y+20);

        if(colision({x:x,y:y,width:rad},objeto)){
            alert('NOOO!!! GAME OVER');
            finJuego = true;
        }
        objeto.y+=objeto.velocidad;
        if(objeto.y > pintura.height){
            objeto.y = 0;
            objeto.velocidad*=1.2;
            objeto.x = (Math.random()*pintura.width); 
        }
    })
    //mouse
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2);
    ctx.fillStyle='#1288AA';
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(1,1,pintura.width-1,pintura.height-1);
    ctx.stroke();
    if(!finJuego)
        requestAnimationFrame(animate)
}
animate();
pintura.addEventListener('mousemove',(info)=>{
    x = info.x;
    y = info.y;
    console.log(info);
});

