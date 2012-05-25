// ================================================================
//                       CHEditor 5.0
// ----------------------------------------------------------------
// Author: Na Chang Ho
// Homepage: http://www.chcode.com
// EMail: support@chcode.com
// Copyright (c) 1997-2010 CHSOFT
// ================================================================
var oEditor = null;
var button = [	{ alt : "", img : 'submit.gif', cmd : returnSelected },              
          		{ alt : "", img : 'cancel.gif', cmd : popupClose } ];

function init(dialog) {
	oEditor = this;
	oEditor.dialog = dialog;
	
	document.getElementById('fm_link_value').value = 'http://';
	getSelected();
	
	var dlg = new Dialog(oEditor);
	dlg.showButton(button);
	dlg.setDialogHeight();
}

function popupClose() {
    oEditor.popupWinClose();
}

function UpdateProtocol()
{
  	var protocolSel 		= document.getElementById("fm_protocol");
  	var selectedItem        = protocolSel.selectedIndex;
  	var selectedItemValue   = protocolSel.options[selectedItem].value;
  	var selectedItemText    = protocolSel.options[selectedItem].text;
  	var inputtedText        = document.getElementById("fm_link_value").value;
	var datum;
  	var protocol = inputtedText.split(":");

  	if (protocol[1]) {
    	datum = protocol[1].replace(/^\/\//, "");
    	datum = datum.replace(/\\/, "");
    	datum = datum.replace(/^\//, "");
  	}
  	else {
    	if(inputtedText.indexOf(":") > 0)
      		datum = "";
    	else {
      		datum = protocol[0];
      		datum = protocol[0].replace(/^\/\/\//, "//");
    	}
  	}

  	document.getElementById("fm_link_value").value = selectedItemValue + datum;
  	document.getElementById("fm_link_value").focus();
}

function returnSelected()
{
  	var text;
  	var target = '';
  	var title = '';

  	if (document.getElementById("fm_link_value").value != "") {
    	text = document.getElementById("fm_link_value").value;
  	}
  	else {
    	alert("링크 URL을 입력하여 주십시오.");
    	return false;
  	}

  	if (document.getElementById("fm_target").value != "") {
    	target = document.getElementById("fm_target").value;
  	}

  	if (document.getElementById("fm_title").value != "") {
    	title = document.getElementById("fm_title").value;
  	}

  	oEditor.hyperLink(text, target, title);
  	popupClose();
}

function getSelected() {
  	var rng = oEditor.range;
  	var selectionType = oEditor.getSelectionType(rng);
  	var link = null;
  
  	if (selectionType == "Text" || selectionType == "None") {
    	link = rng.parentElement();
  	}
  	else if (selectionType == "Control") {
    	link = rng.item(0).parentNode;
  	}
  	else {
    	return;
  	}

    if (link.nodeName != "A") return;
    
    var protocol = link.href.split(":");
    
    if (protocol[0]) {
		var protocolSel = document.getElementById("fm_protocol");
      
      	for (var i=0; i<protocolSel.length; i++) {    
        	if (protocolSel[i].value.indexOf(protocol[0].toLowerCase()) != -1) {
          		var oldTarget = link.target;
          		var targetSel = document.getElementById("fm_target");
          
          		if (oldTarget) {
            		for (var j=0; j < targetSel.length; j++) {
              			if (targetSel[j].value == oldTarget.toLowerCase()) {
                			targetSel[j].selected = true;
                			break;
              			}
            		}
          		}
          		else {
          			targetSel[0].selected = true;
        		}           
          
          		protocolSel[i].selected = true;
          
          		if (link.title) {
            		document.getElementById("fm_title").value = link.title;
          		}
          		break;
        	}
      	}   
	}
    document.getElementById("fm_link_value").value = link.href;
}