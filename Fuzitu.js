//沙箱模式 避免全局污染 代码自执行 分割作用域
(function(global){
	var init;
	//利用工厂模式创建Fuzitu对象
	var Fuzitu=function(selector,context){
		return new Fuzitu.prototype.init(selector,context);
	}
	Fuzitu.fn=Fuzitu.prototype={
		constructor:Fuzitu
	}
	//构造函数
	init=Fuzitu.prototype.init=function(selector,context){

	}
	init.prototype=Fuzitu.fn;
	//暴露给用户的核心函数  如果$被占用 可以使用fuzitu
	global.$=global.Fuzitu=Fuzitu;
}(window))