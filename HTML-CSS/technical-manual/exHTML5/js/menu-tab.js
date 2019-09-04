var item = $('.menu-item');
var tab = $('.tab');
var section = $('.notice, .pds');
var list = $('.board li');

// 메인 메뉴 제어를 위한 함수
item.on('mouseover focusin', function(){
  item.removeClass('menu-act')
  $(this).addClass('menu-act');
});
// 탭 요소에 키보드 포커그를 받을 수 있도록 tabindex 속성 추가하기
tab.attr('tabindex', '0');
// 탭 목록에 아이콘을 일괄 추가하기
list.find('a').attr('class', 'icon-dot-circled');

// 탭 클릭 시 tab-act 클래스를 부모 요소에 추가하기
tab.on('click keyup', function(e){
  e.preventDefault();
  if(e.keyCode === 13 || e.type === 'click'){
    section.removeClass('tab-act');
    $(this).parent().addClass('tab-act');
  }
});
