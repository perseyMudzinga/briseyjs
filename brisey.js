var defaultStyle = "default";
var _id = function(e){
	return document.getElementById(e);
}
var navAnchor;
var style;
var head = document.getElementsByTagName("head")[0].children;
	
	for(var i = 0; i < head.length; i++){
		var tag = head[i];
		if(tag.nodeName == "STYLE"){
			style = tag;
		}
	}


//AJAX
function Data(){
	var txt ="";
	var xml ="";
}
Data.prototype.setText = function(e){
	this.txt = e;
}
Data.prototype.setXml = function(e){
	this.xml = e;
}
Data.prototype.getText = function(){
	return this.txt;
}
Data.prototype.getXml = function(){
	return this.xml;
}
var data = new Data();
function ajaxGet(url, e){
	var xml = new XMLHttpRequest();
	xml.onreadystatechange = function(){
		if(xml.readyState == 4 && xml.status == 200){
			data.setText(xml.responseText);
			data.setXml(xml.responseXml);
			e(data);
		}
	}
	xml.open("GET", url);
	xml.send();
}

//END OF AJAX

function Style(){
	return arguments;
};

function ListItems(){
	return arguments;
}
//ALL TAGS
function Tag(tagname){
	this.tagName = tagname;
	this.tag = document.createElement(this.tagName);
}

//ADDING A TAG TO NEST
Tag.prototype.add = function(e){
	if(this.tagName == "body"){
		document.body.style.margin = "0px";
		document.body.style.padding = "0px";
		document.body.appendChild(e);
	}else{
		this.tag.appendChild(e);
	}
}
Tag.prototype.html = function(e){
	if(this.tagName == "body"){
		document.body.innerHTML = "";
		document.body.appendChild(e);
	}else{
		this.tag.innerHTML = "";
		this.tag.appendChild(e);
	}
}
Tag.prototype.setText = function(e){
	this.tag.innerText = e;
}

Tag.prototype.appendText = function(e){
	var a_text = this.tag.innerText;
	this.tag.innerText = a_text+e;
}

//MAKING A PAGE
Tag.prototype.makePage = function(){
	this.tagName = "div";
	if(this.tagName == "div"){
		this.tag.style.width = "100%";
		this.tag.style.position = "absolute";
		this.tag.style.minHeight = "100%";
		this.tag.style.margin = "auto";
		this.tag.style.padding = "30px";
		this.tag.style.paddingTop = "60px";
	}
}

//MAKING A NAVBAR
Tag.prototype.setAsNavbar = function(){
	this.tagName = "ul";
	if(this.tagName == "ul"){
		this.tag.style.width = "100%";
		this.tag.style.position = "fixed";
		this.tag.style.listStyleType = "none";
		this.tag.style.padding = "0px";
		this.tag.style.background = "#efefef";
		this.tag.style.margin = "0px";
		this.tag.style.zIndex = "1";
		this.tag.style.borderBottom = "1px solid #c9c7c7";
	}
}
Tag.prototype.addListItems = function(navItems, anchorStyle, cont){
	for(var i = 0; i< navItems.length; i++){

		var inText = navItems[i][0];
		var address = navItems[i][1];

		var li = new Tag("li");
		li.setStyle(new Style("float:left"));
		var defaultAnchorStyle = new Style(
				"text-decoration:none",
				"color:#4e4e4e",
				"display:block",
				"padding:15px 10px",
				"cursor:pointer",
				"z-index: -1"
			);
		navAnchor = new Tag("a");
		navAnchor.setStyle(defaultAnchorStyle);

		if(anchorStyle != "default"){
			navAnchor.appendStyle(anchorStyle);
		}
		navAnchor.setAttr("href", "javascript:void(0)");
		navAnchor.setAttr("index", i);
		navAnchor.click(function(e){
			var index = e.srcElement.getAttribute("index");
			cont.html(navItems[index][1].tag);
		});
		navAnchor.setText(inText);
		li.html(navAnchor.tag);
		this.tag.appendChild(li.tag);
	}
}

