function createCallback(text, btn) {
  return function() {
    var offset = document.body.scrollTop
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text.replace("<button>Accept</button><button>Deny</button>", " ").replace("<button>Remove</button>", " ").trim();
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
    window.scrollTo(0, offset);
    btn.innerHTML = "Copied!"
  }
}

function createEmbed(col2, btn, rows) {
  return function() {
	var ytif = '<br></br><iframe id="ytplayer" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/' + col2.innerHTML.split('/')[3].substr(8) + 'frameborder="0"></iframe>'
    if (rows[2].innerHTML.indexOf('</iframe>') < 0) {
      rows[2].innerHTML += ytif
    } else {
	  rows[2].innerHTML = rows[2].innerHTML.substr(0, rows[2].innerHTML.length - ytif.length)
	}
  }
}

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

addStyleString('table {text-align: center}')

var table = document.getElementsByClassName("table")[0];

for (var i = 0, row; row = table.rows[i]; i++) {

  if (row.cells.length > 3) {
    if (row.cells[3].innerHTML.indexOf("pending") != -1) {

      var col = row.cells[0]
      col.innerHTML += '<br></br>'
      var btna = document.createElement("BUTTON")
      var ta = document.createTextNode("Accept");
      var btnd = document.createElement("BUTTON")
      var td = document.createTextNode("Deny");
      btna.appendChild(ta);
      col.appendChild(btna);
      btnd.appendChild(td);
      col.appendChild(btnd);
      var copy = col.innerHTML
      btna.addEventListener('click', createCallback("$request accept " + col.innerHTML, btna))
      btnd.addEventListener('click', createCallback("$request deny " + col.innerHTML, btnd))
      var col2 = row.cells[4]
      col2.innerHTML += '<br></br>'
      var btyt = document.createElement("BUTTON")
      var tyt = document.createTextNode("Embed");
      btyt.appendChild(tyt)
      col2.appendChild(btyt)
      btyt.addEventListener('click', createEmbed(col2, btyt, row.cells))
    } else if (row.cells[3].innerHTML.indexOf("accepted") != -1) {
      var col = row.cells[0]
      var btn = document.createElement("BUTTON")
      var t = document.createTextNode("Remove");
      btn.appendChild(t);
      col.appendChild(btn);
      var copy = col.innerHTML
      btn.addEventListener('click', createCallback("$ml remove " + col.innerHTML, btn))
    }
  } else {
    var col = row.cells[0]
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("Remove");
    btn.appendChild(t);
    col.appendChild(btn);
    var copy = col.innerHTML
    btn.addEventListener('click', createCallback("$ml remove " + col.innerHTML, btn))
  }
}