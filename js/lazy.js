/**
 * Created by xiaopang on 2017/1/6.
 */

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



      function getClientH() {
        var clientH =  document.documentElement.clientHeight || document.body.clientHeight;
        return clientH;
      };
      function getScroll() {
        var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
        return scrollT;
      };
     function scroll(){
      var img = document.getElementsByTagName('img');
      var imgLen=img.length;
      setTimeout(function(){
        for(var i=0;i<imgLen;i++){
          var currPar=img[i].offsetTop;
          if(getClientH()+getScroll()+50>currPar){
            img[i].src=img[i].getAttribute('data-src');
          }
        }
      },1000);
    }
    scroll();
    window.onscroll=function(){
      scroll();
    }
    });