Tag.prototype.liFloat = function(float){
	var lists = this.tag.children;
	for(var i = 0; i < lists.length; i++){
		lists[i].style.float = float;
	}
}

Tag.prototype.aColor = function(color){
	var anchors = this.tag.children;
	for(var i = 0; i < anchors.length; i++){
		anchors[i].firstChild.style.color = color;
	}
}

Tag.prototype.aBorderBottom = function(border){
	var anchors = this.tag.children;
	for(var i = 0; i < anchors.length; i++){
		anchors[i].firstChild.style.borderBottom = border;
	}
}

Tag.prototype.aTextDecoration = function(deco){
	var anchors = this.tag.children;
	for(var i = 0; i < anchors.length; i++){
		anchors[i].firstChild.style.textDecoration = deco;
	}
}

Tag.prototype.aDisplay = function(display){
	var anchors = this.tag.children;
	for(var i = 0; i < anchors.length; i++){
		anchors[i].firstChild.style.display = display;
	}
}

Tag.prototype.aPadding = function(padding){
	var anchors = this.tag.children;
	for(var i = 0; i < anchors.length; i++){
		anchors[i].firstChild.style.padding = padding;
	}
}

//REAL TYPING
Tag.prototype.realTyping = function(display){
	var thisIn = this.tag;
	thisIn.addEventListener("keyup",function(e){
		var preText = thisIn.value;
		display.tag.innerText = preText;
	});
}

//SETTING ATTRIBUTES
Tag.prototype.setAttr = function(attrName, attrValue){
	this.tag.setAttribute(attrName, attrValue);
}

//FOR FORMS
Tag.prototype.setName = function(name){
	this.tag.setAttribute("name", name);
}
Tag.prototype.setPlaceholder = function(placeholder){
	this.tag.setAttribute("placeholder", placeholder);
}
Tag.prototype.setRows = function(rows){
	this.tag.setAttribute("rows", rows);
}
Tag.prototype.setCols = function(cols){
	this.tag.setAttribute("cols", cols);
}
Tag.prototype.getName = function(){
	return this.tag.getAttribute("name");
}
Tag.prototype.getPlaceholder = function(){
	return this.tag.getAttribute("placeholder");
}

//INPUTS
Tag.prototype.setType = function(type){
	this.tag.setAttribute("type", type);
}
Tag.prototype.setValue = function(value){
	this.tag.setAttribute("value", value);
}

Tag.prototype.getFormValue = function(name){
	return document.forms[this.getName()][name].value;
}
Tag.prototype.getText = function(){
	var inpt = this.tag.value;
	this.tag.value = "";
	return inpt;
}

