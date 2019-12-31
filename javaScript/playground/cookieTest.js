// document.cookie = "usernam=;" expires=Thu, 01 JAN 1970 00:00:00 UTC; path=/;";

function setCookie(cname, cvalue, exdays) {
  // Expiration days
  let d = new Date()
  d.setTime(d.getTime() + (exdays*60*60*24*1000))
  const expires = "expires" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + "path=/" //path는 특정한 페이지에서만 쿠키를 쓰고 싶을때 사용한다.
}

setCookie("username", "react", 1); // 하루 뒤에는 이 쿠키가 자동으로 삭제된다. - 이름 , 해당값, 만료기간 설정