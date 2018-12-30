window.onload = function(){
	var canvas = document.getElementById('canvas');
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.height = height;
	canvas.width = width;

	ctx = canvas.getContext('2d');

	var color = ['#59D8FF','#03C0F9','#0496C2','#7DFFEE'];


	var Stream = function(x,height,dy,y,iheight,speed){
		this.x = x;
		this.y = y;
		this.iheight = iheight;
		this.height = height;
		this.dy = dy;
		this.speed = speed;

		this.draw = function(){
			ctx.beginPath();
			ctx.moveTo(this.x,this.y);
			ctx.lineTo(this.x,this.y+this.dy);
			ctx.shadowBlur = 0;
			ctx.shadowColor = "#03C0F9";
			ctx.lineWidth = 1+Math.random()*2;
			ctx.globalAlpha = Math.random()*0.2;
			ctx.strokeStyle = color[Math.floor(Math.random()*4)];
			ctx.stroke();
			ctx.shadowColor = 0;
			ctx.closePath();
		}

		this.move = function(){
			this.y +=this.speed;
			if(this.y >=this.height){
				this.y = this.iheight;

			}

			this.draw();
		}
	}

	//animation variables
	var streams =  [];
	var secondStream = [];
	
	var initialHeight = height/8;
	var min_x = width/2-width/6;
	var max_x = width/2+width/6;
	var finalHeight = 9*height/11;
	var dy = 60;
	var speed = 3;
	var no_of_Streams = 1500*Math.ceil(Math.sqrt(width/900));
	var threshold = 0;

	//make the stream
	for(var i = min_x;i<max_x;i+=(max_x-min_x)/no_of_Streams){
		var stream = new Stream(i,
			finalHeight,
			dy,initialHeight + Math.random()*(finalHeight-initialHeight),initialHeight,speed + Math.random()*speed);
		//var stream = new Stream(width/2,height,5,height/4);
		streams.push(stream);
	}

	for(var i = min_x;i<max_x;i+=2*(max_x-min_x)/no_of_Streams){
		var stream = new Stream(i,finalHeight,dy,Math.random()*initialHeight+initialHeight,initialHeight*2,speed + Math.random()*speed);
		//var stream = new Stream(width/2,height,5,height/4);
		secondStream.push(stream);
	}


	//make the circles
	var min_Radius = 1;
	var max_Radius = 30;
	var no_of_cicles = 500*Math.ceil(Math.sqrt(width/900));
	var deflection = 5;

	var Circle = function(x,y,radius,opacity,inc){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.opacity = opacity;
		this.inc = inc;

		this.draw = function(){
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
			ctx.globalAlpha = this.opacity;
			ctx.fillStyle = "#03C0F9";
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha =1;

		}

		this.update = function(){

			this.opacity = Math.random()*0.05;
			

			this.draw() ;
		}
	}

	var circles = [];
	for(var i = min_x;i<max_x;i+=(max_x-min_x)/no_of_cicles){
		var circle = new Circle(i,finalHeight+dy + (Math.random()*2-1)*deflection,
			min_Radius + max_Radius*Math.random(),Math.random(),Math.random());
		//var stream = new Stream(width/2,height,5,height/4);
		circles.push(circle);
	}


	
	ctx.strokeStyle = '#03C0F9';
	ctx.globalCompositeOperation = "lighter";


	function animate(){
		ctx.clearRect(0,0,width,height);
		ctx.fillStyle = '#000000';
		ctx.globalAlpha =1;
		ctx.fillRect(0,0,width,height);


		ctx.beginPath();
		ctx.moveTo(width/4,initialHeight);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'grey';
		ctx.lineTo(3*width/4,initialHeight);
		ctx.stroke();
		ctx.closePath();


		for (var i = streams.length - 1; i >= 0; i--) {
			streams[i].move();

		}

		for (var i = secondStream.length - 1; i >= 0; i--) {
			secondStream[i].move();
		}

		for (var i = circles.length - 1; i >= 0; i--) {
			if(Math.random()>.5)
			circles[i].update();
		}

		var my_gradient = ctx.createLinearGradient(min_x, initialHeight, min_x, finalHeight);
		my_gradient.addColorStop(0,"#D5F5FF");
		my_gradient.addColorStop(0.1, "#03C0F9");
		my_gradient.addColorStop(0.99, "black");
		ctx.globalAlpha = 1;
		ctx.fillStyle = my_gradient;
		ctx.fillRect(min_x, initialHeight, min_x, finalHeight);

		window.requestAnimationFrame(animate);
	}

	animate();
}