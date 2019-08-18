var M = {
    v: 'v',
    f: function(){
        console.log(this.v)
    }
}

M.f();

module.exports = M; // 여러 객체들중에 M 만 보냄