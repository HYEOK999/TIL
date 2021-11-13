![Recoil](https://user-images.githubusercontent.com/31315644/141645884-8fbbcd90-6803-4061-bd9e-1e85a8ed89e5.png)

--------------

# Recoil 

- [Recoil 이란?](#a1)
- [React에서 왜 상태 관련 라이브러리를 쓰게 되었는가?](#b1)
- [Recoil의 주요 개념 : Atoms](#c1)
  - [Atoms 정의하기 : atom( )](#c1-1)
  - [Atoms 읽고 쓰기 : useRecoilState( )](#c1-2)
- [Recoil의 주요 개념 : Selectors](#d1)
  - [RecoilValueReadOnly Selectors 정의하기 : selector( )  - 읽기만 가능한 Selector](#d1-1)
  - [RecoilValueReadOnly Selectors 읽기 : useRecoilValue( )](#d1-2)
  - [RecoilState Selectors 정의하기 : selector( )  - 읽고 쓰기 모두 가능한 Selector](#d1-3)
  - [RecoilState Selectors 읽고/쓰기 : useRecoilValue( ) - 읽고 쓰기 모두 가능한 Selector](#d1-4)
- [Atoms , Selectors 예제](#e1)

<br/>

------

## Recoil 이란? <a id="a1"></a>

- 페이스북에서 만든 상태 관련 라이브러리
- `atom` 과 `selector` 라는 단위로 관리
-  `derived state`를 효과적으로 처리하고 상태의 `코드 분할`이 가능하게 함.

<br/>

## React에서 왜 상태 관련 라이브러리를 쓰게 되었는가? <a id="b1"></a>

- 순수 리액트만에서는 컴포넌트의 상태를 공유하기 위해서는 상위 컴포넌트까지 끌어올려서 props형태로 내려야만한다. 이에 대한 부작용은 렌더링이 크게 일어날 수 있는 부작용이 존재한다. 
- 순수 리액트에서 해당 문제를 해결하기 위하여, Context, consumer등을 도입하였으나 Context는 단일 값만 저장이 가능하고, consumer는 여러 값들의 집합(배열)등을 저장할 수 없다.
- Recoil은 직교하지만 본질적인 방향 그래프를 정의하고 React 트리에 붙인다. 상태 변화는 이 그래프의 뿌리(atoms라고 부르는)로부터 순수함수(selectors라고 부르는 것)를 거쳐 컴포넌트로 흐르며, 다음과 같은 접근 방식을 따른다.
- 공유 상태를 리액트의 자체 내부상태처럼 간단히 제공하도록 보일러 플레이트를 제공 (필요한 경우, reducers를 이용해 캡슐화 가능)
- 상태 정의는 증분 및 분산되므로 코드 분할이 가능하다.
- 컴포넌트를 수정하지 않고 파생된 데이터로 대체가 가능하다.

<br/>

## Recoil의 주요 개념 : Atoms <a id="c1"></a>

- `Atoms`는 상태의 단위
- 업데이트와 구독이 가능하다. (마치 mobx의 observable)
- `Atom`이 업데이트되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 리렌더링됨.
- `Atoms`는 런타임에서 생성이 가능함.

<br/>

### Atoms 정의하기 : atom( ) <a id="c1-1"></a>

```react
// Atoms는 atom함수를 사용해 생성한다.
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```

#### 주의

- `atom( )`에 사용되는 `key`는 전역적으로 고유해야만 한다. 
- 두개의 `atom`이 같은 키를 갖는 것은 오류이기 때문에 키값은 전역적으로 고유하도록 해야한다. 
- `React 컴포넌트`의 상태처럼 기본값도 가진다.

<br/>

### Atoms 읽고 쓰기 : useRecoilState( ) <a id="c1-2"></a>

```react
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}
```

#### 주의

- `fontSizeState`는 `Atom`이므로 전역적으로 관리되는 상태이다. 해당 `Atoms`를 사용하는 모든 구간은 한곳에서 변경되면 전부 변경된다. (즉, 상태를 공유하고 있다.)

---

<br/>

## Recoil의 주요 개념 : Selectors <a id="d1"></a>

- 하나의 `atom` 과 다른 `selector`를 인자로 받아들이고 순수 함수(pure function)를 return한다.
- 상위의 `atoms` 또는 `selectors`가 업데이트되면 하위의 `selector 함수`도 다시 실행된다. (마치 mobx의 action, computed느낌)
- 컴포넌트들은 `selectors`를 `atoms`처럼 구독할 수 있으며 `selectors`가 변경되면 컴포넌트들도 다시 렌더링된다.
- `Selectors`는 상태를 기반으로 하는 파생 데이터를 계산하는 데 사용된다. (= mobx의 computed)
- 최소한의 상태 집합만 `atoms`에 저장하고 다른 모든 파생되는 데이터는 `selectors`에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지한다.
- `selectors`와 `atoms`는 동일한 인터페이스를 가지므로 서로 대체 가능함.

```react
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})
```

- `key` - 내부적으로 atom을 식별하는데 사용되는 고유한 문자열. 이 문자열은 어플리케이션 전체에서 다른 atom과 selector에 대해 고유해야 한다. 지속성을 위하여 사용된다면 실행 전반에 걸쳐 안정적일 필요가 있다.
- `get` - 파생된 상태의 값을 평가하는 함수. 값을 직접 반환하거나 비동기적인 `Promise`나 또는 같은 유형을 나타내는 다른 atom이나 selector를 반환할 수 있다. 첫 번째 매개변수로 다음 속성을 포함하는 객체를 전달한다:
  - `get` - 다른 atom이나 selector로부터 값을 찾는데 사용되는 함수. 이 함수에 전달된 모든 atom과 selector는 암시적으로 selector에 대한 **의존성** 목록에 추가된다. Selector의 의존성이 변경되면 Selector가 다시 평가된다.
- `set?` - 이 속성이 설정되면 selector는 **쓰기 가능한** 상태를 반환한다. 첫번째 매개변수로 콜백 객체와 새로 입력 값이 전달된다. 사용자가 selector를 재설정할 경우 새로 입력 값은 `T` 타입의 값 또는 `DefaultValue` 타입의 객체일 수 있다. 콜백에는 다음이 포함된다.:
  - `get` - 다른 atom이나 selector로부터 값을 찾는데 사용되는 함수. 이 함수는 selector를 주어진 atom이나 selector를 구독하지 않는다.
  - `set` - 업스트림 Recoil 상태의 값을 설정할 때 사용되는 함수. 첫 번째 매개변수는 Recoil 상태, 두 번째 매개변수는 새로운 값이다. 새로운 값은 업데이트 함수나 재설정 액션을 전파하는 `DefalutValue` 객체일 수 있다.
- `dangerouslyAllowMutability` - Selector는 파생된 상태의 "순수 함수"를 나타내며 항상 동일한 의존성 입력 값 집합에 대하여 동일한 값을 반환해야 한다. 이를 보호하기 위해 selector에 저장된 모든 값은 기본적으로 고정되어 있다. 경우에 따라 이 옵션을 사용하여 재정의해야 할 수 있다.

<br/>

### RecoilValueReadOnly Selectors 정의하기 : selector( )  - 읽기만 가능한 Selector <a id="d1-1"></a>

```react
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```

- 위 예제에서는 `fontSizeState`라는 `atom`이 업데이트시 `fontSizeLabelState` 라는 `selctor` 가 재실행됨.

<br/>

### RecoilValueReadOnly Selectors 읽기 : useRecoilValue( ) <a id="d1-2"></a>

```react
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>

      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```

- 버튼을 클릭할 경우 `fontSize - atom`이 1증가 하고, `fontSizeLabel - selector`  의 `get` 이 실행된다. 

<br/>

### RecoilState Selectors 정의하기 : selector( )  - 읽고 쓰기 모두 가능한 Selector <a id="d1-3"></a>

```react
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```

<br/>

### RecoilState Selectors 읽고/쓰기 : useRecoilValue( ) - 읽고 쓰기 모두 가능한 Selector <a id="d1-4"></a>

```react
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>

      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```

- 하나의 atom이나 selctor를 인자로 받아 대응하는 값을 반환한다.

<br/>

----

## Atoms , Selectors 예제 <a id="e1"></a>

요구사항

- 엔화를 올리면 현재 엔화에 맞게 원화가 표시되야함.
- 원화를 올리면 현재 원화에 맞게 엔화가 표시되야함.

```react
import {atom, selector, useRecoilState, DefaultValue, useResetRecoilState } from 'recoil';

const tempWon = atom({
  key: 'tempWon',
  default: 1000,
});

const tempYen = selector<number>({
  key: 'tempYen',
  get: ({get}) => get(tempWon) / 10,
  set: ({set}, newValue) => {
      return set(
          tempWon,
          newValue instanceof DefaultValue ? newValue : (newValue),
      )
  }
});

function App() {
  const [tempW, setTempW] = useRecoilState(tempWon);
  const [tempY, setTempY] = useRecoilState(tempYen);
  const resetTemp = useResetRecoilState(tempYen);

  const addYen = () => setTempY(tempW + 100);
  const addWon = () => setTempW(tempW + 1000);
  const reset = () => resetTemp();

  return (
      <div>
        현재 엔화: {tempY} ¥
        <br />
        현재 원화: {tempW} ₩
        <br />
        <button onClick={addYen}>100엔 추가하기</button>
        <br />
        <button onClick={addWon}>1000원 추가하기</button>
        <br />
        <button onClick={reset}>Reset</button>
      </div>
  );
}

export default App;
```

