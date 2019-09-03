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
        if(btn.value == "Unselect All"){
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