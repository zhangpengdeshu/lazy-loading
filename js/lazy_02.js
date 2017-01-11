/**
 * Created by xiaopang on 2017/1/9.
 */
/**
 * Created by xiaopang on 2017/1/6.
 */
//简单封装ajax
function ajax(type,url,data,success,failed){
  var xhr=null;
  if(window.XMLHttpRequest){
    xhr=new XMLHttpRequest();
  }else{
    xhr=new ActiveXObject('Microsoft.XMLHTTP');
  }
  var type=type.toUpperCase();
  //用于清除缓存
  var random=Math.random();
  if(typeof data =='object'){
    var str="";
    for(var key in data){
      str+=key+'='+data[key]+'&';
    }
    data=str.replace(/&$/,'');
  }

  if(type=='GET'){
    if(data){
      xhr.open('GET',url+'?'+data,true);
    }else{
      xhr.open('GET',url+'?t='+random,true);
    }
    xhr.send();
  }else if(type=='POST'){
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(data);
  }

  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if(xhr.status==200){
        success(xhr.responseText);
      }else{
        if(failed){
          failed(xhr.status);
        }
      }
    }
  }
}
//获取数据
ajax('get','./data/group.json','',function(data){
  var jsonData=JSON.parse(data);
  var result=jsonData.info;
  var len=result.length;
  for(var i=0;i<len;i++){
    var html='<a href="#" class="container-list-box">'+
      '<div class="item">'+
      '<div class="item-left">'+
      '<img src="images/loading.gif" data-src='+result[i].url+'>'+
      '</div>'+
      '<div class="item-right">'+
      '<h3>'+result[i].title+'</h3>'+
      '<p>智能理财，财富的守护者</p>'+
      '</div>'+
      '</div>'+
      '</a>';
    var li=document.createElement('li');
    li.setAttribute("class","container-list");
    li.innerHTML=html;
    document.getElementById("container-main").appendChild(li);
  }
  lazyloading.init();
});

window.onscroll=function(){
  var container=document.querySelector('.container');
  lazyloading.init();
  loadmore.init(container);
}

var lazyloading=(function(win,doc){
  var _viewH=function(){
    var clientH =  document.documentElement.clientHeight || document.body.clientHeight;
    return clientH;
  };

  var _viewSro=function(){
    var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
    return scrollT;
  };

  var _offsetTop=function(element){
    var top=element.offsetTop;//得到第一层距离
    var parent=element.offsetParent;//得到第一个父元素
    while(parent !==null){  //如果还有上一层 ，不为空
      top+=parent.offsetTop; //本层距离累加
      parent=parent.offsetParent; //得到本层的父元素
      }                                            //继续循环
      return top;
    };

  var _init=function(){
    var node = document.getElementsByTagName("img");
    var nodeLen=node.length;
    setTimeout(function(){
      for(var i=0;i<nodeLen;i++){
        var currPar=node[i].offsetTop;
        if(_viewH()+_viewSro()+50>currPar){
          node[i].src=node[i].getAttribute('data-src');
        }
      }
    },1000);
  };

  return {
    init:_init
  }
})(window,document);

var loadmore=(function(){
  var getScrollTop=function(){
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    return scrollTop;
  };

  var getClientHeight=function(){
    var clientHeight=0;
    if(document.documentElement && document.documentElement.clientHeight){
        clientHeight=document.documentElement.clientHeight;
      }else if(document.body){
        clientHeight=document.body.clientHeight;
      }
    return clientHeight;
  }

  var getScrollHeight=function(ele){
    if(ele){
      return ele.scrollHeight;
    }else{
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  }

  var _init=function(ele){
    var is_load=true;
    var load=document.querySelector('.loading');
    if(is_load){
      if(getScrollTop(ele)+getClientHeight()==getScrollHeight(ele)){
        load.style.display='block';
        is_load=false;
        ajax('get','./data/group.json','',function(data){
          var jsonData=JSON.parse(data);
          var result=jsonData.info;
          var len=result.length;
          for(var i=0;i<len;i++){
            var html='<a href="#" class="container-list-box">'+
              '<div class="item">'+
              '<div class="item-left">'+
              '<img src="images/loading.gif" data-src='+result[i].url+'>'+
              '</div>'+
              '<div class="item-right">'+
              '<h3>'+result[i].title+'</h3>'+
              '<p>智能理财，财富的守护者</p>'+
              '</div>'+
              '</div>'+
              '</a>';
            var li=document.createElement('li');
            li.setAttribute("class","container-list");
            li.innerHTML=html;
            document.getElementById("container-main").appendChild(li);
            load.style.display='none';
            is_load=true;
          }
          lazyloading.init();
        });
      }
    }
  }

  return {
    init:_init
  }
})();
