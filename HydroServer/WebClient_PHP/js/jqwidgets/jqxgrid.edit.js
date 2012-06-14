/*
jQWidgets v2.1.0 (2012-May-04)
Copyright (c) 2011-2012 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.extend(a.jqx._jqxGrid.prototype,{setcolumneditable:function(b,c){this._setcolumnproperty(b,"editable",text)},getcolumneditable:function(b){return this._getcolumnproperty(b,"editable")},_handledblclick:function(t,n){if(t.target==null){return}if(n.disabled){return}if(a(t.target).ischildof(this.columnsheader)){return}var v;if(t.which){v=(t.which==3)}else{if(t.button){v=(t.button==2)}}if(v){return}var z;if(t.which){z=(t.which==2)}else{if(t.button){z=(t.button==1)}}if(z){return}var u=this.showheader?this.columnsheader.height()+2:0;var o=this._groupsheader()?this.groupsheader.height():0;var e=this.host.offset();var l=t.pageX-e.left;var k=t.pageY-u-e.top-o;var b=this._hittestrow(l,k);var g=b.row;var h=b.index;var q=t.target.className;var p=this.table[0].rows[h];if(p==null){return}n.mousecaptured=true;n.mousecaptureposition={left:t.pageX,top:t.pageY-o};var r=this.hScrollInstance;var s=r.value;var d=0;var j=this.groupable?this.groups.length:0;for(i=0;i<p.cells.length;i++){var f=parseInt(a(this.columnsrow[0].cells[i]).css("left"))-s;var w=f+a(this.columnsrow[0].cells[i]).width();if(w>=l&&l>=f){d=i;break}}if(g!=null){var c=this._getcolumnat(d);if(!(q.indexOf("jqx-grid-group-expand")!=-1||q.indexOf("jqx-grid-group-collapse")!=-1)){if(g.boundindex!=-1){n.begincelledit(g.boundindex,c.datafield,c.defaulteditorvalue)}}}},_handleeditkeydown:function(c,p){var n=c.charCode?c.charCode:c.keyCode?c.keyCode:0;if(this.editcell){if(n==32){if(p.editcell.columntype=="checkbox"){var k=!p.getcellvalue(p.editcell.row,p.editcell.column);p.setcellvalue(p.editcell.row,p.editcell.column,k,true);p._raiseEvent(18,{rowindex:p.editcell.row,datafield:p.editcell.column,oldvalue:!k,value:k,columntype:"checkbox"});return false}}if(n==9){var o=this.editcell.row;var d=this.editcell.column;var g=d;var j=p._getcolumnindex(d);var h=false;var b=p.getrowvisibleindex(o);if(this.editcell.validated!=false){if(c.shiftKey){var e=p.getcolumnat(j-1);if(e){d=e.datafield;h=true;if(p.selectionmode.indexOf("cell")!=-1){p.selectprevcell(o,g);setTimeout(function(){p.ensurecellvisible(b,d)},10)}}}else{var e=p.getcolumnat(j+1);if(e){d=e.datafield;h=true;if(p.selectionmode.indexOf("cell")!=-1){p.selectnextcell(o,g);setTimeout(function(){p.ensurecellvisible(b,d)},10)}}}if(h){p.begincelledit(o,d);if(this.editcell!=null&&this.editcell.columntype=="checkbox"){this._renderrows(this.virtualsizeinfo)}}}return false}else{if(n==13){this.endcelledit(this.editcell.row,this.editcell.column,false,true);return false}else{if(n==27){this.endcelledit(this.editcell.row,this.editcell.column,true,true);return false}}}}else{var f=false;if(n==113){f=true}if(n>=48&&n<=57){this.editchar=String.fromCharCode(n);f=true}if(n>=65&&n<=97){this.editchar=String.fromCharCode(n);if(!c.shiftKey){this.editchar=this.editchar.toLowerCase()}f=true}if(n==13||f){if(p.getselectedrowindex){var o=p.getselectedrowindex();switch(p.selectionmode){case"singlerow":case"multiplerows":case"multiplerowsextended":if(o>=0){var d="";for(m=0;m<p.columns.records.length;m++){var e=p.getcolumnat(m);if(e.editable){d=e.datafield;break}}p.begincelledit(o,d)}break;case"singlecell":case"multiplecells":case"multiplecellsextended":var l=p.getselectedcell();if(l!=null){p.begincelledit(l.rowindex,l.datafield)}break}return false}}if(n==32){var l=p.getselectedcell();if(l!=null){var e=p.getcolumn(l.datafield);if(e.columntype=="checkbox"){var k=!p.getcellvalue(l.rowindex,l.datafield);p._raiseEvent(17,{rowindex:l.rowindex,datafield:l.datafield,value:!k,columntype:"checkbox"});p.setcellvalue(l.rowindex,l.datafield,k,true);p._raiseEvent(18,{rowindex:l.rowindex,datafield:l.datafield,oldvalue:!k,value:k,columntype:"checkbox"});return false}}}}return true},begincelledit:function(h,c,e){var d=this.getcolumn(c);if(d.columntype=="number"||d.columntype=="button"){return}if(this.editcell){if(this.editcell.row==h&&this.editcell.column==c){return true}var g=this.endcelledit(this.editcell.row,this.editcell.column,false,true);if(false==g){return}}var f=d.columntype=="checkbox"||d.columntype=="button";this.host.removeClass("jqx-disableselect");this.content.removeClass("jqx-disableselect");if(d.editable){var b=this.getrowvisibleindex(h);this.editcell=this.getcell(h,c);this.editcell.visiblerowindex=b;if(!this.editcell.editing){if(!f){this.editcell.editing=true}this.editcell.columntype=d.columntype;this.editcell.defaultvalue=e;if(d.defaultvalue!=undefined){this.editcell.defaultvalue=d.defaultvalue}this.editcell.init=true;if(d.columntype!="checkbox"){this._raiseEvent(17,{rowindex:h,datafield:d.datafield,value:this.editcell.value,columntype:d.columntype})}if(!f){this._renderrows(this.virtualsizeinfo)}this.editcell.init=false}}else{if(!this.editcell){return}this.editcell.editor=null;this.editcell.editing=false;this._renderrows(this.virtualsizeinfo);this.editcell=null}},endcelledit:function(o,b,j,f){var d=this.getcolumn(b);var h=this;var g=function(){if(!h.isNestedGrid){h.element.focus();h.content.focus();setTimeout(function(){h.element.focus();h.content.focus()},10)}};if(d.columntype=="checkbox"||d.columntype=="button"){this.editcell.editor=null;this.editcell.editing=false;this.editcell=null;return true}var c=this._geteditorvalue(d);if(j){this._hidecelleditor();this.editcell.editor=null;this.editcell.editing=false;this.editcell=null;if(f||f==undefined){this._renderrows(this.virtualsizeinfo)}g();this.host.addClass("jqx-disableselect");this.content.addClass("jqx-disableselect");return false}if(this.validationpopup){this.validationpopup.hide();this.validationpopuparrow.hide()}if(d.validation){var k=this.getcell(o,b);var n=d.validation(k,c);var e=this.gridlocalization.validationstring;if(n.message!=undefined){e=n.message}var l=typeof n=="boolean"?n:n.result;if(!l){if(n.showmessage==undefined||n.showmessage==true){this._showvalidationpopup(o,b,e)}this.editcell.validated=false;return false}}this._raiseEvent(18,{rowindex:o,datafield:b,oldvalue:this.editcell.value,value:c,columntype:d.columntype});this._hidecelleditor();this.editcell.editor=null;this.editcell.editing=false;this.editcell=null;this.setcellvalue(o,b,c,f);this.host.addClass("jqx-disableselect");this.content.addClass("jqx-disableselect");g();return true},beginrowedit:function(d){if(!this.editcells){this.editcells=new Array()}if(this.editcells.length>0){if(this.editcells[0].row==d){return}var c=this.endrowedit(this.editcells[0].row,false,true);if(false==c){return}}this.host.removeClass("jqx-disableselect");this.content.removeClass("jqx-disableselect");var b=this;this.editcells=new Array();a.each(this.columns.records,function(){if(b.editable){var e=b.getcell(d,this.datafield);e.editing=true;if(this.defaultvalue!=undefined){e.defaultvalue=column.defaultvalue}e.init=true;b.editcells[this.datafield]=e}});b.editrow=d;b._renderrows(this.virtualsizeinfo);a.each(this.columns.records,function(){b.editcells[this.datafield].init=false})},endrowedit:function(b){if(this.editcell.editor==undefined){return false}return true},_setSelection:function(e,b,d){if("selectionStart" in d[0]){d[0].focus();d[0].setSelectionRange(e,b)}else{var c=d[0].createTextRange();c.collapse(true);c.moveEnd("character",b);c.moveStart("character",e);c.select()}},findRecordIndex:function(g,c,b){var b=b;if(g&&c){var e=b.length;for(urec=0;urec<e;urec++){var f=b[urec];var d=f.label;if(g==d){return urec}}}return -1},_destroyeditors:function(){var b=this;a.each(this.columns.records,function(e,f){switch(this.columntype){case"dropdownlist":var c=b.editors["dropdownlist_"+this.datafield];if(c){c.jqxDropDownList("destroy");b.editors["dropdownlist_"+this.datafield]=null}break;case"datetimeinput":var d=b.editors["datetimeinput_"+this.datafield];if(d){d.jqxDateTimeInput("destroy");b.editors["datetimeinput_"+this.datafield]=null}break;case"numberinput":var g=b.editors["numberinput_"+this.datafield];if(g){g.jqxNumberInput("destroy");b.editors["numberinput_"+this.datafield]=null}break}})},_showcelleditor:function(l,d,b,z){if(this.editrow){this.editcell=this.editcells[d.datafield]}if(b==undefined){return}if(this.editcell==null){return}if(d.columntype=="checkbox"&&d.editable){return}var q=d.datafield;var t=a(b);var D=this;var g=this.editcell.editor;var r=this.getcellvalue(l,q);var w=this.hScrollInstance;var y=w.value;var h=parseInt(y);this.editcell.element=b;if(this.editcell.validated==false){this._showvalidationpopup()}var B=function(E){if(!D.isNestedGrid){E.focus()}if(D.gridcontent[0].scrollTop!=0){D.scrolltop(Math.abs(D.gridcontent[0].scrollTop));D.gridcontent[0].scrollTop=0}if(D.gridcontent[0].scrollLeft!=0){D.scrollleft(Math.abs(D.gridcontent[0].scrollLeft));D.gridcontent[0].scrollLeft=0}};switch(d.columntype){case"dropdownlist":if(this.host.jqxDropDownList){b.innerHTML="";var p=this.editors["dropdownlist_"+d.datafield];g=p==undefined?a("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;' id='dropdownlisteditor'></div>"):p;g.css("top",a(b).parent().position().top);g.css("left",-h+parseInt(a(b).position().left));if(p==undefined){g.prependTo(this.table);g[0].id="dropdownlisteditor"+this.element.id+d.datafield;var v=this.source._source?true:false;var o=null;if(!v){o=new a.jqx.dataAdapter(this.source,{autoBind:false,uniqueDataFields:[d.datafield],async:false})}else{var A={localdata:this.source.records,datatype:this.source.datatype,async:false};o=new a.jqx.dataAdapter(A,{autoBind:false,async:false,uniqueDataFields:[d.datafield]})}var k=true;g.jqxDropDownList({keyboardSelection:false,source:o,autoDropDownHeight:k,theme:this.theme,width:t.width()-2,height:t.height()-2,displayMember:q,valueMember:q});this.editors["dropdownlist_"+d.datafield]=g;if(d.createeditor){d.createeditor(l,r,g)}}if(d._requirewidthupdate){g.jqxDropDownList({width:t.width()-2})}var n=g.jqxDropDownList("getItems");if(n.length<8){g.jqxDropDownList("autoDropDownHeight",true)}else{g.jqxDropDownList("autoDropDownHeight",false)}var e=this.findRecordIndex(r,d.datafield,n);if(z){if(r!=""){g.jqxDropDownList("selectIndex",e,true)}else{g.jqxDropDownList("selectIndex",-1)}}if(this.editcell.defaultvalue!=undefined){g.jqxDropDownList("selectIndex",this.editcell.defaultvalue,true)}setTimeout(function(){B(g.jqxDropDownList("comboStructure"))},10)}break;case"datetimeinput":if(this.host.jqxDateTimeInput){b.innerHTML="";var f=this.editors["datetimeinput_"+d.datafield];g=f==undefined?a("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;' id='datetimeeditor'></div>"):f;g.show();g.css("top",a(b).parent().position().top);g.css("left",-h+parseInt(a(b).position().left));if(f==undefined){g.prependTo(this.table);g[0].id="datetimeeditor"+this.element.id+d.datafield;g.jqxDateTimeInput({theme:this.theme,width:t.width(),height:t.height(),formatString:d.cellsformat});this.editors["datetimeinput_"+d.datafield]=g;if(d.createeditor){d.createeditor(l,r,g)}}if(d._requirewidthupdate){g.jqxDateTimeInput({width:t.width()-2})}if(z){if(r!=""){var C=new Date(r);g.jqxDateTimeInput("setDate",C)}else{g.jqxDateTimeInput("setDate",new Date())}if(this.editcell.defaultvalue!=undefined){g.jqxDateTimeInput("setDate",this.editcell.defaultvalue)}}setTimeout(function(){B(g.jqxDateTimeInput("dateTimeInput"))},10)}break;case"numberinput":if(this.host.jqxNumberInput){b.innerHTML="";var j=this.editors["numberinput_"+d.datafield];g=j==undefined?a("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;' id='numbereditor'></div>"):j;g.show();g.css("top",a(b).parent().position().top);g.css("left",-h+parseInt(a(b).position().left));if(j==undefined){g.prependTo(this.table);g[0].id="numbereditor"+this.element.id+d.datafield;var x="";var u="left";if(d.cellsformat){if(d.cellsformat.indexOf("c")!=-1){x=this.gridlocalization.currencysymbol}else{if(d.cellsformat.indexOf("p")!=-1){x=this.gridlocalization.percentsymbol;u="right"}}}g.jqxNumberInput({inputMode:"simple",theme:this.theme,width:t.width()-1,height:t.height()-1,spinButtons:true,symbol:x,symbolPosition:u});this.editors["numberinput_"+d.datafield]=g;if(d.createeditor){d.createeditor(l,r,g)}}if(d._requirewidthupdate){g.jqxNumberInput({width:t.width()-2})}if(z){if(r!=""){var c=r;g.jqxNumberInput("setDecimal",c)}else{g.jqxNumberInput("setDecimal",0)}if(this.editcell.defaultvalue!=undefined){g.jqxNumberInput("setDecimal",this.editcell.defaultvalue)}if(this.editchar&&this.editchar.length>0){var s=parseInt(this.editchar);if(!isNaN(s)){g.jqxNumberInput("setDecimal",s)}}setTimeout(function(){B(g.jqxNumberInput("numberInput"));g.jqxNumberInput("_setSelectionStart",0);if(D.editchar){if(d.cellsformat.length>0){g.jqxNumberInput("_setSelectionStart",2)}else{g.jqxNumberInput("_setSelectionStart",1)}D.editchar=null}else{var E=g.jqxNumberInput("spinButtons");if(E){var F=g.jqxNumberInput("numberInput").val();D._setSelection(g.jqxNumberInput("numberInput")[0],F.length,F.length)}else{var F=g.jqxNumberInput("numberInput").val();D._setSelection(g.jqxNumberInput("numberInput")[0],0,F.length)}}},10)}}break;case"textbox":default:b.innerHTML="";g=this.editors["textboxeditor_"+d.datafield]||a("<input 'type='textbox' id='textboxeditor'/>");g[0].id="textboxeditor"+this.element.id+d.datafield;g.appendTo(t);if(z){g.addClass(this.toThemeProperty("jqx-input"));g.addClass(this.toThemeProperty("jqx-widget-content"));if(this.editchar&&this.editchar.length>0){g.val(this.editchar)}else{g.val(r)}if(this.editcell.defaultvalue!=undefined){g.val(this.editcell.defaultvalue)}g.width(t.width());g.height(t.height());if(d.createeditor){d.createeditor(l,r,g)}}this.editors["textboxeditor_"+d.datafield]=g;if(z){setTimeout(function(){B(g);if(D.editchar){D._setSelection(g[0],1,1);D.editchar=null}else{D._setSelection(g[0],0,g.val().length)}},10)}break}if(z){if(d.initeditor){d.initeditor(l,r,g)}}if(g){g.css("display","block");this.editcell.editor=g}},_setSelection:function(d,g,b){try{if("selectionStart" in d){d.setSelectionRange(g,b)}else{var c=d.createTextRange();c.collapse(true);c.moveEnd("character",b);c.moveStart("character",g);c.select()}}catch(e){var f=e}},_hidecelleditor:function(){if(this.editrow){return}if(!this.editcell){return}if(this.editcell.columntype=="checkbox"){return}if(this.editcell.editor){this.editcell.editor.hide();switch(this.editcell.columntype){case"dropdownlist":this.editcell.editor.jqxDropDownList({hideDelay:0});this.editcell.editor.jqxDropDownList("hideListBox");this.editcell.editor.jqxDropDownList({hideDelay:400});break;case"datetimeinput":var b=this.editcell.editor;if(b.jqxDateTimeInput("isOpened")){b.jqxDateTimeInput({hideDelay:0});b.jqxDateTimeInput("hideCalendar");b.jqxDateTimeInput({hideDelay:400})}break}}if(this.validationpopup){this.validationpopup.hide();this.validationpopuparrow.hide()}if(!this.isNestedGrid){this.element.focus()}},_geteditorvalue:function(d){var f=new String();if(this.editcell.editor){switch(d.columntype){case"textbox":default:f=new String(this.editcell.editor.val());break;case"datetimeinput":if(this.editcell.editor.jqxDateTimeInput){this.editcell.editor.jqxDateTimeInput({isEditing:false});f=this.editcell.editor.jqxDateTimeInput("getDate").toString();f=new Date(f);if(f==null){f==""}}break;case"dropdownlist":if(this.editcell.editor.jqxDropDownList){var b=this.editcell.editor.jqxDropDownList("selectedIndex");var e=this.editcell.editor.jqxDropDownList("getItem",b);if(e){f=new String(e.label)}else{f=""}if(f==null){f=""}}break;case"numberinput":if(this.editcell.editor.jqxNumberInput){var c=this.editcell.editor.jqxNumberInput("getDecimal");f=new Number(c);f=parseFloat(f);if(isNaN(f)){f=0}}break}}return f},_showvalidationpopup:function(o,d,p){var j=this.editcell.editor;if(!j){return}if(!this.validationpopup){var n=a("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;'></div>");var l=a("<div style='width: 20px; height: 20px; z-index: 999999; top: 0px; left: 0px; position: absolute;'></div>");n.html(p);l.addClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));n.addClass(this.toThemeProperty("jqx-grid-validation"));n.addClass(this.toThemeProperty("jqx-rc-all"));n.prependTo(this.table);l.prependTo(this.table);this.validationpopup=n;this.validationpopuparrow=l}else{this.validationpopup.html(p)}var f=this.hScrollInstance;var h=f.value;var e=parseInt(h);this.validationpopup.css("top",parseInt(a(this.editcell.element).parent().position().top)+30+"px");var b=parseInt(this.validationpopup.css("top"));this.validationpopuparrow.css("top",b-12);this.validationpopuparrow.removeClass();this.validationpopuparrow.addClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));if(b>this._gettableheight()){this.validationpopuparrow.removeClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));this.validationpopuparrow.addClass(this.toThemeProperty("jqx-grid-validation-arrow-down"));b=parseInt(a(this.editcell.element).parent().position().top)-30;this.validationpopup.css("top",b+"px");this.validationpopuparrow.css("top",b+this.validationpopup.outerHeight()-9)}var k=-e+parseInt(a(this.editcell.element).position().left);this.validationpopuparrow.css("left",k+30);var c=this.validationpopup.width();if(c+k>this.host.width()-20){var g=c+k-this.host.width()+40;k-=g}this.validationpopup.css("left",k);this.validationpopup.show();this.validationpopuparrow.show()}})})(jQuery);