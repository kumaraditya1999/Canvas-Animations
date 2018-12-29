window.onload = function(){

	var canvas = document.getElementById("canvas");
	var height = window.innerHeight;
	var width = window.innerWidth;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');
	ctx.shadowBlur = 30;
	ctx.shadowColor = "#6AE3CF";
	ctx.fillStyle = "#042C61";
	ctx.strokeStyle = "#21BBA1";
	ctx.fillRect(0,0,width,height);

	var Drop = function(x,y,angle,size){
		this.x = x;
		this.y = y;
		this.startx = x;
		this.starty = y;
		this.angle = angle;
		this.size = size;
		
		this.draw = function(){
			ctx.beginPath();
			ctx.moveTo(this.x ,this.y);
			ctx.lineTo(this.x + size*Math.cos(angle),this.y +size*Math.cos(angle));
			ctx.stroke();
			ctx.moveTo(0,0);
			//console.log("Drawing");
		}

		this.pour = function(){
			this.x = this.x + size*Math.sin(angle);
			this.y = this.y +size*Math.cos(angle);

			if(this.x>width){
				this.x = 0;
			}
			if(this.y>height){
				this.y = 0;
			}
			this.draw(); 
		}
	}

	//Rain variables
	var no_of_drops = 600;
	var angle = Math.PI/6;
	var size = 20;

	var drops = [];

	for(var i =0;i<no_of_drops;i++){
		var temp = new Drop(Math.random()*width,Math.random()*height,angle,size);
		drops.push(temp);
	}

	function animate(){
		ctx.fillStyle = "rgba(4,44,97,0.3)";
		ctx.fillRect(0,0,width,height);
		for(var i=0;i<no_of_drops;i++){
			drops[i].pour();
		}
		window.requestAnimationFrame(animate);
	}


	animate();
}