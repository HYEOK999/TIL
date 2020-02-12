// test('1 더하기 2 는 3 입니다.', () => {
//   // 3가지 문법 사용
//   // 1. assert : assert.equal(a,b); a와 b가 같느냐? -> Node.js내장 API
//   // 2. expect : expect(a).toBe(b); a와 b가 같느냐? -> 기본적인 jest 방식
//   // 3. should : a.should.be(b);    a와 b가 같느냐? ->
//   expect(1 + 2).toBe(3);
// });
jest.setTimeout(30000);

describe('숫자놀이', () => {
  // it('1 더하기 2 는 3 입니다.', () => {
  //   // 3가지 문법 사용
  //   // 1. assert : assert.equal(a,b); a와 b가 같느냐? -> Node.js내장 API
  //   // 2. expect : expect(a).toBe(b); a와 b가 같느냐? -> 기본적인 jest 방식
  //   // 3. should : a.should.be(b);    a와 b가 같느냐? ->
  //   expect(1 + 2).toBe(3);
  // });
  // it('{age: 38} 는 {age : 38} 이다.', () => {
  //   // 3가지 문법 사용
  //   // 1. assert : assert.equal(a,b); a와 b가 같느냐? -> Node.js내장 API
  //   // 2. expect : expect(a).toBe(b); a와 b가 같느냐? -> 기본적인 jest 방식
  //   // 3. should : a.should.be(b);    a와 b가 같느냐? ->
  //   expect({ age: 38 }).toEqual({ age: 38 }); //Object 타입은 toEqual
  // });

  // it('38은 1초 후의 38과 같다.', done => {
  //   function p() {
  //     setTimeout(() => {
  //       expect(38).toBe(38);
  //       done();
  //     }, 1000);
  //   }
  // });

  it('38은 1초 후의 38과 같다.', async () => {
    // it('38은 1초 후의 38과 같다.', () => {
    class MyError extends Error {}
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve(38);
          reject(new MyError());
        }, 1000);
      });
    }
    // return expect(p()).resolves.toBe(38);
    // return expect(p()).rejects.toBeInstanceOf(MyError);

    try {
      await p();
    } catch (error) {
      expect(error).toBeInstanceOf(MyError);
    }
  });
});
