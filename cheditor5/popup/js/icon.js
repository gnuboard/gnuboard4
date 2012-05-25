// ================================================================
//                       CHEditor
// ----------------------------------------------------------------
// Author: Na Chang-Ho (chna@chcode.com)
// Homepage: http://www.chcode.com
// Copyright (c) 1997-2009 CHSOFT
// ================================================================
var oEditor = null;
var button = [ { alt : "", img : 'cancel.gif', cmd : popupClose } ];

function init(dialog) {
	oEditor = this;
	oEditor.dialog = dialog;
	
	var dlg = new Dialog(oEditor);
	
	showContents();
	dlg.showButton(button);
	dlg.setDialogHeight();
}

function insertIcon()
{
	this.removeAttribute("class");
  	oEditor.insertHtmlPopup(this.cloneNode(true));
  	popupClose();
}

function popupClose() {
    oEditor.popupWinClose();
}

function showContents() {
	var num = 40;
	var block = document.getElementById('imgBlock');
	var folder = oEditor.config.iconPath + 'em/';
	for (var i=0; i<num; i++) {
		if (i == 10 || i == 20 || i == 30) {
			var br = document.createElement('br');
			block.appendChild(br);
		}
		
		var img = new Image();
		img.src = folder + (i+1) + ".gif";
		img.style.width = '19px';
		img.style.height = '19px';
		img.style.margin = '5px';
		img.style.verticalAlign = 'middle';
		img.setAttribute('border', 0);
		img.className = 'handCursor';
		img.alt = "";
		img.onclick = insertIcon;
		block.appendChild(img);
	}
}