window.onload = function(){
	var canvas = document.getElementById('canvas');
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.height = height;
	canvas.width = width;

	//Storm variables 
	var ballspeed = 2;
	var speed = 2;

	var color = [ '#4A390C','#F2BA49','#FFDF0F','#4E3208']

	var ctx = canvas.getContext('2d');

	var Dust = function(x,y,radius,angle,factor,color){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.counter = 0.00;
		this.inc = 0.01;
		this.xspeed = ballspeed*Math.cos(angle)*factor;
		this.yspeed = ballspeed*Math.sin(angle)*factor;
		this.radians = 0;
		this.velocity = 0.05;

		this.draw = function(){
			ctx.beginPath();
			//console.log(this.x );
			ctx.fillStyle = this.color ;
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fill();
		}
			
		this.move = function(){
			this.radians+=this.velocity;
			this.x-=this.xspeed + speed*Math.sin(this.counter) + 2* Math.cos(this.radians);
			this.y+=this.yspeed + speed*Math.sin(this.counter) +  2* Math.cos(this.radians);
			this.counter+=this.inc;
			

			if(this.x<0){
				this.x = width;
			}


			if(this.y>height){
				this.y = 0;
			}


			if(this.x>width){
				this.x = 0;
			}

			if(this.y<0){
				this.y = height;
			}

			if(Math.random()>0.98){
				this.x = (Math.random())*width;
				this.y = height/2+(Math.random()*2-1)*height/3;

			}

			this.draw();
		}

	}


	var no_of_par = 6200;
	var particles = [];

	for(var i =0 ;i<no_of_par;i++){
		var temp  = new Dust(Math.random()*width,Math.random()*height,0.1+Math.random()*1,
			(Math.random()*Math.PI/4),1+Math.random()*3,color[Math.floor(Math.random()*5)]);
		particles.push(temp);
	}

	function DrawLandscape(){

		//draw sun
		ctx.beginPath();
		ctx.arc(width/8,height/8,50,0,2*Math.PI);
		ctx.fillStyle = "#FFA201";
		ctx.fill();

		ctx.beginPath();
		//bezerius curve for landscape
		ctx.moveTo(0,3*height/4);
		ctx.bezierCurveTo(width/4,height/2,width/2,height,width,7*height/8);
		ctx.lineTo(width,height);
		ctx.lineTo(0,height);
		ctx.lineTo(0,3*height/4);
		ctx.fillStyle = "#8E6C0F";
		ctx.fill();
		ctx.closePath();
		ctx.moveTo(0,0);

		ctx.beginPath();
		ctx.moveTo(0,8*height/9);
		
		ctx.bezierCurveTo(width/4,9*height/11,3*width/4,height,width+100,3*height/5);
		ctx.lineTo(width,height);
		ctx.lineTo(0,height);
		ctx.lineTo(0,8*height/9);
		ctx.fillStyle = "#F9EB67";
		ctx.fill();
		ctx.closePath();
		ctx.moveTo(0,0);


		
	}


	function animate(){
		ctx.clearRect(0,0,width,height);
		ctx.fillStyle = "#FFF195";
		ctx.fillRect(0,0,width,height);
		DrawLandscape();
		for(var i =0;i<particles.length;i++){
			particles[i].move();
		}
		requestAnimationFrame(animate);
	}

	DrawLandscape();
	animate();
}