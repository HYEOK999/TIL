![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 09

- q , blockqueto 태그 + cite 속성
- small 태그
- address 태그
- flex 속기법 + order, grow , shrink
- aside 태그
- 태그들이 공통으로 사용가능한 속성

------

### 오늘의 학습 깨달음

1. 의미없는 구분자들은 마크업 하지 않는다.
2. 만약 의미없는 img 태그들을 사용해야할 경우 alt값은 비워둔다 ( alt = "" )
3. img 태그를 사용할 것인지, 일반적인 태그를 이용하고 SEO적인 내용을 붙인 후 CSS 배경처리를 할 지 고민이 필요함.
4.   



---------------



<br/>

<br/>

###q , blockqueto 태그

 인용임을 나타내는 태그에는 q와 blockquote가 있다. 

q는 문단 안에서 인용할 때 사용하는 **인라인 요소**이고, blockquote는 새로운 문단에서 인용하는 **블록 요소** 이다.

 ~~~css
q{
	quotes: "[[" "]]"; 
} /* 사용한 태그의 앞과 뒤에 [[ 과 ]] 이 생긴다.*/

/*혹은 한쪽만 선택하고 싶을경우 다음처럼도 이용함.*/
q::after{
    content: "";
}
 ~~~

인용문 출처는 **cite 속성** 을 이용한다.

~~~~html
<q cite="https://www.codingfactory.net/">consectetur adipiscing</q>
~~~~

<br/>

<br/>





###태그들이 공통으로 사용이 가능한 속성

1. title
2. id
3. style
4. class
5. lang
6. data-*

