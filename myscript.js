function createCallback(text,btn){
  return function(){
    var offset = document.body.scrollTop
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text.replace("<button>Accept</button><button>Deny</button>"," ").replace("<button>Remove</button>"," ").trim();
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
    window.scrollTo(0, offset);
    btn.innerHTML = "Copied!"
  }
}

var table = document.getElementsByClassName("table")[0];

for (var i = 0, row; row = table.rows[i]; i++) {

  if(row.cells.length > 3){
    if (row.cells[3].innerHTML.indexOf("pending") != -1){

      var col = row.cells[0]
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
