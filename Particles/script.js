window.onload = function(){

	var canvas = document.getElementById("canvas");
	var height = window.innerHeight;
	var width = window.innerWidth;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');
	
	

	var Partice = function(x,y,size,velx,vely,differ,color){

		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.velx = velx;
		this.vely = vely;
		this.max_size = 2*size;
		this.min_size = size/2;
		this.differ = differ;

		this.draw = function(){
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.arc(this.x,this.y,3*this.size,0,2*Math.PI);
			ctx.strokeStyle = this.color;
			ctx.stroke();
		}


		this.move = function(){
			this.x +=this.velx;
			this.y +=this.vely;

			//expansion
			this.size+=this.differ;

			if(this.size >this.max_size&&this.differ>0||this.size <this.min_size&&this.differ<0){
				this.differ = - this.differ;
			}

			if(this.x > width+100 ){
				this.x = 0;
				this.y = Math.random()*height;
			}
			if(this.x < -100 ){
				this.x = width;
				this.y = Math.random()*height;
			}
			if(this.y < -100 ){
				this.y = height;
				this.x = Math.random()*width;
			}
			if(this.y > height+100){
				this.y = 0;
				this.x = Math.random()*width;
			}	

			if(Math.random()>0.9){
				this.velx = 0;
			}
			if(Math.random()>0.9){
				this.vely = 0;
			}

			this.velx += (Math.random()*2-1);
			this.vely += (Math.random()*2-1);

			this.draw();
		}
	}
	var alpha = 300/Math.sqrt(500*600);
	//console.log(width,height);
	var no_of_particles = Math.ceil(Math.sqrt(width*height)*alpha);
	var particles = [];
	var min_size = 2;
	var max_size = 15;
	var min_differ = 0.5;
	var max_differ = 0.5;
	var velocity = 5;
	var GREEN = "rgba(67,204,52,0.8)"
	var RED = "rgba(254,57,8,0.8)"
	var BLUE = "rgba(47,181,221,0.8)"
	var ORANGE = "rgba(255,119,1,0.8)"
	var colors = [GREEN,BLUE,RED,ORANGE];
	var max_distance = width/8;

	for(var i =0;i<no_of_particles;i++){
		var temp = new Partice(Math.random()*width,Math.random()*height,
							   min_size+Math.random()*(max_size-min_size),
							   Math.random()*velocity,Math.random()*velocity,
							   min_differ + Math.random()*max_differ,
							   colors[Math.floor(Math.random()*5)]);
		particles.push(temp);
	}

	function calDistance(a,b){
		return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
	}

	function animate(){
		ctx.clearRect(0,0,width,height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,width,height);
		ctx.globalCompositeOperation = 'lighter';
		var taken = []
		//draw the particle
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].move();
			taken.push(1);
		}

		//draw the lines
		for(var i =0;i<no_of_particles;i++){
			for(var j = i+1;j<no_of_particles;j++){
				if(taken[i]<3&&taken[j]<3){
					if(particles[i].color == particles[j].color){
						if(calDistance(particles[i],particles[j])<max_distance){
							ctx.beginPath();
							ctx.moveTo(particles[i].x,particles[i].y);
							ctx.lineTo(particles[j].x,particles[j].y);
							ctx.strokeStyle = particles[i].color;
							ctx.lineWidth = 3;
							ctx.stroke();
							ctx.closePath();
							taken[i]++;
							taken[j]++;

						}
					}
				}
			}
		}

		window.requestAnimationFrame(animate);
	}


	animate();
}



















