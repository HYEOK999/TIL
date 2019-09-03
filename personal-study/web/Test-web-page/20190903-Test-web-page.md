# 20190903-Test-web-page Study



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



##image_list.json

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

