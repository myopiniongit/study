//object oriented program 객체 지향 프로그램
//programming 이란 data 와 그 data 처리하는것 두가지로 이루어져 있다.
//data를 사용하기 좋게 정리정돈 하는것이 배열 과 객체가 있었따. array , object
//어떤 처리하는 코드가 많아지면 서로 연관된 것들을 grouping 하기 위해 function을 사용함 (반복연산 중복처리)



//함수는 처리해야할 일에 대한 어떤 정보를 담고 있는 statement 이면서 동시에 value 다.

//함수를 어떤 변수로서 삽입할 수 있다면 값이고 , 아니라면 값이 될 수 없다.

//var i = if(ture){console.log(1)}; -> error javascript에서 조건문은 값이될 수 없음

//var w = while(true){console.log(1)} -> 반복문도 마찬가지

var f = function(){
    console.log(1+1)
    console.log(1+2)
}

console.log(f); // [Function: f]
f(); // 2, 3

//실행 됨의 의미는 javascript에서는 function statement가 다른 statement 와는 다르게 
//처리방법들을 갖고있는 statement 이면서 동시에 value가(값이) 될 수 있다.

// [f] 이것의 의미는 배열이라고 하는 것에 f가 담겼는데 이것은 함수다

var a = [f]
a[0](); // 2, 3

var o = {
    func:f
}
o.func();  // 2, 3


//함수를 값으로서 배열에 담는 경우는 많이 없고 객체에 많이 담는다. 
//객체는 이름이 있기 떄문이다. 함수를 이름으로 보냄