function createCallback(text){
  return function(){
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = ("$request " + text).replace("<button>Accept</button><button>Deny</button>"," ").trim();
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(copyDiv);
}
}

var table = document.getElementsByClassName("table")[0];
for (var i = 0, row; row = table.rows[i]; i++) {

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
  btna.addEventListener('click', createCallback("accept " + col.innerHTML))
  btnd.onClick = function() {}

  console.log("Added " + col.innerHTML);
}
