![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 07

- article태그

- 강조 태그 ( em , strong )

- font weight 가중치 (추가 예정)

- 데이터는 숨기고 이미지를 표기하는 IR 기법. 종류 및 장단점

- agent-style 시 확인해야할 점들.

- float 대신에 inline-block 사용시 주의점.

- 밑줄 gradient 만드는 방법들. (추가 예정)

  

----



### article 태그

> article 요소는 독립적이고 재배포하며 재사용 가능한 , 홀로 설 수 있는 내용들을 위주로 담는다.
>
> article 내부에는 header태그,footer등을 삽입할 수 있다.
>
> 주로 블로그 글, 포럼 글, 뉴스 기사, RSS피드 등이 article에 해당된다.



### 강조 태그

<em> 강조하는 태그 em </em>

<strong> em보다 더 큰 강조를 하는 strong </strong>

<b> 의미없이 글자크기만 굵게 하는 b태그 </b>

<i>의미없이 기울이는 i태그</i>

<cite> 주로, 작품명(그림명, 책명, 영화명 등)을 표시하거나 인용할 때 사용 </cite>

> 시멘틱점 관점으로 strong이 em보다 강조도가 높다.
>
> 디자인적 요소로는 em은 기울임, b와 strong은 굵게 표시한다.
>
> cite태그는 작품명 ,인용시 사용한다.
>
> b태그는 단순히 의미는없고 굵게만 표시한다.
>
> i태그는 단순히 의미없고 기울이게만 표시한다.



### font-weight 가중치



### 데이터는 숨기고 이미지를 표기하는 IR 기법. 종류 및 장단점

 글자 위에 이미지로 해당 글자를 가려야 할 경우. 사용하는 기법들. 

글자를 안사용하고 바로 이미지만 넣을 수는 있으나 SEO관점에서 불리하다.

따라서 글자는 적되 이미지를 특정기법을 이용하여 덮음으로써 SEO관점과 시각적 요소 모두 챙긴다.



1.  padding을 활용한  IR 기법 

 기본적인 방법. 높이를 0으로 줘서 그림 아래로 텍스트를 내려버린다. 그 후 overflow:hidden 속성을 이용하여 텍스트를 가려버린다.

단점, 네트워크 오류시 시각이미지를 못불러온다. 또한 overflow: hidden 을 주었기 때문에 이미지도 안보이고 해당 텍스트 또한 안보이기 때문에 무슨 이미지인지 전혀 유추를 할 수 없다.

~~~~css
@charset "utf-8";
/* padding을 활용한  IR 기법 */
.brand1{
    background:yellow url(../images/title.png) no-repeat;
    height: 0;
    width: 290px;
    padding-top: 195px;
    overflow: hidden;
}



/* 위 2가지 트릭의 단점 -> 네트워크의 오류로 인해 이미지가 안날라올경우 문제가 있다. */

~~~~



2. text-indent를 이용한 IR 기법

  넓이를 지정해놓고 , 들여쓰기를 넓이만큼 준다. 개행 금지 속성을 이용하여 텍스트가 다음 줄로 못내려가게 막고 화면을 넘어가버린 텍스트는 overflow:hidden 속성을 통해 가려버린다.

단점, 네트워크 오류시 시각이미지를 못불러온다. 또한 overflow: hidden 을 주었기 때문에 이미지도 안보이고 해당 텍스트 또한 안보이기 때문에 무슨 이미지인지 전혀 유추를 할 수 없다.

~~~~css
/* text-indent 트릭을 이용한 IR 기법 */
.brand2{
    background:pink url(../images/title.png) no-repeat;
    height: 195px;
    width: 290px;
    text-indent: 290px;
    white-space: nowrap;
    overflow: hidden;
}
~~~~



3. position 트릭

   가상요소를 이용하여 텍스트는 자리 그대로 유지하고 absolute한 가상요소 이미지로 덮어씌운다.

   네트워크 에러시 이미지가 안날라와도 가려져있던 텍스트가 보이게 됨으로써 무슨 텍스트인지 유추가 가능하다.

~~~~css

/* 한줄일때만 이용 가능한 트릭. position트릭. 
네트워크 오류로 이미지가 안날라올경우 가상요소는
 안보이고 덮어쓰기 전의 내용이 보인다. */

.brand3{
    background: lime;
    height: 195px;
    line-height: 195px; 
    width: 290px;
    text-align: center;
    font-size : 16px;
    font-weight: 400;
    position : relative;
}

.brand3::after{
    content: "";
    position: absolute;
    background: orange url(../images/title.png);
    width: 100%;
    height : 100%;
    top: 0;
    left : 0;
}
~~~~



### agent-style 시 확인해야할 점들.

1. box 모델
2. 겹침 문제
3. 오타
4. 상속 이슈
5. 레이아웃 (margin, padding, position , display , float ...)



### inline-block 으로 레이아웃 작업시 문제점들

 inline-block으로 레이아웃시 다음과 같은 문제가 발생한다.

![inline-block단점](https://user-images.githubusercontent.com/31315644/64980561-0ab91680-d8f5-11e9-8b23-ea3ee108c17c.jpg)

![inline-block단점2](https://user-images.githubusercontent.com/31315644/64980563-0db40700-d8f5-11e9-8e19-e7ddf5db0664.jpeg)



주의 깊게 봐야되는 점은 묻고답하기 오른쪽에 존재하는 Border 선과의 사아아알짝 떨어진 여백이다. 

보통 li태그를 일자로 나열하는 방법으로 inline-block으로 지정하고서 구분선을 주기 위해 border를 주게되면 위와 같은 여백이 생기게 된다. 이 부분을 아래와 같이 margin값을 -로 주면서 해결을 할 수 있다.

~~~~css
    margin-left: -6px; /*극단적이게 큰 값을 줌.*/
~~~~

![해결법](https://user-images.githubusercontent.com/31315644/64980578-0f7dca80-d8f5-11e9-8cab-07a666f8ad2b.jpeg)

 웬만해서는 float형태나 다른 레이아웃을 권장한다.



### 밑줄 gradient 만드는 방법들.

