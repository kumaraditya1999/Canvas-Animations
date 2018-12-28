window.onload = function(){
	var canvas = document.getElementById("canvas");
	var height = window.innerHeight;
	var width = window.innerWidth;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');
	


	//lightning varialble
	var roughness = 2;
	var minSegmentHeight = 5;
	var maxDifference = width/4;
	var lightningGap = width/50;
	var upperGap = height/20;
	var groundGap = height/8;
	var color = "hsl(180, 80%, 80%)";


	//ctx.globalCompositeOperation = "lighter";

	ctx.strokeStyle = color;
	ctx.shadowColor = color;

	ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";


	var Lightning = function(sx,sy,ex,ey){
		this.sx = sx;
		this.sy = sy;
		this.ex = ex;
		this.ey = ey;
		this.pointset = []

		this.initialise = function(){
			
			for(var j = 0; j<5 ;j++){
				var points = [];
				points.push({ x : this.sx ,y : this.sy });
				points.push({x : this.ex + (Math.random()*2-1)*width/4 ,y : this.ey + (Math.random()*2-1)*height/8  });

				var currDifference = maxDifference;
				var segmentHeight = ey - sy;
				//console.log(currDifference);
				while(segmentHeight>minSegmentHeight){

					var newSegments = [];
					for(var i = 0 ;i< points.length -1;i++){
						var start = points[i];
						var end = points[i+1];

						var midx = (start.x+end.x)/2;
						var newmidx = midx + (Math.random()*2 -1)*currDifference;
						//console.log(midx , newmidx);
						newSegments.push(start,{x : newmidx, y : (start.y + end.y)/2 });
					}

					newSegments.push(points.pop());
					points = newSegments;
					currDifference /= roughness;
					segmentHeight /= 2;	
					
				}
				//console.log(j);
				//console.log(points);
				this.pointset.push(points);
			}

		} 

		this.draw = function(){
			
			//console.log(this.pointset.length);
			for(var j =0; j <this.pointset.length ;j ++){
				ctx.beginPath();
				ctx.strokeStyle = color;
				for(var i = 0 ;i < this.pointset[j].length ; i++){
					ctx.lineTo(this.pointset[j][i].x , this.pointset[j][i]. y);
					
				}
				ctx.stroke();
				
			}
			
		}
	}

	function generateRandomPoints(){
		var start_x = width/2 + (Math.random()*2-1)*(lightningGap);
		var end_x = (Math.random()*2-1)*width/2 + width/2;
		var start_y = Math.random()*upperGap;
		var end_y = height - Math.random()*groundGap;
		var points = [];
		points.push(start_x);
		points.push(start_y);
		points.push(end_x);
		points.push(end_y);
		return points;
	}

	var count = 0;
	function DrawLightning(){


		ctx.shadowBlur = 0;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = "lighter";
		ctx.shadowBlur = 15;
		if(Math.random()>0.90){
			ctx.fillRect(0,0,width,height);
			points = generateRandomPoints();
			var lightning = new Lightning(points[0],points[1],points[2],points[3]);
			lightning.initialise();
			lightning.draw();
		}
			
		
	  
	  requestAnimationFrame(DrawLightning);

	}

	DrawLightning();
	

}