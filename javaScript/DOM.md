![DOM](https://user-images.githubusercontent.com/31315644/67669470-4e537580-f9b5-11e9-93b5-0a8af449bc72.jpeg)

------

## JavaScript 30강(M)

- 30강 :

  - 문서 객체 모델 (Document Object Model)

    - DOM (Document Object Model)

    - DOM tree

      - DOM tree의 종류
      - DOM 조작 순서

      <br/>

    - DOM Query (요소 접근)

      - [html 예제](#mainexample)

        - 하나의 요소 노드 선택

          - [document.getElementById(id)](#byid)
          - [document.querySelector(cssSelector)](#cssselector)

        - 여러개의 요소 노드 선택

          - [document.getElementsByClassName (class)](#class)
            - [HTMLCollection 회피 방법](#class2)
          - [document.getElementsByTagName(tagName)](#tagname)
          - [document.querySelectorAll(selector)](#selector)

          <br/>

    - DOM Traversing (탐색)

      - [html 예제](#mainexample)

        - [parentNode](#t1)

        - [firstChild, lastChild](#t2)

        - [firstElementChild, lastElementChild ( firstChild, lastChild 대체 )](#t3)

        - [hasChildNodes()](#t4)

        - [childNodes](#t5)

        - [children](#t6)

        - [previousSibling, nextSibling](#t7)

        - [previousElementSibling, nextElementSibling](#t8)

          <br/>

    - DOM Manipulation (조작)

      - 텍스트 노드의 접근 / 수정

    - [nodeValue](#a1)

      - 어트리뷰트 노드의 접근 / 수정

        - [className](#a2)
        - [classList](#a3)
        - [id](#a4)
        - [hasAttribute(attribute)](#a5)
        - [getAttribute(attribute)](#a6)
        - [setAttribute(attribute, value)](#a7)
        - [removeAttribute(attribute)](#a8)

      - HTML 콘텐츠 조작(Manipulation)

        - [textContent](#o1)
        - [innerText](#o2)
        - [innerHTML](#o3)

      - DOM 조작 방식

        - [createElement(tagName)](#b1)
        - [createTextNode(text)](#b2)
        - [appendChild(Node)](#b3)
        - [removeChild(Node)](#b4)

      - insertAdjacentHTML( )

        - [insertAdjacentHTML(position, string)](#b5)

          <br/>

    - [innerHTML vs. DOM 조작 방식 vs. insertAdjacentHTML()](#abcd)

    - style

      - [style 프로퍼티](#last)

      - [window.getComputedStyle( element[, pseudoElt] )](#last2)
      - [CssStyle.getPropertyValue( StyleProperty )](#last3)

<br/>

------

# 30강 

## 문서 객체 모델 (Document Object Model)

> 웹 문서를 브라우저가 이해할 수 있는 구조로 구성하여 메모리에 적재하는데 이를 DOM이라 한다.
>
> 모든 요소와 요소의 어트리뷰트, 텍스트를 각각의 객체로 만들고 이들 객체를 부자 관계를 표현할 수 있는 트리 구조로 구성한 것이 DOM이다.
>
> 이 DOM은 자바스크립트를 통해 동적으로 변경할 수 있으며 변경된 DOM은 렌더링에 반영된다.

<br/>

DOM은 HTML, ECMAScript에서 정의한 표준이 아닌 별개의 W3C의 공식 표준이며 플랫폼/프로그래밍 언어 중립적이다. 
DOM은 다음 두 가지 기능을 담당한다.

- HTML 문서에 대한 모델 구성

  브라우저는 HTML 문서를 로드한 후 해당 문서에 대한 모델을 메모리에 생성한다. 이때 모델은 객체의 트리로 구성되는데 이것을 **DOM tree**라 한다.

- HTML 문서 내의 각 요소에 접근 / 수정

  DOM은 모델 내의 각 객체에 접근하고 수정할 수 있는 프로퍼티와 메소드를 제공한다. DOM이 수정되면 브라우저를 통해 사용자가 보게 될 내용 또한 변경된다.

<br/>

### DOM tree

> DOM tree는 브라우저가 HTML 문서를 로드한 후 파싱하여 생성하는 모델을 의미한다.

~~~~javascript
<!DOCTYPE html>
<html>
  <head>
    <style>
      .red  { color: #ff0000; }
      .blue { color: #0000ff; }
    </style>
  </head>
  <body>
    <div>
      <h1>Cities</h1>
      <ul>
        <li id="one" class="red">Seoul</li>
        <li id="two" class="red">London</li>
        <li id="three" class="red">Newyork</li>
        <li id="four">Tokyo</li>
      </ul>
    </div>
  </body>
</html>
~~~~

<img src="https://poiemaweb.com/img/dom-tree.png" alt="DOM tree" style="zoom:50%;" />\



<br/>

#### DOM tree의 종류

- 문서 노드(Document Node)

  **트리의 최상위에 존재**하며 각각 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 한다. 

  즉, **DOM tree에 접근하기 위한 시작점(entry point)**이다.

- 요소 노드(Element Node)

  요소 노드는 **HTML 요소를 표현**한다. HTML 요소는 중첩에 의해 부자 관계를 가지며 이 부자 관계를 통해 정보를 구조화한다. 따라서 요소 노드는 문서의 구조를 서술한다고 말 할 수 있다. 어트리뷰트, 텍스트 노드에 접근하려면 먼저 요소 노드를 찾아 접근해야 한다. 모든 요소 노드는 요소별 특성을 표현하기 위해 HTMLElement 객체를 상속한 객체로 구성된다. 

- 어트리뷰트 노드(Attribute Node)

  어트리뷰트 노드는 **HTML 요소의 어트리뷰트를 표현**한다. 어트리뷰트 노드는 해당 어트리뷰트가 지정된 요소의 자식이 아니라 해당 요소의 일부로 표현된다. 따라서 해당 요소 노드를 찾아 접근하면 어트리뷰트를 참조, 수정할 수 있다.

- 텍스트 노드(Text Node)

  텍스트 노드는 **HTML 요소의 텍스트를 표현**한다. 텍스트 노드는 요소 노드의 자식이며 자신의 자식 노드를 가질 수 없다. 즉, 텍스트 노드는 DOM tree의 최종단이다.

<br/>

#### DOM 조작 순서

- 조작하고자하는 요소를 선택 또는 탐색한다.
- 선택된 요소의 콘텐츠 또는 어트리뷰트를 조작한다.

<br/>

### DOM Query (요소 접근)

#### html 예제 <a id="mainexample"></a>

~~~html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .red  { color: #ff0000; }
      .blue { color: #0000ff; }
    </style>
  </head>
  <body>
    <div>
      <h1>Cities</h1>
      <ul>
        <li id="one" class="red">Seoul</li>
        <li id="two" class="red">London</li>
        <li id="three" class="red">Newyork</li>
        <li id="four">Tokyo</li>
      </ul>
    </div>
  </body>
</html>
~~~

<br/>

#### 하나의 요소 노드 선택

<img src="https://poiemaweb.com/img/select-an-individual-element-node.png" alt="select an individual element node" style="zoom:50%;" />

##### document.getElementById(id) <a id="byid"></a>

- id 어트리뷰트 값으로 요소 노드를 한 개 선택한다. 복수개가 선택된 경우, 첫번째 요소만 반환한다.
- Return: HTMLElement를 상속받은 객체
- 모든 브라우저에서 동작

~~~~javascript
// id로 하나의 요소를 선택한다.
const elem = document.getElementById('one');
// 클래스 어트리뷰트의 값을 변경한다.
elem.className = 'blue';

// 그림: DOM tree의 객체 구성 참고
console.log(elem); // <li id="one" class="blue">Seoul</li>
console.log(elem.__proto__);           // HTMLLIElement
console.log(elem.__proto__.__proto__); // HTMLElement
console.log(elem.__proto__.__proto__.__proto__);           // Element
console.log(elem.__proto__.__proto__.__proto__.__proto__); // Node
~~~~

<br/>

##### document.querySelector(cssSelector) <a id="cssselector"></a>

- CSS 셀렉터를 사용하여 요소 노드를 한 개 선택한다. 
- 복수개가 선택된 경우, 첫번째 요소만 반환한다.Return: HTMLElement를 상속받은 객체IE8 이상의 브라우저에서 동작

```javascript
// CSS 셀렉터를 이용해 요소를 선택한다
const elem = document.querySelector('li.red');
// 클래스 어트리뷰트의 값을 변경한다.
elem.className = 'blue';
```

<br/>

#### 여러 개의 요소 노드 선택 (DOM Query)

<img src="https://poiemaweb.com/img/select-multiful-elements.png" alt="select multiful elements" style="zoom:50%;" />

##### document.getElementsByClassName (class) <a id="class"></a>

- class 어트리뷰트 값으로 요소 노드를 **모두 선택**한다. 공백으로 구분하여 여러 개의 class를 지정할 수 있다.
- Return: HTMLCollection (live)
- IE9 이상의 브라우저에서 동작

```javascript
// HTMLCollection을 반환한다. HTMLCollection은 live하다.
const elems = document.getElementsByClassName('red');

for (let i = 0; i < elems.length; i++) {
  // 클래스 어트리뷰트의 값을 변경한다.
  elems[i].className = 'blue';
}
```

**위 예제는 제대로 작동하지 않는다.**

**이유** :  getElementsByClassName 메소드의 반환값은 [HTMLCollection]이다. 실시간으로 Node의 상태 변경을 반영한다. **[HTMLCollection]는 실시간으로 Node의 상태 변경을 반영하기 때문에 loop가 필요한 경우 주의가 필요하다.** 

- `i`가 0일 때, `elems` 의 첫 요소의 어트리브뷰트 값(red)를 블루로 바꾼다. (li#one.red ➤ li#one.blue) 
- 문제는 실시간으로 Node의 상태가 변경되어 elems.length가 3이 아닌 2가 된다. 
- 실제로 elems[0] 번째는 배열에 배제된것인다. 
- 따라서  `i`가 1일 때, 실제로 elems[2]번째 li#three.red 를 가리키게 된 것이나 다름이 없다. 
- 이런식으로 게속가면 elems[1]번째는 건너띄었으므로 elems[1]는 li#two.red를 유지하고 있다.

<br/>

###### HTMLCollection 회피 방법 <a id="class2"></a>

1. 반복문을 역으로 돌린다.

   ~~~javascript
   const elems = document.getElementsByClassName('red');
   
   for (let i = elems.length - 1; i >= 0; i--) {
     elems[i].className = 'blue';
   }
   ~~~

   <br/>

2. while 반복문을 쓰고 `elems`요소가 남아있지 않을 때 까지 돌리기 위해 index를 0으로 고정시킨다.

   ~~~javascript
   const elems = document.getElementsByClassName('red');
   
   let i = 0;
   while (elems.length > i) { // elems에 요소가 남아 있지 않을 때까지 무한반복
     elems[i].className = 'blue';
     // i++;
   }
   ~~~

   <br/>

3. **HTMLCollection을 배열로 변경한다. ( 제일 추천! )**

   ~~~javascript
   const elems = document.getElementsByClassName('red');
   
   // 유사 배열 객체인 HTMLCollection을 배열로 변환한다.
   // 배열로 변환된 HTMLCollection은 더 이상 live하지 않다.
   console.log([...elems]); // [li#one.red, li#two.red, li#three.red]
   
   //Array.prototype.slice.apply(elems).forEach(elem => elem.className = 'blue');
   [...elems].forEach(elem => elem.className = 'blue');
   ~~~

   <br/>

4. querySelectorAll 메소드를 사용하여 HTMLCollection(live)이 아닌 [NodeList(non-live)](https://developer.mozilla.org/ko/docs/Web/API/NodeList)를 반환하게 한다.

   ~~~javascript
   // querySelectorAll는 Nodelist(non-live)를 반환한다. IE8+
   const elems = document.querySelectorAll('.red');
   
   [...elems].forEach(elem => elem.className = 'blue');
   
   ~~~

   <br/>

##### document.getElementsByTagName(tagName) <a id="tagname"></a>

- 태그명으로 요소 노드를 모두 선택한다.
- Return: HTMLCollection (live)
- 모든 브라우저에서 동작

~~~~javascript
// HTMLCollection을 반환한다.
const elems = document.getElementsByTagName('li');

[...elems].forEach(elem => elem.className = 'blue');

~~~~

<br/>

##### document.querySelectorAll(selector) <a id="selector"></a>

- 지정된 CSS 선택자를 사용하여 요소 노드를 모두 선택한다.
- Return: [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList) (non-live)
- IE8 이상의 브라우저에서 동작

~~~javascript
// Nodelist를 반환한다.
const elems = document.querySelectorAll('li.red');

[...elems].forEach(elem => elem.className = 'blue');

~~~

<br/>

#### DOM Traversing (탐색)

<img src="https://poiemaweb.com/img/traversing.png" alt="traversing" style="zoom:50%;" />

##### parentNode <a id="t1"></a>

- 부모 노드를 탐색한다.
- Return: HTMLElement를 상속받은 객체
- 모든 브라우저에서 동작

~~~javascript
const elem = document.querySelector('#two');

elem.parentNode.className = 'blue';

~~~

<br/>

##### firstChild, lastChild <a id="t2"></a>

- 자식 노드를 탐색한다.
- Return: HTMLElement를 상속받은 객체
- IE9 이상의 브라우저에서 동작

~~~~javascript
const elem = document.querySelector('ul');

// first Child
elem.firstChild.className = 'blue';
// last Child
elem.lastChild.className = 'blue';

~~~~

위 예제를 실행해 보면 예상대로 동작하지 않는다. 

이유 : IE를 제외한 대부분의 브라우저들은 요소 사이의 공백 또는 줄바꿈 문자를 텍스트 노드로 취급하기 때문이다. 이것을 회피하기 위해서는 아래와 같이 HTML의 공백을 제거하거나 [jQuery: .prev()](https://api.jquery.com/prev/)와 [jQuery: .next()](https://api.jquery.com/next/)를 사용한다.

~~~javascript
<ul><li
  id='one' class='red'>Seoul</li><li
  id='two' class='red'>London</li><li
  id='three' class='red'>Newyork</li><li
  id='four'>Tokyo</li></ul>

~~~

위와 같이 공백을 모두 제거 해주어야만 한다.

<br/>

##### firstElementChild, lastElementChild ( firstChild, lastChild 대체 ) <a id="t3"></a>

- 모든 IE9 이상에서 정상 동작한다.
- firstChild, lastChild 대체

~~~~javascript
const elem = document.querySelector('ul');

// first Child
elem.firstElementChild.className = 'blue';
// last Child
elem.lastElementChild.className = 'blue';

~~~~

<br/>

##### hasChildNodes() <a id="t4"></a>

- 자식 노드가 있는지 확인하고 Boolean 값을 반환한다.
- Return: Boolean 값
- 모든 브라우저에서 동작

##### childNodes <a id="t5"></a>

- 자식 노드의 컬렉션을 반환한다. **텍스트 요소를 포함한 모든 자식 요소를 반환한다.**
- Return: [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList) (non-live)
- 모든 브라우저에서 동작

##### children <a id="t6"></a>

- 자식 노드의 컬렉션을 반환한다. **자식 요소 중에서 Element type 요소만을 반환한다.**
- Return: [HTMLCollection](https://developer.mozilla.org/ko/docs/Web/API/HTMLCollection) (live)
- IE9 이상의 브라우저에서 동작

~~~javascript
const elem = document.querySelector('ul');

if (elem.hasChildNodes()) {
  console.log(elem.childNodes);
  // 텍스트 요소를 포함한 모든 자식 요소를 반환한다.
  // NodeList(9) [text, li#one.red, text, li#two.red, text, li#three.red, text, li#four, text]

  console.log(elem.children);
  // 자식 요소 중에서 Element type 요소만을 반환한다.
  // HTMLCollection(4) [li#one.red, li#two.red, li#three.red, li#four, one: li#one.red, two: li#two.red, three: li#three.red, four: li#four]
  [...elem.children].forEach(el => console.log(el.nodeType)); // 1 (=> Element node)
}

~~~

<br/>

##### previousSibling, nextSibling <a id="t7"></a>

- 형제 노드를 탐색한다. **text node를 포함한 모든 형제 노드를 탐색한다.**
- Return: HTMLElement를 상속받은 객체
- 모든 브라우저에서 동작

##### previousElementSibling, nextElementSibling <a id="t8"></a>

- 형제 노드를 탐색한다. **형제 노드 중에서 Element type 요소만을 탐색한다.**
- Return: HTMLElement를 상속받은 객체
- IE9 이상의 브라우저에서 동작

~~~~javascript
const elem = document.querySelector('ul');

elem.firstElementChild.nextElementSibling.className = 'blue';
elem.firstElementChild.nextElementSibling.previousElementSibling.className = 'blue';

~~~~

<br/>

### DOM Manipulation (조작)

#### 텍스트 노드의 접근 / 수정 

<img src="https://poiemaweb.com/img/nodeValue.png" alt="nodeValue" style="zoom:50%;" />

요소의 텍스트는 텍스트 노드에 저장되어 있다. 텍스트 노드의 접근은 다음과 같은 절차를 이용한다.

1. 해당 텍스트 노드의 부모 노드를 선택한다. 텍스트 노드는 요소 노드의 자식이다.
2. firstChild 프로퍼티를 사용하여 텍스트 노드를 탐색한다.
3. 텍스트 노드의 유일한 프로퍼티(`nodeValue`)를 이용하여 텍스트를 취득한다.
4. `nodeValue`를 이용하여 텍스트를 수정한다.

##### nodeValue <a id="a1"></a>

- 노드의 값을 반환한다.
- Return: 텍스트 노드의 경우는 문자열, 요소 노드의 경우 null 반환
- IE6 이상의 브라우저에서 동작한다.

[nodeName](https://developer.mozilla.org/ko/docs/Web/API/Node/nodeName), [nodeType](https://developer.mozilla.org/ko/docs/Web/API/Node/nodeType)을 통해 노드의 정보를 취득할 수 있다.
[nodeValue](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue) 프로퍼티를 사용하여 노드의 값을 취득 및 수정한다.

~~~~javascript
// 해당 텍스트 노드의 부모 요소 노드를 선택한다.
const one = document.getElementById('one');
console.dir(one); // HTMLLIElement: li#one.red

// nodeName, nodeType을 통해 노드의 정보를 취득할 수 있다.
console.log(one.nodeName); // LI
console.log(one.nodeType); // 1: Element node

// firstChild 프로퍼티를 사용하여 텍스트 노드를 탐색한다.
const textNode = one.firstChild;

// nodeName, nodeType을 통해 노드의 정보를 취득할 수 있다.
console.log(textNode.nodeName); // #text
console.log(textNode.nodeType); // 3: Text node

// nodeValue 프로퍼티를 사용하여 노드의 값을 취득한다.
console.log(textNode.nodeValue); // Seoul

// nodeValue 프로퍼티를 이용하여 텍스트를 수정한다.
textNode.nodeValue = 'Pusan';

~~~~

<br/>

#### 어트리뷰트 노드의 접근 / 수정

<img src="https://poiemaweb.com/img/nodeValue.png" alt="nodeValue" style="zoom:50%;" />

어트리뷰트 노드을 조작 프로퍼티 및 메소드

##### [className](https://developer.mozilla.org/ko/docs/Web/API/Element/className) <a id="a2"></a>

- class 어트리뷰트의 값을 취득 또는 변경한다. 
- className 프로퍼티에 값을 할당하는 경우, class 어트리뷰트가 존재하지 않으면 class 어트리뷰트를 생성하고 지정된 값을 설정한다. 
- class 어트리뷰트의 값이 여러 개일 경우, **공백으로 구분된 문자열이 반환되므로 String 메소드 `split(' ')`를 사용하여 배열로 변경하여 사용한다.**
- 모든 브라우저에서 동작한다.

##### [classList](https://developer.mozilla.org/ko/docs/Web/API/Element/classList) <a id="a3"></a>

- add, remove, item, toggle, contains, replace 메소드를 제공한다.IE10 이상의 브라우저에서 동작한다.

~~~javascript
const elems = document.querySelectorAll('li');

// className
[...elems].forEach(elem => {
  // class 어트리뷰트 값을 취득하여 확인
  if (elem.className === 'red') {
    // class 어트리뷰트 값을 변경한다.
    elem.className = 'blue';
  }
});

// classList
[...elems].forEach(elem => {
  // class 어트리뷰트 값 확인
  if (elem.classList.contains('blue')) {
    // class 어트리뷰트 값 변경한다.
    elem.classList.replace('blue', 'red');
  }
});

~~~

<br/>

##### [id](https://developer.mozilla.org/ko/docs/Web/API/Element/id) <a id="a4"></a>

- id 어트리뷰트의 값을 취득 또는 변경한다. 
- id 프로퍼티에 값을 할당하는 경우, id 어트리뷰트가 존재하지 않으면 id 어트리뷰트를 생성하고 지정된 값을 설정한다.
- 모든 브라우저에서 동작한다.

```javascript
// h1 태그 요소 중 첫번째 요소를 취득
const heading = document.querySelector('h1');

console.dir(heading); // HTMLHeadingElement: h1
console.log(heading.firstChild.nodeValue); // Cities

// id 어트리뷰트의 값을 변경.
// id 어트리뷰트가 존재하지 않으면 id 어트리뷰트를 생성하고 지정된 값을 설정
heading.id = 'heading';
console.log(heading.id); // heading

```

<br/>

##### [hasAttribute(attribute)](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute) <a id="a5"></a>

- 지정한 어트리뷰트를 가지고 있는지 검사한다.
- Return : Boolean
- IE8 이상의 브라우저에서 동작한다.

##### [getAttribute(attribute)](https://developer.mozilla.org/ko/docs/Web/API/Element/getAttribute) <a id="a6"></a>

- 어트리뷰트의 값을 취득한다.
- Return : 문자열
- 모든 브라우저에서 동작한다.

##### [setAttribute(attribute, value)](https://developer.mozilla.org/ko/docs/Web/API/Element/setAttribute) <a id="a7"></a>

- 어트리뷰트와 어트리뷰트 값을 설정한다.
- Return : undefined
- 모든 브라우저에서 동작한다.

##### [removeAttribute(attribute)](https://developer.mozilla.org/ko/docs/Web/API/Element/removeAttribute) <a id="a8"></a>

- 지정한 어트리뷰트를 제거한다.
- Return : undefined
- 모든 브라우저에서 동작한다.

```html
<!DOCTYPE html>
<html>
  <body>
  	<input type="text">
    <script>
    const input = document.querySelector('input[type=text]');
    console.log(input);

    // value 어트리뷰트가 존재하지 않으면
    if (!input.hasAttribute('value')) {
      // value 어트리뷰트를 추가하고 값으로 'hello!'를 설정
      input.setAttribute('value', 'hello!');
    }

    // value 어트리뷰트 값을 취득
    console.log(input.getAttribute('value')); // hello!

    // value 어트리뷰트를 제거
    input.removeAttribute('value');

    // value 어트리뷰트의 존재를 확인
    console.log(input.hasAttribute('value')); // false
    </script>
  </body>
</html>

```

~~~~html
<!DOCTYPE html>
<html>
  <body>
    <input class="password" type="password" value="123">
    <button class="show">show</button>
    <script>
      const $password = document.querySelector('.password');
      const $show = document.querySelector('.show');

      function makeClickHandler() {
        let isShow = false;
        return function () {
          $password.setAttribute('type', isShow ? 'password' : 'text');
          isShow = !isShow;
          $show.innerHTML = isShow ? 'hide' : 'show';
        };
      }

      $show.onclick = makeClickHandler();
    </script>
  </body>
</html>

~~~~

<br/>

#### HTML 콘텐츠 조작(Manipulation)

<img src="https://poiemaweb.com/img/innerHTML.png" alt="innerHTML" style="zoom:50%;" />

HTML 콘텐츠를 조작(Manipulation)하기 위해 아래의 프로퍼티 또는 메소드를 사용할 수 있다. 

<br/>

##### [textContent](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent) <a id="o1"></a>

- 요소의 **텍스트 콘텐츠를 취득 또는 변경**한다. 이때 마크업은 무시된다. 
- textContent를 통해 요소에 새로운 텍스트를 할당하면 텍스트를 변경할 수 있다. 
- 이때 순수한 텍스트만 지정해야 하며 마크업을 포함시키면 문자열로 인식되어 그대로 출력된다.
- IE9 이상의 브라우저에서 동작한다.

```javascript
<!DOCTYPE html>
<html>
  <head>
    <style>
      .red  { color: #ff0000; }
      .blue { color: #0000ff; }
    </style>
  </head>
  <body>
    <div>
      <h1>Cities</h1>
      <ul>
        <li id="one" class="red">Seoul</li>
        <li id="two" class="red">London</li>
        <li id="three" class="red">Newyork</li>
        <li id="four">Tokyo</li>
      </ul>
    </div>
    <script>
    const ul = document.querySelector('ul');

    // 요소의 텍스트 취득
    console.log(ul.textContent);
    /*
            Seoul
            London
            Newyork
            Tokyo
    */

    const one = document.getElementById('one');

    // 요소의 텍스트 취득
    console.log(one.textContent); // Seoul

    // 요소의 텍스트 변경
    one.textContent += ', Korea';

    console.log(one.textContent); // Seoul, Korea

    // 요소의 마크업이 포함된 콘텐츠 변경. - 마크업을 포함시키면 안된다.
    one.textContent = '<h1>Heading</h1>';

    // 마크업이 문자열로 표시된다.
    console.log(one.textContent); // <h1>Heading</h1>
    </script>
  </body>
</html>

```

<br/>

##### [innerText](https://developer.mozilla.org/ko/docs/Web/API/Node/innerText) <a id="o2"></a>

- innerText 프로퍼티를 사용하여도 요소의 텍스트 콘텐츠에만 접근할 수 있다. **하지만 아래의 이유로 사용하지 않는 것이 좋다.**
  - 비표준이다.
  - CSS에 순종적이다. 예를 들어 CSS에 의해 비표시(visibility: hidden;)로 지정되어 있다면 텍스트가 반환되지 않는다.
  - CSS를 고려해야 하므로 textContent 프로퍼티보다 느리다.

##### [innerHTML](https://developer.mozilla.org/ko/docs/Web/API/Element/innerHTML) <a id="o3"></a>

- 해당 요소의 모든 자식 요소를 포함하는 모든 콘텐츠를 하나의 문자열로 취득할 수 있다. 이 문자열은 마크업을 포함한다.

```javascript
const ul = document.querySelector('ul');

// innerHTML 프로퍼티는 모든 자식 요소를 포함하는 모든 콘텐츠를 하나의 문자열로 취득할 수 있다. 이 문자열은 마크업을 포함한다.
console.log(ul.innerHTML);
// IE를 제외한 대부분의 브라우저들은 요소 사이의 공백 또는 줄바꿈 문자를 텍스트 노드로 취급한다
/*
        <li id="one" class="red">Seoul</li>
        <li id="two" class="red">London</li>
        <li id="three" class="red">Newyork</li>
        <li id="four">Tokyo</li>
*/

```

innerHTML 프로퍼티를 사용하여 마크업이 포함된 새로운 콘텐츠를 지정하면 새로운 요소를 DOM에 추가할 수 있다.

```javascript
const one = document.getElementById('one');

// 마크업이 포함된 콘텐츠 취득
console.log(one.innerHTML); // Seoul

// 마크업이 포함된 콘텐츠 변경
one.innerHTML += '<em class="blue">, Korea</em>';

// 마크업이 포함된 콘텐츠 취득
console.log(one.innerHTML); // Seoul <em class="blue">, Korea</em>

```

마크업이 포함된 콘텐츠를 추가하는 것은 [크로스 스크립팅 공격(XSS: Cross-Site Scripting Attacks)](https://namu.wiki/w/XSS)에 취약하다.

```javascript
// 크로스 스크립팅 공격 사례

// 스크립트 태그를 추가하여 자바스크립트가 실행되도록 한다.
// HTML5에서 innerHTML로 삽입된 <script> 코드는 실행되지 않는다.
// 크롬, 파이어폭스 등의 브라우저나 최신 브라우저 환경에서는 작동하지 않을 수도 있다.
elem.innerHTML = '<script>alert("XSS!")</script>';

// 에러 이벤트를 발생시켜 스크립트가 실행되도록 한다.
// 크롬에서도 실행된다!
elem.innerHTML = '<img src="#" onerror="alert(\'XSS\')">';

```

<br/>

#### DOM 조작 방식

innerHTML 프로퍼티를 사용하지 않고 새로운 콘텐츠를 추가할 수 있는 방법은 DOM을 직접 조작하는 것이다. 
**한 개의 요소를 추가하는 경우 사용**한다.

1. 요소 노드 생성 createElement() 메소드를 사용하여 새로운 요소 노드를 생성한다. createElement() 메소드의 인자로 태그 이름을 전달한다.
2. 텍스트 노드 생성 createTextNode() 메소드를 사용하여 새로운 텍스트 노드를 생성한다. 경우에 따라 생략될 수 있지만 생략하는 경우, 콘텐츠가 비어 있는 요소가 된다.
3. 생성된 요소를 DOM에 추가 appendChild() 메소드를 사용하여 생성된 노드를 DOM tree에 추가한다. 또는 removeChild() 메소드를 사용하여 DOM tree에서 노드를 삭제할 수도 있다.

##### [createElement(tagName)](https://developer.mozilla.org/ko/docs/Web/API/Document/createElement) <a id="b1"></a>

- 태그이름을 인자로 전달하여 요소를 생성한다.
- Return: HTMLElement를 상속받은 객체
- 모든 브라우저에서 동작한다.

##### [createTextNode(text)](https://developer.mozilla.org/ko/docs/Web/API/Document/createTextNode) <a id="b2"></a>

- 텍스트를 인자로 전달하여 텍스트 노드를 생성한다.
- Return: Text 객체
- 모든 브라우저에서 동작한다.

##### [appendChild(Node)](https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild) <a id="b3"></a>

- 인자로 전달한 노드를 마지막 자식 요소로 DOM 트리에 추가한다.
- Return: 추가한 노드
- 모든 브라우저에서 동작한다.

##### [removeChild(Node)](https://developer.mozilla.org/ko/docs/Web/API/Node/removeChild) <a id="b4"></a>

- 인자로 전달한 노드를 DOM 트리에 제거한다.
- Return: 추가한 노드
- 모든 브라우저에서 동작한다.

~~~javascript
// 태그이름을 인자로 전달하여 요소를 생성
const newElem = document.createElement('li');
// const newElem = document.createElement('<li>test</li>');
// Uncaught DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('<li>test</li>') is not a valid name.

// 텍스트 노드를 생성
const newText = document.createTextNode('Beijing');

// 텍스트 노드를 newElem 자식으로 DOM 트리에 추가
newElem.appendChild(newText);

const container = document.querySelector('ul');

// newElem을 container의 자식으로 DOM 트리에 추가. 마지막 요소로 추가된다.
container.appendChild(newElem);

const removeElem = document.getElementById('one');

// container의 자식인 removeElem 요소를 DOM 트리에 제거한다.
container.removeChild(removeElem);

~~~

<br/>

### insertAdjacentHTML() <a id="b5"></a>

#### [insertAdjacentHTML(position, string)](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)

- 인자로 전달한 텍스트를 HTML로 파싱하고 그 결과로 생성된 노드를 DOM 트리의 지정된 위치에 삽입한다. 

- 첫번째 인자는 삽입 위치 

- 두번째 인자는 삽입할 요소를 표현한 문자열이다. 

- 첫번째 인자로 올 수 있는 값은 아래와 같다.

  > - ‘beforebegin’
  > - ‘afterbegin’
  > - ‘beforeend’
  > - ‘afterend’

- 모든 브라우저에서 동작한다.

![insertAdjacentHTML-position](https://poiemaweb.com/img/insertAdjacentHTML-position.png)

~~~~javascript
jconst one = document.getElementById('one');

// 마크업이 포함된 요소 추가
one.insertAdjacentHTML('beforeend', '<em class="blue">, Korea</em>');

~~~~

<br/>

### innerHTML vs. DOM 조작 방식 vs. insertAdjacentHTML() <a id="#abcd"></a>

**innerHTML**

| 장점                                                       | 단점                                                         |
| :--------------------------------------------------------- | :----------------------------------------------------------- |
| DOM 조작 방식에 비해 빠르고 간편하다.                      | XSS공격에 취약점이 있기 때문에 사용자로 부터 입력받은 콘텐츠(untrusted data: 댓글, 사용자 이름 등)를 추가할 때 주의하여야 한다. |
| 간편하게 문자열로 정의한 여러 요소를 DOM에 추가할 수 있다. | 해당 요소의 내용을 덮어 쓴다. 즉, HTML을 다시 파싱한다. 이것은 비효율적이다. |
| 콘텐츠를 취득할 수 있다.                                   |                                                              |

**DOM 조작 방식 ➤**
**`createElement(tagName)` , `createTextNode(text)`, `appendChild(Node)` `removeChild(Node)`**

| 장점                                                         | 단점                                          |
| :----------------------------------------------------------- | :-------------------------------------------- |
| 특정 노드 한 개(노드, 텍스트, 데이터 등)를 DOM에 추가할 때 적합하다. | innerHTML보다 느리고 더 많은 코드가 필요하다. |

**insertAdjacentHTML()**

| 장점                                                       | 단점                                                         |
| :--------------------------------------------------------- | :----------------------------------------------------------- |
| 간편하게 문자열로 정의된 여러 요소를 DOM에 추가할 수 있다. | XSS공격에 취약점이 있기 때문에 사용자로 부터 입력받은 콘텐츠(untrusted data: 댓글, 사용자 이름 등)를 추가할 때 주의하여야 한다. |
| 삽입되는 위치를 선정할 수 있다.                            |                                                              |

**결론**

- `innerHTML`과 `insertAdjacentHTML()`은 크로스 스크립팅 공격(XSS: Cross-Site Scripting Attacks)에 취약하다. 따라서 `untrusted data`의 경우, 주의하여야 한다. 
- 텍스트를 추가 또는 변경시에는 `textContent`, 새로운 요소의 추가 또는 삭제시에는 `DOM 조작 방식`을 사용하도록 한다.

<br/>

### style

#### style 프로퍼티 <a id="last"></a>

- inline 스타일 선언을 생성한다. 
- 특정 요소에 inline 스타일을 지정하는 경우 사용한다.
- `-`으로 구분되는 프로퍼티는 카멜케이스로 변환하여 사용한다.

```javascript
const four = document.getElementById('four');

// inline 스타일 선언을 생성
four.style.color = 'blue';

// font-size와 같이 '-'으로 구분되는 프로퍼티는 카멜케이스로 변환하여 사용한다.
four.style.fontSize = '2em';

```

<br/>

####[window.getComputedStyle(element[, pseudoElt])](https://developer.mozilla.org/ko/docs/Web/API/Window/getComputedStyle) <a id="last2"></a>

- style 프로퍼티의 값을 취득할 때 사용한다.
- 인자로 주어진 요소의 모든 CSS 프로퍼티 값을 반환한다.
- 2번쨰 인자는 옵션이며, 의사 요소를 지정하는 문자열을 입력한다. (보통의 요소들은 생략 혹은 null을 적는다.)
- 의사요소 : `::after` , `::before` , `::marker` , `::line-marker` 등등

#### [CssStyle.getPropertyValue( StyleProperty )](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue) <a id="last3"></a>

- 특정 CSS 속성 값을 반환한다.
- 인자로 스타일 객체의 프로퍼티 키를 받는다,

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>style 프로퍼티 값 취득</title>
  <style>
    .box {
      width: 100px;
      height: 50px;
      background-color: red;
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <script>
    const box = document.querySelector('.box');

    const width = getStyle(box, 'width');
    const height = getStyle(box, 'height');
    const backgroundColor = getStyle(box, 'background-color');
    const border = getStyle(box, 'border');

    console.log('width: ' + width);
    console.log('height: ' + height);
    console.log('backgroundColor: ' + backgroundColor);
    console.log('border: ' + border);

    /**
     * 요소에 적용된 CSS 프로퍼티를 반환한다.
     * @param {HTTPElement} elem - 대상 요소 노드.
     * @param {string} prop - 대상 CSS 프로퍼티.
     * @returns {string} CSS 프로퍼티의 값.
     */
    function getStyle(elem, prop) {
      return window.getComputedStyle(elem, null).getPropertyValue(prop);
    }
  </script>
</body>
</html>

```

<br/>