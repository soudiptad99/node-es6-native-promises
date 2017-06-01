var http=require('http');
var URL='http://localhost:3000';

var getPromise=function(url){
	var promise= new Promise(function(resolve,reject){
   var req=http.get(url,function(response){
            if(response.statusCode < 200 || response.statusCode > 299){
               reject(new Error('ErrorCode '+response.statusCode))
            }
            var result="";
            response.on('data',function(chunk){result +=chunk;} )
            response.on('end',function(){resolve(result);} )
      });

   req.on('error',function(err){
      console.error('Error with the request:', err.message); 
      reject(err.message); 
     });

   req.end();

   });

   return promise;
}


getPromise(URL+'/olympic/2016/ranking/42')
      .then(function(data){
         console.log("Response 1 "+data);
         return getPromise(URL+'/iso/country/'+JSON.parse(data).Country);
      })
      .then(function(data){
         console.log("Response 2 "+data);
         return getPromise(URL+'/olympic/2016/medal/'+JSON.parse(data).iso);
      })
      .then(function(data){
         console.log("Response 3 "+data)
      })
      .catch(function(err){
         console.log(err)
      });
