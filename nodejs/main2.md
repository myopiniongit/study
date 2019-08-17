nodejs file list in directory
nodejs 에서 디렉토리 내 파일 리스트를 불러와 각각의 링크를 만들기보다는
리스팅해서 객체를 설정

https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j

fs.readdir

const testFolder = './tests/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});





fs.readdirSync

const testFolder = './tests/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
});

The difference between the two methods, is that the first one is asynchronous, so you have to provide a callback function that will be executed when the read process ends.

The second is synchronous, it will return the file name array, but it will stop any further execution of your code until the read process ends.


왜 main.js 에서 list = list + </ul> 일까?

parameter = 함수 정의에 들어가는 애들 = 매개변수
argument = 함수 호출시 들어가는 애들 = 인자
return = 값 반환 + 즉시함수종료

https://opentutorials.org/course/3332/21127 = main.js 가볍게 하기 위한 노력들

synchronous 동기 와 asynchronous 비동기


google it
nodejs post data
https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js

https://blog.fullstacktraining.com/how-do-you-extract-post-data-in-node-js/

You can use the querystring module:

var qs = require('querystring');

function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
        });
    }
}
Now, for example, if you have an input field with name age, you could access it using the variable post:

console.log(post.age);

request = 요청할 떄 웹브라우저가 보내는 정보
reponse = 응답할 때 우리가 웹브라우저로 보내는 정보




fs.writeFile(file, data[, options], callback)[src]#
History
file <string> | <Buffer> | <URL> | <integer> filename or file descriptor
data <string> | <Buffer> | <TypedArray> | <DataView>
options <Object> | <string>

encoding <string> | <null> Default: 'utf8'
mode <integer> Default: 0o666
flag <string> See support of file system flags. Default: 'w'.
callback <Function>

err <Error>
When file is a filename, asynchronously writes data to the file, replacing the file if it already exists. data can be a string or a buffer.

When file is a file descriptor, the behavior is similar to calling fs.write() directly (which is recommended). See the notes below on using a file descriptor.

The encoding option is ignored if data is a buffer.

const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
If options is a string, then it specifies the encoding:

fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
It is unsafe to use fs.writeFile() multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream() is recommended.


write file 후에 redirection 이 필요

google : nodejs redirection
code 301 은 이 경로가 영원히 ~로 변했습니다 고
code 302 는 redirection 해라~


nodejs file rename

fs.rename(oldfath, newpath, callback)

or

fs.renameSync(oldpath, newpath)