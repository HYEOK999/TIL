![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 12

- webfont 정리
- flex 재정리
- white-space 속성 - pre , pre-wrap, pre-line
- 프로젝트 하면서 느낀점 9월 24일

------



### webfont 정리

 웹폰트를 사용하기 위해서는 다음과 같은 코드들이 일부 필요하다.

~~~~css
@font-face {
  font-family: NanumSquareWeb;
  src: local(NanumSquareR),
       local(NanumSquare),
       url(NanumSquareR.eot?#iefix) format('embedded-opentype'),
       url(NanumSquareR.woff) format('woff'),
       url(NanumSquareR.ttf) format('truetype');
  font-style: normal;
  font-weight: normal;
  unicode-range: U+0-10FFFF;
}
 
h1 {
  font-family: NanumSquareWeb, sans-serif;
}
~~~~

1. 내가 사용할 웹폰트 패밀리명을 NanumSquareWeb으로 하겠다. 라고 선언한 예이다.

   반드시는 아니지만, font-family 명과 사용할 폰트명을 동일시하게 하는 것 이 좋다.

2. 로컬에 이미 설치 된 폰트의 경로를 적는 local() 속성과 다운로드 할 웹폰트의 주소를 적는 url() 속성이다.

   위 코드는 local(NanumSquareR) → local(NanumSquare) → url(NanumSquareR.eot) → url(NanumSquareR.woff) → url(NanumSquareR.ttf) 순으로 폰트를 찾는다.

3. format 속성을 사용하면 브라우저에서 지원 가능한 파일만 다운로드 받을 수 있습니다.
4. 사용할 유니코드의 범위를 정한다.

<br/>

<br/>

### flex 재정리 (TCP 스쿨 내용 재정리)

#### flex-direction 속성

flex-direction 속성은 플렉스 컨테이너 안에서 플렉스 요소가 배치될 방향을 설정합니다.

이 속성은 다음과 같은 속성값을 가질 수 있습니다.

 

1. row : 기본 설정으로, 플렉스 요소는 왼쪽에서 오른쪽으로, 그리고 위쪽에서 아래쪽으로 배치됩니다.

2. row-reverse : 만약에 direction 속성값이 ltr(left-to-right)이면, 플렉스 요소는 반대로 오른쪽에서 왼쪽으로 배치됩니다.

3. column : 만약에 쓰기 방식이 수평이면, 플렉스 요소는 수직 방향으로 위쪽에서 아래쪽으로 배치됩니다.

4. column-reverse : 만약에 쓰기 방식이 수평이면, 플렉스 요소는 수직 방향으로 아래쪽에서 위쪽으로 배치됩니다.

<br/>

#### justify-content 속성

justify-content 속성은 플렉스 요소의 수평 방향 정렬 방식을 설정합니다.

이 속성은 다음과 같은 속성값을 가질 수 있습니다.

 

1. flex-start : 기본 설정으로, 플렉스 요소는 플렉스 컨테이너의 앞쪽에서부터 배치됩니다.

2. flex-end : 플렉스 요소는 플렉스 컨테이너의 뒤쪽에서부터 배치됩니다.

3. center : 플렉스 요소는 플렉스 컨테이너의 가운데에서부터 배치됩니다.

4. space-between : 플렉스 요소는 요소들 사이에만 여유 공간을 두고 배치됩니다.

5. space-around : 플렉스 요소는 앞, 뒤, 그리고 요소들 사이에도 모두 여유 공간을 두고 배치됩니다.

<br/>

#### align-items 속성

align-items 속성은 플렉스 요소의 수직 방향 정렬 방식을 설정합니다.

이 속성은 한 줄만을 가지는 플렉스 박스에서는 효과가 없으며, 두 줄 이상을 가지는 플렉스 박스에서만 효과가 있습니다.

이 속성은 다음과 같은 속성값을 가질 수 있습니다.

 

1. stretch : 기본 설정으로, 플렉스 요소의 높이가 플렉스 컨테이너의 높이와 같게 변경된 뒤 연이어 배치됩니다.

2. flex-start : 플렉스 요소는 플렉스 컨테이너의 위쪽에 배치됩니다.

3. flex-end : 플렉스 요소는 플렉스 컨테이너의 아래쪽에 배치됩니다.

4. center : 플렉스 요소는 플렉스 컨테이너의 가운데에 배치됩니다.

5. baseline : 플렉스 요소는 플렉스 컨테이너의 기준선(baseline)에 배치됩니다.

<br/>

#### flex-wrap 속성

flex-wrap 속성은 플렉스 라인에 더 이상의 여유 공간이 없을 때, 플렉스 요소의 위치를 다음 줄로 넘길지를 설정합니다.

이 속성은 다음과 같은 속성값을 가질 수 있습니다.

 

1. nowrap : 기본 설정으로, 플렉스 요소가 다음 줄로 넘어가지 않습니다. 대신에 플렉스 요소의 너비를 줄여서 한 줄에 모두 배치시킵니다.

2. wrap : 플렉스 요소가 여유 공간이 없으면 다음 줄로 넘어가서 배치됩니다.

3. wrap-reverse : 플렉스 요소가 여유 공간이 없으면 다음 줄로 넘어가서 배치됩니다. 단, 아래쪽이 아닌 위쪽으로 넘어갑니다.

<br/>

#### align-content 속성

align-content 속성은 flex-wrap 속성의 동작을 변경할 수 있습니다.

이 속성은 align-items 속성과 비슷한 동작을 하지만, 플렉스 요소를 정렬하는 대신에 플렉스 라인을 정렬합니다.

이 속성은 다음과 같은 속성값을 가질 수 있습니다.

 

1. stretch : 기본 설정으로, 플렉스 라인의 높이가 남는 공간을 전부 차지하게 됩니다.

2. flex-start : 플렉스 라인은 플렉스 컨테이너의 앞쪽에 뭉치게 됩니다.

3. flex-end : 플렉스 라인은 플렉스 컨테이너의 뒤쪽에 뭉치게 됩니다.

4. center : 플렉스 라인은 플렉스 컨테이너의 가운데에 뭉치게 됩니다.

5. space-between : 플렉스 라인은 플렉스 컨테이너에 고르게 분포됩니다.

6. space-around : 플렉스 라인은 플렉스 컨테이너에 고르게 분포됩니다. 단, 양쪽 끝에 약간의 공간을 남겨둡니다.

<br/>

#### 플렉스 요소(flex item)의 flex 속성

flex 속성을 이용하면 같은 플렉스 컨테이너 안에 있는 플렉스 요소의 너비를 상대적으로 설정할 수 있습니다.

다음 예제에서 첫 번째 플렉스 요소는 전체 너비의 3/5을 차지하며, 나머지 두 요소는 각각 전체 너비의 1/5씩을 차지하게 됩니다.

~~~~css
.item:nth-child(1) { -webkit-flex: 3; flex: 3; }
.item:nth-child(2) { -webkit-flex: 1; flex: 1; }
.item:nth-child(3) { -webkit-flex: 1; flex: 1; }
~~~~

<br/>

<br/>

### white-space 속성 - pre , pre-wrap, pre-line

1. normal : 기본값. 공백을 여러개 넣어도 공백 1개만 인정. 자동줄바꿈.
2. nowrap : 공백 1개만 인정. 텍스트가 길어도 줄바꿈이 안됨.
3. pre : 공백을 마크업 그대로 표시. 코드에 줄바꿈이 없다면 줄바꿈이 안됨.
4. pre-wrap : 공백을 마크업 그대로 표시함. 코드에 줄바꿈이 없어서 코드따라 줄바꿈됨.
5. pre-line : 공백을 여러개 넣어도 1개만 표시. 코드에 불바꿈이 없어도 자동 줄바꿈이 됨.

<br/>

<br/>

### 프로젝트 하면서 느낀점 9월 24일

1. 내가 모르는 태그들이 정말로 많다.
2. layout 작업시 
   - 큰 틀에 대한 width를 전부 지정해주어야한다.
   - 작은 틀을 맞추고 싶다면 width값을 100%로 큰틀에 대해 맞춘다.
3. 최대한 그려가면서 레이아웃 작업을 진행해야 될 것 같음.
4. 조언을 아끼지 말아라. (구하는 조언도, 모르는 조언도)
5. 남들보다 1개더 안다면 1개더 배풀고 더 모른다면 알 떄까지 노력할 것.
6. 암기보다 이해가 먼저고 이해가 정 안될 경우 암기한다.