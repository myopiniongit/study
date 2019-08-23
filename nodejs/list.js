list: function (filelist) {
    var list = '<ul>';
    for (i = 0; i < filelist.length; i++) {
      list = list + `<li><a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`
    }
    list = list + '</ul>'
    return list
  }