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