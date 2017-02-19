//沙箱模式 避免全局污染 代码自执行 分割作用域
(function(global){
	var init;
	var arr=[],
	push=arr.push,
	slice=arr.slice;
	//利用工厂模式创建Fuzitu对象
	var Fuzitu=function(selector,context){
		return new Fuzitu.prototype.init(selector,context);
	}
	Fuzitu.fn=Fuzitu.prototype={
		constructor:Fuzitu,
		length:0
	}
	//构造函数
	init=Fuzitu.prototype.init=function(selector,context){
		//第一步 selector类型的判断
		if(!selector){
			return this;
		}
		//字符串类型
		if(Fuzitu.isString(selector)){
			if(Fuzitu.isHTML(selector)){
				push.apply(this,Fuzitu.parseHTML(selector))
			}else{
				push.apply(this,select(selector,context))
			}
		}
		//单个dom
		else if(Fuzitu.isDom(selector)){
			this[0]=selector;
			this.length=1;
		}
		//dom数组
		else if(Fuzitu.isLikeArrr(selector)){
			push.apply(this,selector)
		}
		//函数
		else if(typeof selector==='function'){
			if(Fuzitu.isReady){
				selector();
			}else{
				document.addEventListener('DOMContentLoaded',function(){
					Fuzitu.isReady=true;
					selector();
				})
			}
		}
	}
	Fuzitu.prototype.addClass=function(){
		console.log('addClass');
	}
	init.prototype=Fuzitu.fn;
	//提供可扩展的接口
	Fuzitu.extend=Fuzitu.fn.extend=function(source){
		for(var k in source){
			this[k]=source[k];
		}
	}
	Fuzitu.extend({
		isString:function (obj) {
			return typeof obj==='string';
		},
		isHTML:function(obj){
			return (obj+'').charAt(0)==='<'&&
			(obj+'').charAt((obj+'').length-1)==='>'&&
			(obj+'').length>=3
		},
		isDom:function (obj) {
			return 'nodeType' in obj&&obj.nodeType===1;
		},
		isLikeArrr:function(obj){
			var length=!!obj&&'length' in obj&&obj.length,
			type=Fuzitu.type(obj);
			if(type==='function'||type==='window'){
				return false;
			}
			return type==='array'||length===0||
			typeof length==='number'&&length>0&&(length-1) in obj;
		},
		isWindow:function(obj){
			return !!obj&&obj.window===obj;
		}
	})

	Fuzitu.extend({
		parseHTML:function(html){
			var ret=[];
			var div=document.createElement('div');
			div.innerHTML=html;
			for(var i=0;i<div.childNodes.length;i++){
				if(div.childNodes[i].nodeType===1){
					ret.push(div.childNodes[i]);
				}
			}
			return ret;
		},
		type:function(obj){
			if(obj==null){
				return obj+'';
			}
			return typeof obj==='object'?
			Object.prototype.toString.call(obj).slice(8,-1).toLowerCase():
			typeof obj;
		}
	})

	
	//选择器引擎
	var select=function(selector,context){
		var ret=[];
		if(context){
			if(context.nodeType===1){//context 为dom元素
				return Array.prototype.slice.call(context.querySelectorAll(slector));
			}//context 为数组或者伪数组
			else if(context instanceof Array||
				(typeof context==='object'&&'length' in context)){
				//遍历context 得到doms 五个div doms就是每个div 然后在在其中找P
				for(var i=0;i<context.length;i++){
					var doms=context[i].querySelectorAll(selector);
					for(var j=0;j<doms.length;j++){
						ret.push(doms[j]);
					}
					
				}
				return ret;
			}//context 为字符串也就是选择器
			else{
				return Array.prototype.slice.call(document.querySelectorAll(context+' '+selector));
			}
		}//context 没有传入实参 直接调用document.qyerySelectorAll(selector)
		else{
			return Array.prototype.slice.call(document.querySelectorAll(selector));			
		}

	}
		
	//暴露给用户的核心函数  如果$被占用 可以使用fuzitu
	global.$=global.Fuzitu=Fuzitu;
}(window))