//CSS FUNCTIONS
Tag.prototype.setWidth = function(width){
	return this.tag.style.width = width;
}
Tag.prototype.setHeight = function(height){
	return this.tag.style.height = height;
}
Tag.prototype.setMinHeight = function(minheight){
	return this.tag.style.minHeight = minheight;
}
Tag.prototype.setMaxHeight = function(maxheight){
	return this.tag.style.maxHeight = maxheight;
}
Tag.prototype.setMinWidth = function(minwidth){
	return this.tag.style.minWidth = minwidth;
}
Tag.prototype.setMaxWidth = function(maxwidth){
	return this.tag.style.maxWidth = maxwidth;
}
Tag.prototype.setMargin = function(margin){
	return this.tag.style.margin = margin;
}
Tag.prototype.setMarginTop = function(margin){
	return this.tag.style.marginTop = margin;
}
Tag.prototype.setMarginBottom = function(margin){
	return this.tag.style.marginBottom = margin;
}
Tag.prototype.setMarginLeft = function(margin){
	return this.tag.style.marginLeft = margin;
}
Tag.prototype.setMarginRight = function(margin){
	return this.tag.style.marginRight = margin;
}
Tag.prototype.setBgColor = function(bg){
	return this.tag.style.backgroundColor = bg;
}
Tag.prototype.setBg = function(bg){
	return this.tag.style.background = bg;
}
Tag.prototype.setColor = function(color){
	return this.tag.style.color = color;
}
Tag.prototype.setPadding = function(padding){
	return this.tag.style.padding = padding;
}
Tag.prototype.setPaddingTop = function(paddingTop){
	return this.tag.style.paddingTop = paddingTop;
}
Tag.prototype.setPaddingBottom = function(paddingBottom){
	return this.tag.style.paddingBottom = paddingBottom;
}
Tag.prototype.setPaddingLeft = function(paddingLeft){
	return this.tag.style.paddingLeft = paddingLeft;
}
Tag.prototype.setPaddingRight = function(paddingRight){
	return this.tag.style.paddingRight = paddingRight;
}
Tag.prototype.setFont = function(font){
	return this.tag.style.fontFamily = font;
}
Tag.prototype.setPosition = function(position){
	return this.tag.style.position = position;
}
Tag.prototype.setTextAlign = function(align){
	return this.tag.style.textAlign = align;
}
Tag.prototype.setFloat = function(float){
	return this.tag.style.float = float;
}
Tag.prototype.setBorder = function(border){
	return this.tag.style.border = border;
}
Tag.prototype.setBorderTop = function(border){
	return this.tag.style.borderTop = border;
}
Tag.prototype.setBorderBottom = function(border){
	return this.tag.style.borderBottom = border;
}
Tag.prototype.setBorderLeft = function(border){
	return this.tag.style.borderLeft = border;
}
Tag.prototype.setBorderRight = function(border){
	return this.tag.style.borderRight = border;
}
Tag.prototype.setBorderRadius = function(radius){
	return this.tag.style.borderRadius = radius;
}
Tag.prototype.setBorderCollapse = function(border){
	return this.tag.style.borderCollapse = border;
}
Tag.prototype.setOutline = function(outline){
	return this.tag.style.outline = outline;
}
Tag.prototype.setOpacity = function(opacity){
	return this.tag.style.opacity = opacity;
}
Tag.prototype.setResize = function(resize){
	return this.tag.style.resize = resize;
}
Tag.prototype.setTextDeco = function(deco){
	return this.tag.style.textDecoration = deco;
}
Tag.prototype.setFontSize = function(size){
	return this.tag.style.fontSize = size;
}
Tag.prototype.setCursor = function(cursor){
	return this.tag.style.cursor = cursor;
}
Tag.prototype.setListType = function(ltype){
	return this.tag.style.listStyleType = ltype;
}
Tag.prototype.setBoxShadow = function(bShadow){
	return this.tag.style.boxShadow = bShadow;
}
Tag.prototype.setZIndex = function(zindex){
	return this.tag.style.zIndex = zindex;
}
Tag.prototype.setDisplay = function(display){
	return this.tag.style.display = display;
}

//NEW LINE
Tag.prototype.newLine = function(){
	var br = document.createElement("br");
	this.tag.appendChild(br);
}

//GETTING VALUES FROM ATTRIBUTES
Tag.prototype.getAttrValue = function(attrName){
	return this.tag.getAttribute(attrName);
}

//SETTING AN ID FOR THE TAG
Tag.prototype.setId = function(id){
	this.tag.setAttribute("id", id);
}

//SETTING A CLASS FOR THE TAG
Tag.prototype.setClass = function(cl){
	this.tag.setAttribute("class", cl);
}

//SETTING AN EVENT LISTENER 
Tag.prototype.setEvent = function(e, f){
	this.tag.addEventListener(e, f);
}
Tag.prototype.click = function(e){
	this.tag.addEventListener("click", e);
}
Tag.prototype.mouseover = function(e){
	this.tag.addEventListener("mouseover", e);
}
Tag.prototype.mouseleave = function(e){
	this.tag.addEventListener("mouseleave", e);
}
Tag.prototype.keypress = function(e){
	this.tag.addEventListener("keypress", e);
}
Tag.prototype.keyup = function(e){
	this.tag.addEventListener("keyup", e);
}
Tag.prototype.mouseenter = function(e){
	this.tag.addEventListener("mouseenter", e);
}

