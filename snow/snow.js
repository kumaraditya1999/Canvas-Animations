window.onload= function(){
  var canvas=document.getElementById('canvas');
  var ctx=canvas.getContext('2d');


  var W=window.innerWidth;
  var H=window.innerHeight;
  canvas.width=W;
  canvas.height=H;

  var mf=100;
  var flakes=[];


  for(var i=0;i<mf;i++)
  {
    flakes.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*5+2,
      d:Math.random()+1,
    })
    }


    function drawFlakes()
    {  ctx.clearRect(0,0,W,H);
      ctx.fillStyle="white";
      ctx.beginPath();
      for(var i=0;i<mf;i++)
      {  ctx.moveTo(flakes[i].x,flakes[i].y);
         ctx.arc(flakes[i].x,flakes[i].y,flakes[i].r,0,Math.PI*2,true);
         // ctx.closePath();

      }

      ctx.fill();
      moveFlakes();
    }


    var angle=0;
    function moveFlakes()
    {
     angle+=0.01;
     for(var i=0; i<mf;i++)
     {  var f=flakes[i];
        f.x+=Math.sin(angle)*2;
        f.y+=Math.pow(f.d,2)+1;

      if(f.y>H){ flakes[i]={x:Math.random()*W,y:0,r:f.r,d:f.d}}}

    }

    setInterval(drawFlakes, 25);


    }
