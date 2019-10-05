function solution(n, lost, reserve) {
    var answer = n - lost.length;
        
    for(var i=0; i<lost.length; i++){
            if(reserve.includes(lost[i])){
                reserve.splice(reserve.indexOf(lost[i]),1)
                answer++;
                continue;
            }
            
            else if(reserve.includes(lost[i]-1)){
                reserve.splice(reserve.indexOf(lost[i]-1),1);
                answer++;
                continue;
            }
            
            else if(reserve.includes(lost[i]+1)){
                reserve.splice(reserve.indexOf(lost[i]+1),1)
                answer++;
                continue;
            }
    }
        return answer;

    
    
//     var lost_value = 0;
//     var temp_value = 0;
//     for(var i=0;i<lost.length;i++){
//        for(var j=0;j<reserve.length;j++){
//            if(j != temp_value){
//                j = temp_value;
//            }
//            if( lost[i]-1 == reserve[j] || lost[i] == reserve[j]  || lost[i] == reserve[j] ){
//                temp_value++;
//                break;
//            }
//            else{
//                lost_value--;
//            }
//        }
//     }
    //answer = answer + lost_value;
    //return answer;
}