/* var o = {
    v1: 'v1',
    v2: 'v2',
}

function f1(){
    console.log(o.v1);
}

function f2(){
    console.log(o.v2);
}
 */


//위와같았던 모습에서는 f1 함수를 새로 정의 하면 시스템이 망가짐.
//따라서 f1, f2를 객체 안에 넣어버리면 이런 문제가 해결됨

var o = {
    v1: 'v1',
    v2: 'v2',
    f1: function () {
        console.log(this.v1)
    },
    f2: function () {
        console.log(this.v2)
    }
}

//함수가 속해 있는 이 변수가 함수가 o.v1 이라고 알고있지 않아도 this를 사용하면 (만약 o가 이름이 바뀐다면)
//함수가 객체 안에서 사용될 때, 그 함수가 자신히 속해있는 객체를 참조할 수 있는 특별한 약속. this

o.f1()
o.f2()
