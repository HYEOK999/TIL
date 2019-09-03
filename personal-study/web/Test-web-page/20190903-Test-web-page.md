# 20190903-Test-web-page Study



### 파일 구조

![file-tree](https://user-images.githubusercontent.com/31315644/64148290-ed4c6d00-ce5d-11e9-9b25-4b71a1b845d4.jpeg)



## style.css

~~~css
body{
    overflow: hidden;
}
.image{
    position:relative;
    float: left;
    height: 200px;
    width:300px;
    margin : 2px;
    border: 1px solid white;
    z-index:0;
}
.image-selected{ 
    border: 1px solid black;
    background-color:white;
}
.image-selected > img{
    opacity: 0.5;
}
.image > img{
    height:100%;
}
.image-magnified{
    z-index:1;
}
.image-magnified > img{
    height:400px;
    width:600px;
    margin-left:-150px;
    margin-top:-100px;
    opacity:0.95;
}
~~~



## image_list.json

~~~json
[
"./images/1.jpg",
"./images/2.jpg",
"./images/3.jpg",
"./images/4.jpg",
"./images/5.jpg",
"./images/6.jpg",
"./images/7.jpg",
"./images/8.jpg",
"./images/9.jpg",
"./images/10.jpg",
"./images/11.jpg",
"./images/12.jpg"
]
~~~



## index.html

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="./style.css">
    <title>Select the Gallery</title>
    <script src="./script.js"></script>
</head>
<body>
    <input type="button" value="Select All" onclick="selectAll(this)">
    <input type="button" value="Play Show" onclick="slideShow(this)">
    <hr>
</body>
</html> 
~~~



## script.js

~~~javascript
var req = new XMLHttpRequest();
req.open("GET", "./json/image_list.json");
req.onreadystatechange = function(){
    if(this.readyState == 4){
        var data = JSON.parse(this.response);
        
        for(var i= 0; i<data.length;i++){
            var div = document.createElement("div");
            div.setAttribute("class","image");
            div.onclick = function(){
                this.classList.toggle("image-selected");
            }

            div.onmouseover = function(){
                var element = this;
                this.timerId = setTimeout( function(){
                    element.classList.add("image-magnified");
                },1000);
            }

            div.onmouseout = function(){
                clearTimeout(this.timerId);
                var element = this;
                element.classList.remove("image-magnified");
            }

            var img = document.createElement("img");
            img.src = data[i];
            div.appendChild(img);
            document.body.appendChild(div);
        }
    }
}

req.send();

function selectAll(btn){
    var img = document.getElementsByClassName("image");
    for(var i=0; i<img.length; i++){
        if(btn.value == "UnSelect All"){
            img[i].classList.remove("image-selected");
        }
        else{
            img[i].classList.add("image-selected");
        }
    }

    if(btn.value == "UnSelect All"){
        btn.value = "Select All";
    }
    else{
        btn.value = "UnSelect All";
    }
}

function slideShow(btn){
    var img = document.getElementsByClassName("image");
    var index = 0;
    img[index].classList.add("image-magnified");

    var intervalId = setInterval( function(){
        img[index].classList.remove("image-magnified");
        index ++;
        if(index < img.length){
            img[index].classList.add("image-magnified");
        }
        else{
            clearInterval(intervalId);
            alert("슬라이드가 끝낫습니다.");
        }
    },1000);
}
~~~



----------------------

1. 프로젝트에 images 폴더 추가

2. 프로젝트에 json 폴더 추가

3. 프로젝트에 css 파일 추가

4. script 파일 생성

5. html <head> 태그 안에 script 파일 및 css 파일 연결

   ~~~html
   <head>
   		<link rel="stylesheet" type="text/css" href="./style.css">
   		<script src="./script.js"></script>
   </head>
   ~~~

6. script 파일 작성 시작 1

   Ajax 사용하여 비동기방식으로 json 데이터를 요청하고 응답한 값을 가지고 것 임.

   ~~~javascript
   var req = new XMLHttpRequest(); 					// 1. Ajax를 이용하기 위한 객체를 생성
   req.open("GET","./json/image_list.json"); // 2. 요청방식과 URL 설정
   
   // 3. onreadystatechange : 서버로부터 응답시 할 행동을 작성
   req.onreadystatechange = function(){     	
     // 4. 4번 -> 모든 응답이 제대로 받았을 겅우를 의미
   	if(this.readyState == 4){  
       	// 5. 응답데이터(문자열)를 javascript 객체로 변환하고 div태그를 생성하여 데이터를 대입해줍니다.
       	// div 태그의 속성은 class = "image" 로 설정합니다.
       	var data = JSON.parse(this.response); 
       	for(var i=0;i<data.length;i++){
           	var div = document.createElement("div");
           	div.setAttribute("class","image");
           
          		// 6. img 태그를 생성하고 각 데이터를 img태그에 넣습니다. 
           	// img 태그는 div태그의 자손으로, div태그는 dody태그의 자손으로 삽입합니다.
           	var img = document.createElement("img");
           	img.src = data[i];
           	div.appendChild(img);
   					document.body.appendChild(div);
    
           //밑에서 추가 진행함
        }   	
     }  
   }
   
   req.send(); // 요청합니다.
   ~~~

7. script 파일 작성 시작 2

   생성된 div 태그에 기능을 추가합니다. 기능은 총 3가지입니다.

   1. 클릭 (onclick)

      ~~~~javascript
      	// for문 안의 div.setAttribute("class","image"); 다음 줄부터 작성
      
      	// 1. 생성된 태그에 클릭 이벤트를 넣어줍니다. 
      	// 선택 및 취소 했을 경우 스타일 달리지도록 만듭니다.
      	// 선택시 image-selected , 미선택시 image
      	div.setAttribute("class","image");
      			div.onclick = function(){
      					if(this.getAttribute("class").indexOf("image-selected") == -1){
      						this.setAttribute("class","image image-selected");
      					}
      					else{
      						this.setAttribute("class","image");
      					}
      			}
      ~~~~

      ## 위 문의 if문과 else 문은 classList 함수를 이용하여 짧게 가능.

      ~~~javascript
      // for문 안의 div.setAttribute("class","image"); 다음 줄부터 작성
              	div.onclick = function(){
                		this.classList.toggle("image-selected");
              	}
      ~~~

   2. 마우스 오버 (onmouseover)

      ~~~javascript
      // 2. 생성된 태그에 마우스오버 이벤트를 넣어줍니다.
      // div 위에 마우스가 올라갈 경우 시간만큼 스타일이 달라지도록 만듭니다.
      // 사용할 css style : image-magnified
      div.onmouseove = function(){
        var element = this;
        this.timerId = setTimeout( function(){
          element.classList.add("image-magnified");
        },1000); //1초
      }
      ~~~

   3. 마우스 아웃 (onmouseout)

      ~~~javascript
      // 3. 생성된 태그에 마우스아웃 이벤트를 넣어줍니다.
      // div 위에 마우스가 빠져나갈 경우 적용된 스타일을 제거하고 시간을 초기화 하도록 만듭니다.
      // 제거할 css style : image-magnified
      div.onmouseout = function(){
        clearTimeout(this.timerId);
        var element = this;
        element.classList.remove("image-magnified");
      }
      ~~~

9. html 파일 안 <body> 태그 안에 2개의 버튼을 생성하고 click 이벤트를 연결합니다.

   1. 모두 선택 및 해제 기능
   2. 각 이미지가 1번씩 크게 보여지는 슬라이드 쇼 기능

   ~~~html
   	<body>
   		<input type="button" value="Select All" onclick="selectAll(this)">
   		<input type="button" value="Play Slidshow" onclick="slideShow(this)"> 
       <!-- 사용될 함수에서 해당 button 객체의 value값을 이용하기 위해 인자로 this를 넘겨줍니다. -->
   		<hr> <!-- 한줄 띄어줍니다. -->
   	</body>
   ~~~

   

10. script 파일 작성 : 모두 선택 기능 추가.

    ~~~javascript
    function selectAll(btn){
      var images = document.getElementsByClassName("image"); //div class명이 image입니다.
      for(var i=0; i<images.length ; i++){
        if(btn.value == "Unselect All"){
          images[i].classList.remove("image-selected");
        }
        else{
          images[i].classList.add("image-selected");
        }
      }
    	if(btn.value == "Unselect All"){
    		btn.value = "Selcet All";
    	}
    	else{
    		btn.value = "Unselect All";
    	}
    }
    ~~~

    

11. script 파일 작성 : 슬라이드쇼 기능 추가.

    ~~~javascript
    function slideShow(btn){
    	var images = document.getElementsByClassName("image");
    	var index = 0;
    	images[index].classList.add("image-magnified");
    
    	var intervalId = setInterval( function(){
    		images[index].classList.remove("image-magnified");
    		index++;
    		if(index < images.length){
    			images[index].classList.add("image-magnified");
    		}
    		else{
    			clearInterval(intervalId);
    			alert("슬라이드가 끝났습니다.");
    		}
    	},1000);
    ~~~

    

