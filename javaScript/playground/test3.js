obj = {
  "1" : ["front","iOS"],
  "2" : "Android"
};
for(let i =0; i < Object.keys(obj).length; i++){
   keysArr = Object.keys(obj)[i]
   for(let j =0; j< obj[keysArr ].length; j++){
       console.log(obj[keysArr ][j]);
   }
}

