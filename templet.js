(function(上帝){
	var 
	需编码字串表={
		'&':'&amp;',
		'<':'&lt;',
		'>':'&gt;',
		'"':'&quot;',
		"'":'&#39;',
		'/':'&#x2F;',
		'`':'&#x60;',
		'=':'&#x3D;'
	},
	编码成文本=function(string){
		return String(string).replace(/[&<>"'`=\/]/g,function(s){
			return 需编码字串表[s];
		}).replace(/\n\r/g,function(s){
			return '\\n';
		})
	},
	编码成网页=function(string){
		return String(string);
		return String(string).replace(/"/g,function(s){
			return '\\'+s;
		});
	}, 
	编译模板=function(模板字串){
		var 
		已打开的钥匙们=[],
		模板字串=模板字串
			.replace(/[\n\r\t]/g,'')
			.replace(/"/g,'\\"')
			.replace(/\{\{(#|\/|\^|&|\$)?(.+?)\}\}/g,function(整段文字,动作,管道){

			if(管道=='.')
				管道='$value';
			管道=管道.split('|');

			钥匙=管道.shift();

			var 
			管道前,
			管道后,
			钥匙和管道;

			管道前=管道.join('(')+'(';

			管道后=[];
			管道后.length=管道.length;
			管道后=管道后.join(')')+')';

			钥匙和管道=管道前+钥匙+管道后;

			switch(动作){
				case '#':
					已打开的钥匙们.push(钥匙);

				
					return '");\
					(function(){\
						var $value;\
						var $key;\
						if( typeof('+钥匙+')!="undefined" && '+钥匙+' && (钥匙='+钥匙和管道+'))\
						for($key in '+钥匙+')\
							with($value='+钥匙+'[$key]){\
							$return.push("';

					break;
				case '$':
					已打开的钥匙们.push(钥匙);

					return '");\
					(function(){\
						if( typeof('+钥匙+')!="undefined" && '+钥匙+' ){\
							$return.push("';
				
					break;
				case '^':
					已打开的钥匙们.push(钥匙);

					return '");\
					(function(){\
						if( typeof('+钥匙+')=="undefined" || !'+钥匙+' ){\
							$return.push("';
				
					break;
				case '/':
					var 
					长度=已打开的钥匙们.length+1;
					while(已打开的钥匙们[--长度]&&已打开的钥匙们[长度]!=钥匙);
					
					已打开的钥匙们.splice(长度,1);

					return '")\
						}\
					})();\
					$return.push("';
				
					break;
				case '&':

					return '");\
						if(typeof('+钥匙+')!="undefined")\
							$return.push(模板.编码成网页('+钥匙和管道+'||\'\'));\
						\
						$return.push("';

					break;
				default:

					return '");\
						if(typeof('+钥匙+')!="undefined")\
							$return.push(模板.编码成文本('+钥匙和管道+'||\'\'));\
						\
						$return.push("';

					break;
			}

		});

		模板字串='\
			var $return=[];\
			with($data){\
				$return.push("'+模板字串+'");\
			}\
			return $return.join(\'\');';

		//模板字串=模板字串.replace(/[\n\r\t]/g,'');
		A=模板字串;
		return Function('$data',模板字串);
	},
	运转=function(模板字串,数据,作用域){
		return 编译模板(模板字串).call(作用域||上帝,数据);
	};
	
	上帝.模板={
		运转:运转,
		编译模板:编译模板,
		编码成文本:编码成文本,
		编码成网页:编码成网页,
	};

})(this);