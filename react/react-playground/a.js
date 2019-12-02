const listeners = document.querySelectorAll('[data-model]');

listeners.forEach(listener => {
  const name = listener.dataset.model;
  listener.addEventListener('keyup', event => {
    state[name] = listener.value;
    console.log(state);
  })
})
var a = 5;
const render = () => {};

const createState = _state => {
  return new Proxy(_state, {
    set (target, property, value) {
      target[property] = value;
      render();
      return true;  // 반드시 return true를 해야만한다.
    }
  });
}

// state는 애플리케이션 제작시 변화되는 모든 변수를 담는다.
const state = createState({
  name: 'KimJunHyeok',
  email: 'kim@naver.com',
})

console.log(state);