//CLICK TO EDIT
var thisTag = this.tag;
Tag.prototype.clickToEdit = function(){

	this.tag.addEventListener("mouseenter", function(e){
		tooltip.setMarginLeft(e.clientX+"px");
		tooltip.setMarginTop(e.clientY+"px");
		tooltip.setDisplay("block");
	});
	this.tag.addEventListener("mouseleave", function(e){
		tooltip.setDisplay("none");
	});

	this.tag.addEventListener("click", function(e){
		tooltip.setDisplay("none");
		var txtbox = document.createElement("textarea");
		txtbox.setAttribute("style", thisTag.getAttribute("style"));
		txtbox.style.width = e.srcElement.offsetWidth+"px";
		txtbox.style.height = e.srcElement.offsetHeight+"px";
		txtbox.style.resize = "none";
		txtbox.style.outline = "none";
		txtbox.style.border = "1px solid #c9c7c7";
		txtbox.innerHTML = e.srcElement.textContent;
		e.srcElement.parentElement.replaceChild(txtbox, this);
		txtbox.addEventListener("keyup", function(k){
			if(k.keyCode == 13){
				k.preventDefault();
				this.innerText = this.value.substr(0,this.value.length - 1);
				this.value = thisTag.innerText;
				k.srcElement.parentElement.replaceChild(thisTag, txtbox);
			}
		});
	});
}

//LISTS
Tag.prototype.addList = function(listArray, anchor){
	for(var i = 0; i< listArray.length; i++){
		var li = new Tag("li");

		if(anchor){
			var a = new Tag("a");
			a.setAttr("href", "#");
			a.setText(listArray[i]);
			li.html(a.tag);
			this.tag.appendChild(li.tag);
		}else{
			li.setAttr("event", i);
			li.setText(listArray[i]);
		}
		this.tag.appendChild(li.tag);
	}
}

//ATTACHING CSS TO THE TAG
Tag.prototype.setStyle = function(styles){
	var styleString = "";
	for(var i = 0; i < styles.length; i++){
		styleString +=styles[i]+";";
	}
	this.tag.setAttribute("style",styleString);
}
Tag.prototype.appendStyle = function(styles){
	var styleString = this.tag.getAttribute("style");
	for(var i = 0; i < styles.length; i++){
		styleString +=styles[i]+";";
	}
	this.tag.setAttribute("style",styleString);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                                            ///////////////////
/////////////                             EFFECTS                       EFFECTS                          ///////////////////
/////////////                                                                                            ///////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Tag.prototype.fadeIn = function(time){
	var existingProps = style.innerHTML;
	var keyframes = "@keyframes fadein{from{opacity:0} to{opacity:1}}";
	if(existingProps.indexOf(keyframes) < 0){
		style.innerHTML = existingProps+keyframes;
	}
	
	if(this.tag.style.display == "none"){
		this.tag.style.opacity = "0";
		this.tag.style.display = "block";
		this.tag.style.animationName = "fadein";
		this.tag.style.animationDuration = time+"s";
		this.tag.style.animationFillMode = "forwards";
	}
}

Tag.prototype.fadeOut = function(time){
	var existingProps = style.innerHTML;
	var keyframes = "@keyframes fadeout{from{opacity:1} to{opacity:0; display:none}}";
	if(existingProps.indexOf(keyframes) < 0){
		style.innerHTML = existingProps+keyframes;
	}
	var ta = this.tag;
	
	setTimeout(function(){
		ta.style.display = "none";
	}, time * 1000);

	this.tag.style.opacity = "1";
	this.tag.style.animationName = "fadeout";
	this.tag.style.animationDuration = time+"s";
	this.tag.style.animationFillMode = "forwards";
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////                                                                                            ///////////////////
/////////////                         COMPONENTS                     COMPONENTS                          ///////////////////
/////////////                                                                                            ///////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//body
var body = new Tag("body");
var container = new Tag("div");

var tooltip = new Tag("div");
tooltip.setText("Click To Edit");
tooltip.setPosition("absolute");
tooltip.setPadding("5px");
tooltip.setBorder("1px solid #000000");
tooltip.setBgColor("#ffffff");
tooltip.setZIndex("1");
tooltip.setDisplay("none");
tooltip.setBorderRadius("3px");
body.add(tooltip.tag);
