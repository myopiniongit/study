/*query string의 값에 따라서 node.js를 통해 만든 웹 서버가 사용자에게 동적으로 생성한 정보를 전송하는 방법

= query string에 따라 다른 정보를 보여주는 법*/

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return  `
  <!doctype html>
<html>
<head>
<title>WEB1 - ${title}</title>
<meta charset="utf-8">
</head>
<body>
<h1><a href="/">WEB</a></h1>
${list}
${control}
${body}
</body>
</html>
`;
}
function templateList(filelist){
  var list = '<ul>';
  for(i = 0; i < filelist.length; i++){
    list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`
  }
  list = list + '</ul>'
  return list
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  //parse 문을 통해서 page 로부터 user 의 reaction 을 받아옴
  var queryData = url.parse(_url, true).query
  var pathname = url.parse(_url, true).pathname
  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist)
        var template = templateHTML(title, list, 
          `<h2>${title}</h2>${description}`,
          `<a href ="/create">Create</a>`)
        response.writeHead(200);
        response.end(template);
      })
    } else {
      fs.readdir('./data', function (error, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id
          var list = templateList(filelist)
          var template = templateHTML(title, list, 
            `<h2>${title}</h2>${description}`,
            `<a href ="/create">Create</a> <a href = "/update?id=${title}">Update</a>`)
          response.writeHead(200);
          response.end(template);
        });
      });
    }

  } else if (pathname === '/create') {
    fs.readdir('./data', function (error, filelist) {
      var title = 'Web - Create';
      var list = templateList(filelist)
      var template = templateHTML(title, list, `
        <form action="http://localhost:3000/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description" cols="30" rows="10"></textarea>
        </p>
        <p><input type="submit"></p>    
        </form>
      `,'')
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    //web-browser가 post방식으로 data를 전송할 떄 data의 양이 커지게 되면 무리가 올 수 있으므로
    //reques.on data 같은 것을 이용하도록 한다.
    //조각조각의 편린의 data라도 수신할때마다 callback 함수를 실행하도록 되어있다.
    //그리고 호출 할 때 data라는 인자를 통해서 수신한 정보를 주기로 약속함
    request.on('data', function(data) {
      body = body + data;
      if (body.length > 1e6)
        request.connection.destroy();
    }) 
    //조각조각 들어오다가 더이상 data의 수신이 없으면 end
    request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        response.writeHead(302, {location:`/?id=${title}`});
        response.end('success');
      })
    })
  } else if(pathname === '/update') {
    fs.readdir('./data', function (error, filelist) {
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id
        var list = templateList(filelist)
        var template = templateHTML(title, list, 
          `
          <form action="http://localhost:3000/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value=${title}></p>
        <p>
          <textarea name="description" placeholder="description" cols="200" rows="10">${description}</textarea>
        </p>
        <p><input type="submit"></p>    
        </form>
          `,
          `<a href ="/create">Create</a> <a href="/update?id=${title}">Update</a>`
          );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function(data) {
      body = body + data;
      if (body.length > 1e6)
        request.connection.destroy();
    });
    request.on('end', function(){
     var post = qs.parse(body);
     var id = post.id;
     var title = post.title;
     var description = post.description;
     fs. rename(`data/${id}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        response.writeHead(302, {location:`/?id=${title}`});
        response.end('success');
      })
     });
    });
  } else {
    response.writeHead(404);
    response.end('not found');
  }




});
app.listen(3000);

//https://opentutorials.org/module/3549/21032

