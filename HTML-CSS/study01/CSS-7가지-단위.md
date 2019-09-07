## CSS 7가지 단위 - rem, vh, vw, vmin, vmax, ex, ch


CSS Unit (CSS 7가지 단위)

우리가 잘 알고 있는 CSS기술을 사용하는 것은 쉽고 간단할 수 있지만 새로운 문제에 봉착하게 되면 해결하기 어려울 수 있습니다.

웹은 항상 성장,변화하고 있고 새로운 해결방안 역시 계속 성장하고 있습니다. 

그렇기 때문에 웹 디자이너와 프론트 엔드 개발자가 습득한 노하우를 활용할 수 밖에 없다는 것을 잘 알고 있습니다.

특별한 방법을 알면서, 단 한 번도 사용하지 않더라도 언젠가 필요한 때가 오면 정확한 방법을 실무에 적용할 수 있다는 뜻이기도 합니다.

이 글에서는 이전엔 알지 못했던 몇 가지의 CSS 방법에 대해 알아보고자 합니다. 

몇몇 수치 단위들은 픽셀이나 em과 비슷하지만 다른 방법에 대해 살펴보도록 합니다.

![img](https://t1.daumcdn.net/cfile/tistory/2647CD35573CFF670C)







### rem(root em)

여러분에게 조금 익숙할 수 있는 단위로 시작해 보자면 em은 현재의 font-size를 정의합니다. 

일례로, body 태그에 em값을 이용해 폰트 사이즈를 지정하면 모든 자식 요소들은 body의 폰트 사이즈에 영향을 받습니다.

HTML

```html
<body> <div class="test">Test</div> </body>
<style>
	body { 
    font-size: 14px; 
  } 
  div { 
   	font-size: 1.2em; // calculated at 14px * 1.2, or 16.8px 	
  }
</style>
```

 여기, div에 `font-size`를 `1.2em`으로 지정했습니다. 이 예제에서는 14px을 기준으로 1.2배의 폰트 사이즈로 표현이 됩니다. 

결과적으로 `16.8px`의 크기가 됩니다. 



그런데 여기 em으로 정의한 폰트 사이즈를 각각의 자식에 선언하면 어떤 일이 생길까요? 

같은 CSS를 적용한 동일한 코드를 추가해보았습니다. 

각각의 div는 각 부모의 폰트 사이즈를 상속받아 점점 커지게 됩니다.

HTML

```html
<div> 
  Test (14 * 1.2 = 16.8px) 
  <div> 
    Test (16.8 * 1.2 = 20.16px) 
    <div> 
      Test (20.16 * 1.2 = 24.192px) 
    </div> 
  </div> 
</div>
```



이것은 어떤 경우엔 바람직하겠지만 대부분의 경우, 단순하게 단일 사이즈로 표현하기도 합니다. 

이런 경우 바로 rem 단위를 사용하면 됩니다. 

`rem` 의 "r"은 바로 "root(최상위)"를 뜻합니다. 

최상위 태그(요소)에 지정한 것을 기준으로 삼으며, 보통 최상위 태그는 html태그입니다.

CSS

```css
html { 
  font-size: 14px; 
} 
div { 
  font-size: 1.2rem; 
}
```

이전 예제에서 만든 복잡한 단계의 세 div는 모두 `16.8px`의 폰트 사이즈로 표현될 것입니다.



이 rem unit은 그리드 시스템에서도 유용하게 사용가능합니다.

rem은 폰트에서만 사용하진 않습니다. 

예를 들어, [그리드 시스템](http://webdesign.tutsplus.com/tutorials/a-simple-mixin-alternative-to-standard-css-grids--webdesign-16958)이나 rem을 이용한 기본 폰트 사이즈 기반으로 만든 UI 스타일, 그리고 em을 이용해 특정 위치에 특별한 사이즈를 지정할 수도 있습니다. 

보다 정확한 폰트 사이즈나 크기 조정을 가능하게 해 줄 것입니다.

CSS

```css
.container { 
  width: 70rem; /* 70 * 14px = 980px */ 
}
```

개념적으로 보면, 이 아이디어는 여러분의 콘텐츠 사이즈를 조절 할 수 있는 인터페이스 전략과 유사합니다. 그러나 모든 경우에 반드시 이런 방법을 따를 필요는 없습니다.



[rem (root em) 단위의 호환성](http://caniuse.com/#feat=rem)은 caniuse.com에서 확인할 수 있습니다.



### vh & vw (vertical height & vertical width)

반응형 웹디자인 테크닉은 퍼센트 값에 상당히 의존하고 있습니다. 

하지만 CSS의 퍼센트 값이 모든 문제를 해결할 좋은 방법은 아닙니다. CSS의 너비 값은 가장 가까운 부모 요소에 상대적인 영향을 받습니다.



만약 타켓 요소의 너비값과 높이값을 뷰포트의 너비값과 높이값에 맞게 사용할 수 있다면 어떨까요? 

바로 `vh`와 `vw` 단위가 그런 의도에 맞는 단위이고 vh 요소는 높이값의 100분의 1의 단위입니다. 

예를 들어 브라우저 높이값이 900px일때 1vh는 9px이라는 뜻이 되지요. 그와 유사하게 뷰포트의 너비값이 750px이면 1vw는 7.5px이 됩니다. 



이 규칙에는 무궁무진한 사용방법이 있습니다. 

예를 들면, 최대 높이값이나 그의 유사한 높이값의 슬라이드를 제작할때 아주 간단한 CSS만 입력하면 됩니다.

CSS

```css
.slide {
    height: 100vh;
}
```

스크린의 너비값에 꽉 차는 헤드라인을 만든다고 가정해 봅니다. 

vw로 폰트 사이즈를 지정하면 쉽게 달성할 수 있습니다. 

해당 사이즈는 브라우저의 너비에 맞춰 변할 것입니다. (브라우저 크기를 늘였다 줄였다 해보세요)



<iframe name="cp_embed_1" src="https://codepen.io/jaehee/embed/NNZGPZ?height=345&amp;theme-id=dark&amp;slug-hash=NNZGPZ&amp;default-tab=result&amp;user=jaehee&amp;embed-version=2&amp;name=cp_embed_1" scrolling="no" frameborder="0" height="345" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" title="CodePen Embed" class="cp_embed_iframe " id="cp_embed_NNZGPZ" style="box-sizing: border-box; width: 1118.94px; overflow: hidden; display: block;"></iframe>

[뷰포트 vw, vh 단위의 호환성](http://caniuse.com/#feat=viewport-units)은 caniuse.com에서 확인할 수 있습니다.





### vmin & vmax

`vh`와 `vw`이 늘 뷰포트의 너비값과 높이값에 상대적인 영향을 받는다면 `vmin`과 `vmax`는 너비값과 높이값에 따라 최대, 최소값을 지정할 수 있습니다. 

예를 들면 브라우저의 크기가 1100px 너비, 그리고 700px 높이일때 `1vmin`은 7px이 되고 `1vmax`는 11px이 됩니다. 

너비값이 다시 800px이 되고 높이값이 1080px이 되면 vmin은 8px이 되고 vmax는 10.8px이 됩니다.



어때요, 이 값들을 사용할 수 있나요? 

언제나 스크린에 보여지는 요소를 만든다고 가정해 봅니다. 

높이값과 너비값을 `vmin`을 사용해 100으로 지정합니다. 

예를 들어 터치화면 양 변에 가득차는 정사각형 요소를 만들때는 이렇게 정의하면 됩니다.

CSS

```css
.box { 
  height: 100vmin; width: 100vmin; 
}
```

![img](https://t1.daumcdn.net/cfile/tistory/24305748573D314005)



만약 커버처럼 뷰포트 화면에 보여야 하는(모든 네 변이 스크린에 꽉 차 있는) 경우에는 같은 값을 vmax로 적용하면 됩니다.

CSS

```css
.box { 
  height: 100vmax; width: 100vmax; 
}
```

![img](https://t1.daumcdn.net/cfile/tistory/23144F4A573D316534)

알려드린 이 규칙들을 잘 조합해 활용하면 뷰포트에 맞는 매우 유연한 방식으로 사이즈 조절을 가능하게 할 수 있습니다.

[뷰포트 단위: vmin, vmax의 호환성](http://caniuse.com/#feat=viewport-units)은 caniuse.com에서 확인할 수 있습니다.

`vh` : 1/100th of the height of the viewport.

`vw` : 1/100th of the width of the viewport.

`vmin` : 1/100th of the minimum value between the height and the width of the viewport.

`vmax` : 1/100th of the maximum value between the height and the width of the viewport.



### Remind : vw, vh, vmin, vmax

뷰포트(Viewport)를 기준으로 하는 길이(length) 값으로, 문서 또는 모바일 기기 에서 볼 수 있는 부분의 크기를 기준으로 크기를 설정합니다.

각 속성의 풀네임은 다음과 같습니다.

- VW(Viewport Width) : 뷰포트 너비의 1% 길이와 동일합니다.
- VH(Viewport Height) : 뷰포트 높이의 1% 길이와 동일합니다.
- VMIN(Viewport Minimum) : 뷰포트 너비 또는 높이를 기준으로 하는 최소 값입니다.
- VMAX(Viewport Maximum) : 뷰포트 너비 또는 높이를 기준으로 하는 최대 값입니다.

vmin, vmax 값은 뷰포트의 너비, 높이 길이 중 '작은' 혹은 '큰' 길이를 기준으로 값이 동적으로 설정됩니다.

예를 들어 1000 × 500 크기의 뷰포트가 있다고 했을 때 1vmin 값은 5px 이고, 1vmax 값은 10px로 계산됩니다.

크기가 1200 × 570 으로 변경되면 1vmin은 5.7px, 1vmax는 12px이 됩니다.

즉, 화면 크기에 상대적으로 변경되는 단위가 뷰포트 단위입니다.



참고로 IE 9-11 에서 vmax는 제대로 지원하지 못합니다.

Edge 브라우저에서 온전하게 vmax를 지원합니다.

IE 5.5 이상 제대로 뷰포트 단위를 지원하게 하려면 폴리필 [vminpoly](https://github.com/saabi/vminpoly)를 사용할 수 있습니다.







### ex & ch

`ex`와 `ch` 단위는 현태 폰트와 폰트 사이즈에 의존한다는 점에서 em 그리고 rem과 비슷합니다. 

em과 rem과 다른 점은 이 두 단위가 `font-family`에 의존한다면 다른 두 단위는 폰트의 특정 수치에 기반한다는 점입니다. 



`ch` 단위, 또는 글꼴 단위는 제로 문자인 0의 너비값의 "고급 척도"로 정의됩니다. 

흥미로운 의견은 에릭 마이어의 블로그에서 확인할 수 있습니다. 그러나 기본 컨셉은 monospace 폰트의 N 의 너비값을 부여 받았다는 것이며, `width: 40ch;`는 40개의 문자열을 포함하고 있다는 뜻입니다. 

이 특정 규칙은 점자 레이아웃에 기반하고 있지만, 이 기술의 가능성은 간단한 어플리케이션 그 이상으로 확장할 수 있습니다.



ex 단위의 정의는 "현재 폰트의 `x-높이값` 또는 em의 절반 값"이라고 할 수 있습니다. `x-높이값`은 소문자 x의 높이값이기도 합니다. 

폰트의 중간 지점을 알아내기 위해 자주 사용하는 방법입니다.

![img](https://t1.daumcdn.net/cfile/tistory/267FB245573D32F62C)

x-높이값; 소문자 x의 높이값 (자세한 것은 [웹 타](http://webdesign.tutsplus.com/articles/the-anatomy-of-web-typography--webdesign-10533)[이포그래피의 해부학](http://webdesign.tutsplus.com/articles/the-anatomy-of-web-typography--webdesign-10533) 링크를 참조하세요)



이 단위는 타이포그래픽에서 세밀한 조정을 할 때 많이 사용합니다. 

예를 들어, 위첨자 태그인 `sup` 에게 position을 relative로 하고 bottom 값을 1ex라고 하면 위로 올릴 수 있습니다. 

아래첨자 역시 비슷한 방법으로 아래로 내릴 수 있습니다. 

브라우저는 위첨자와 아래첨자의 기본값을 `vertical-align`으로 정의하고 있지만, 보다 정교한 사용법을 알고 싶다면 아래와 같이 작성할 수 있습니다.

CSS

```css
sup { position: relative; bottom: 1ex; } 
sub { position: relative; bottom: -1ex; }
```

사용 가능 여부

[ex는 CSS1부터 있던 단위](https://www.w3.org/TR/REC-CSS1/#length-units)였고, ch 단위는 아직 찾을 수 없습니다. 

에릭 마이어의 블로그에 있는 [CSS 단위와 값](http://www.quirksmode.org/css/units-values/)에서 보다 많은 상세 정보를 볼 수 있습니다.