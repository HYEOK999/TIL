

![](https://miro.medium.com/max/600/1*OFsc0SD55jhi8cjo7aCA4w.jpeg)



--------------



### inline-block 특징

1. inline-block 끼리 나열할 경우 문제가 없다. 또한 inline-block은 서로간에 약간의 틈이 존재한다.

   ~~~html
   <style>
         .test1{
               display: inline-block;
               background: gold;
               width: 300px;
               height: 300px;
           }
           .test2{
               display: inline-block;
               background: silver;
               width: 300px;
               height: 300px;
           }
   </style>
   
   <div class="test1"></div>
   <div class="test2"></div>
   ~~~

   ![inline-snap1](https://user-images.githubusercontent.com/31315644/65870463-4228c800-e3b7-11e9-9274-ece5fef150da.jpeg)

   <br/>

2. inline-block 끼리 나열 중 한 요소안에 또 다른 inline-block 요소가 나오면 레이아웃이 깨져버린다.

   ~~~ html
   </style>   		
   				.test1{
               display: inline-block;
               background: gold;
               width: 300px;
               height: 300px;
           }
   
           .test2{
               display: inline-block;
               background: silver;
               width: 300px;
               height: 300px;
           }
   
           .test2-test{
               display: inline-block;
               background:lime;
               width: 20px;
               height: 100px;
           }
   </style>
   
           <div class="test1"></div>
           <div class="test2">
               <div class='test2-test'></div>
               <div class='test2-test'></div>
               <div class='test2-test'></div>
           </div>
   ~~~

   ![inline-snap2](https://user-images.githubusercontent.com/31315644/65870465-448b2200-e3b7-11e9-9f07-b37bac46e2a8.jpeg)

   

   <br/>

3. 이럴 경우 각 부모 div에게 vertical-align 속성을 주어야 해결이 가능하다.

~~~~css
.test1, .test2 {
            vertical-align: top;
        }
~~~~

![inline-snap3](https://user-images.githubusercontent.com/31315644/65870469-45bc4f00-e3b7-11e9-9044-728a0a6d057d.jpeg)

<br/>

