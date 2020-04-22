![mobx-ts](https://user-images.githubusercontent.com/31315644/79110513-9163a280-7db5-11ea-9f69-7781e1884b82.png)

---------

# React Hooks + Mobx + TS - 슈퍼마켓 구현하기 - 

## 목차

- [시작](#a2)
  - [데코레이터 설정 X](#a3)
  - [프로젝트 초기화 및 폴더 구조](#a4)
- [App & Store 수정](#a1)
  - [src/App.tsx](#a5)
  - [src/useStore.ts](#a6)
- [Store 추가](#a7)
  - [src/counter.ts](#a8)  
  - [src/counter.ts](#a9)
- [CSS 추가하기](#a10)
  - [src/components/BasketItem.css](#a11)
  - [src/components/ShopItem.css](#a12)
  - [src/components/SuperMarketTemplate.css](#a13)
- [Components 추가하기](#a14)
  - [src/components/SuperMarketTemplate.tsx](#a15)
  - [src/components/SuperMarket.tsx](#a16)
  - [src/components/ShopItemList.tsx](#a17)
  - [src/components/ShopItem.tsx](#a18)
  - [src/components/Counter.tsx](#a19)
  - [src/components/BasketItemList.tsx](#a20)   
  - [src/components/BasketItem.tsx](#a21) 
  - [src/components/TotalPrice.tsx](#a22)
- [Reference](#a42)

----------------

## 시작 <a id="a2"></a>

```bash
$ npx create-react-app mobx-market-ts --typescipt
$ npm i mobx mobx-react
```

<br/>

### 데코레이터 설정 X 🙅‍♀️ <a id="a3"></a>

 JS 기준으로 기존 mobx의 데코레이터를 이용하기 위해서는 `npm run eject`를 해주고 설정해야만 했습니다. Hooks를 이용할 때에는 굳이 데코레이터를 이용하지 않겠습니다. 만약에 별도로 이용하고 싶으시면 다음 코드를 추가합니다. **제가 사용할 예제에서는 데코레이터를 이용하지 않습니다.**

```bash
$ npm i @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

VSC 기준 : VSC 환경설정 : `CMD + ,` 누르고 `TypeScript Decorators` 검색

![VSC환경설정](https://user-images.githubusercontent.com/31315644/78847101-c89a2280-7a48-11ea-8f34-21dd11a80657.jpeg)

<br/>

### 프로젝트 초기화 및 폴더 구조      <a id="a4"></a>

시작하기에 앞서 프로젝트를 초기화하겠습니다.

`src` 폴더 내에 `App.js` 와 `index.js`를 제외한 모든 파일을 삭제합니다. 그 후 `index.js` 와 `App.js`의 파일을 다음처럼 수정합니다.

```tsx
// src/index.ts
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

```tsx
// src/App.js
import React from 'react';

function App() {
  return <div className="App"></div>;
}

export default App;
```

<br/>

**마지막으로 완성된 폴더구조와 화면은 다음과 같습니다.**

![structure](https://user-images.githubusercontent.com/31315644/79110755-12229e80-7db6-11ea-9517-a7b42adc8a8b.jpg)

![step01](https://user-images.githubusercontent.com/31315644/79084261-b6ccbe00-7d6d-11ea-9344-b2def1290aff.jpg)

<br/>

## App & Store 수정     <a id="a1"></a>

### src/App.tsx     <a id="a5"></a>

- Counter 컴포넌트
- SuperMarket 컴포넌트 추가

```tsx
import React from 'react';
import Counter from './components/Counter';
import SuperMarket from './components/SuperMarket';

function App() {
  return (
    <div className="App">
      <Counter />
      <hr />
      <SuperMarket />
    </div>
  );
}

export default App;
```

<br/>

### src/useStore.ts     <a id="a6"></a>

```ts
import { counter } from './stores/counter';
import { market } from './stores/market';

const useStore = () => {
  return { counter, market };
};

export default useStore;
```

<br/>

## Store 추가     <a id="a7"></a>

### src/counter.ts     <a id="a8"></a>

```ts
import { observable } from 'mobx';

type Counter = {
  number: number;
  increase(): void;
  decrease(): void;
};

const counter = observable<Counter>({
  number: 1,
  increase() {
    this.number++;
  },
  decrease() {
    this.number--;
  },
});

export { counter };
```

<br/>

### src/market.ts     <a id="a9"></a>

````ts
import { observable, toJS, isObservableObject } from 'mobx';
import { counter } from './counter';

type Item = {
  name: string;
  price: number;
  count: number;
};

type Market = {
  selectedItems: Item[];
  put(name: string, price: number): void;
  take(name: string): void;
  total(): number;
};

const market: Market = observable<Market>({
  selectedItems: [],
  put(name, price) {
    const exists = this.selectedItems.find((item: Item) => item.name === name);
    if (!exists) {
      this.selectedItems.push({
        name,
        price,
        count: counter.number,
      });
      return;
    }
    exists.count += counter.number;
  },
  take(name) {
    const itemToTake: Item | undefined = this.selectedItems.find(
      (item: Item) => item.name === name,
    );
    if (itemToTake) {
      itemToTake.count--;
      // console.log('관찰 가능한 객체 확인 법', isObservableObject(toJS(this.selectedItems)));
      // console.log('콘솔 찍는 법', toJS(itemToTake.name));
      if (itemToTake.count <= 0) {
        // this.selectedItems.remove(itemToTake); // 배열에서 제거처리합니다.
        this.selectedItems = this.selectedItems.filter((i) => i.name !== itemToTake.name); // 배열에서 제거처리합니다.
      }
    }
  },
  get total() {
    console.log('총합 계산...');
    return this.selectedItems.reduce((previous: number, current: Item) => {
      return previous + current.price * current.count;
    }, 0);
  },
});

export { market };
````

<br/>

## CSS 추가하기    <a id="a10"></a>

### src/components/BasketItem.css     <a id="a11"></a>

```css
.BasketItem {
  display: flex;
  width: 100%;
}

.BasketItem .name {
  flex: 2;
}

.BasketItem .price {
  flex: 1;
}

.BasketItem .count {
  flex: 1;
}

.BasketItem .return {
  margin-left: auto;
  color: #f06595;
  cursor: pointer;
}

.BasketItem .return:hover {
  text-decoration: underline;
}

.BasketItem + .BasketItem {
  margin-top: 1rem;
}
```

<br/>

### src/components/ShopItem.css     <a id="a12"></a>

```css
.ShopItem {
  background: white;
  border: 1px solid #495057;
  padding: 0.5rem;
  border-radius: 2px;
  cursor: pointer;
}

.ShopItem h4 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.ShopItem:hover {
  background: #495057;
  color: white;
}

.ShopItem + .ShopItem {
  margin-top: 1rem;
}
```

<br/>

### src/components/SuperMarketTemplate.css     <a id="a13"></a>

```css
.SuperMarketTemplate {
  width: 768px;
  display: flex;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
}

.SuperMarketTemplate h2 {
  margin-top: 0;
}

.SuperMarketTemplate > div {
  padding: 1rem;
  flex: 1;
}

.SuperMarketTemplate .items-wrapper {
  background: #f8f9fa;
}
```

<br/>

## Components 추가하기     <a id="a14"></a>

### src/components/SuperMarketTemplate.tsx     <a id="a15"></a>

```tsx
import React from 'react';
import './SuperMarketTemplate.css';

type SuperMarketTemplateProps = {
  items: JSX.Element[] | JSX.Element;
  basket: JSX.Element[] | JSX.Element;
  total: JSX.Element[] | JSX.Element;
};

const SuperMarketTemplate: React.FC<SuperMarketTemplateProps> = ({ items, basket, total }) => {
  return (
    <div className="SuperMarketTemplate">
      <div className="items-wrapper">
        <h2>상품</h2>
        {items}
      </div>
      <div className="basket-wrapper">
        <h2>장바구니</h2>
        {basket}
        {total}
      </div>
    </div>
  );
};

export default SuperMarketTemplate;
```

<br/>

### src/components/SuperMarket.tsx      <a id="a16"></a>

```tsx
import React from 'react';
import SuperMarketTemplate from './SuperMarketTemplate';
import ShopItemList from './ShopItemList';
import BasketItemList from './BasketItemList';
import TotalPrice from './TotalPrice';

// type SuperMarketProps = {};

const SuperMarket: React.FC = () => {
  return (
    <SuperMarketTemplate
      items={<ShopItemList />}
      basket={<BasketItemList />}
      total={<TotalPrice />}
    />
  );
};

export default SuperMarket;
```

<br/>

### src/components/ShopItemList.tsx      <a id="a17"></a>

```tsx
import React, { useEffect } from 'react';
import ShopItem from './ShopItem';
import { useObserver } from 'mobx-react';
import useStore from '../useStore';

type Items = {
  name: string;
  price: number;
};

// type ShopItemListProps = {};

const items: Items[] = [
  {
    name: '생수',
    price: 850,
  },
  {
    name: '신라면',
    price: 900,
  },
  {
    name: '포카칩',
    price: 1500,
  },
  {
    name: '새우깡',
    price: 1000,
  },
];

const ShopItemList: React.FC = () => {
  const { market } = useStore();

  const onPut = (name: string, price: number): void => {
    market.put(name, price);
  };

  return useObserver(() => {
    const itemList = items.map((item) => <ShopItem {...item} key={item.name} onPut={onPut} />);
    return <div>{itemList}</div>;
  });
};

export default ShopItemList;
```

<br/>

### src/components/ShopItem.tsx      <a id="a18"></a>

```tsx
import React from 'react';
import './ShopItem.css';
import { useObserver } from 'mobx-react';

export type ShopItemProps = {
  name: string;
  price: number;
  onPut(name: string, price: number): void;
};

const ShopItem: React.FC<ShopItemProps> = React.memo(({ name, price, onPut }) => {
  return useObserver(() => (
    <div className="ShopItem" onClick={() => onPut(name, price)}>
      <h4>{name}</h4>
      <div>{price}</div>
    </div>
  ));
});

export default ShopItem;
```

<br/>

### src/components/Counter.tsx      <a id="a19"></a>

````tsx
import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../useStore';

const Counter: React.FC = ({ children }) => {
  const { counter } = useStore();

  const increase = () => {
    counter.increase();
  };

  const decrease = () => {
    counter.decrease();
  };

  console.log('5151125125', children);

  return useObserver(() => (
    <div>
      {console.log('212312')}
      <h1>{counter.number}</h1>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  ));
};

export default Counter;
````

<br/>

### src/components/BasketItemList.tsx      <a id="a20"></a>

```tsx
import React from 'react';
import BasketItem from './BasketItem';
import { useObserver } from 'mobx-react';
import useStore from '../useStore';

// export type BasketItemListProps = {};

const BasketItemList: React.FC = () => {
  const { market } = useStore();

  const onTake = (name: string): void => {
    market.take(name);
  };

  return useObserver(() => {
    const itemList = market.selectedItems.map((item) => (
      <BasketItem item={item} key={item.name} onTake={onTake} />
    ));
    return <div>{itemList}</div>;
  });
};

export default BasketItemList;
```

<br/>

### src/components/BasketItem.tsx    <a id="a21"></a>

```tsx
import React from 'react';
import './BasketItem.css';
import { useObserver } from 'mobx-react';

export type BasketItemProps = {
  item: Item;
  onTake(name: string): void;
};

type Item = {
  name: string;
  price: number;
  count: number;
};

const BasketItem: React.FC<BasketItemProps> = ({ item, onTake, children }) => {
  console.log(item.name);
  console.log('44', children);

  return useObserver(() => (
    <div className="BasketItem">
      <div className="name">{item.name}</div>
      <div className="price">{item.price}원</div>
      <div className="count">{item.count}</div>
      <div className="return" onClick={() => onTake(item.name)}>
        갖다놓기
      </div>
    </div>
  ));
};

export default BasketItem;
```

<br/>

### src/components/TotalPrice.tsx      <a id="a22"></a>

```tsx
import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../useStore';

// type TotalPriceProps = {};

const TotalPrice: React.FC = () => {
  const { market } = useStore();
  console.log('total');
  return useObserver(() => (
    <div>
      <hr />
      <p>
        <b>총합: </b> {market.total}원
      </p>
    </div>
  ));
};

export default TotalPrice;
```

<br/>

------------------

## Reference  <a id="a42"></a>

- [velopert.log : MobX (2) 시작하기](https://velog.io/@velopert/MobX-2-리액트-프로젝트에서-MobX-사용하기-oejltas52z)
- [velopert.log : MobX (3) 심화적인 사용 및 최적화 방법](https://velog.io/@velopert/MobX-3-심화적인-사용-및-최적화-방법-tnjltay61n)
- [타입 스크립트 기초 연습](https://velog.io/@velopert/typescript-basics)
- [리액트 컴포넌트 타입스크립트로 작성하기](https://velog.io/@velopert/create-typescript-react-component)
- [ZeroCho : redux-vs-mobx]([https://www.inflearn.com/course/redux-mobx-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC](https://www.inflearn.com/course/redux-mobx-상태관리-도구))

<br/>