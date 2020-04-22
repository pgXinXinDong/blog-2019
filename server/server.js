
var express = require('express')
var bodyParser = require('body-parser');
var request = require('request')
var app = express()

let URL = {
  server:"http://172.19.13.49:7092",
  BlogNum:"/api/blog/getTagsAndBlogNum",
  BlogList:"/api/blog/getBlogList"
}
/**
 * url: 请求地址
 * params:请求参数
 */

const getBlogIndexData = (url,params)=>{
 return new Promise((resolve,reject)=>{
    request({
      url:url,
      method:"POST",
      body:params,
      headers: {
        "content-type": "application/json",
      }

    },function(error,response,body){
      if(!error && response.statusCode == 200){
        resolve(body)
      }else{
        reject(error)
      } 
    
    })
  })
 
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.post("/api/blog/list",(req,res)=>{
  let urlList ="http://mock-fe.internal.weimob.com/mock/5e9d61b32ce0aa002019a148/blog/list";
  let requestData = JSON.stringify(req.body)
  getBlogIndexData(urlList,requestData).then((result)=>{
    res.send(result)
  })

})

app.post("/api/blog/num",(req,res)=>{
  let urlNum = URL.server+URL.BlogNum
   urlNum ="http://mock-fe.internal.weimob.com/mock/5e9d61b32ce0aa002019a148/blog/num";
  let requestData = JSON.stringify(req.body)
  getBlogIndexData(urlNum,requestData).then((result)=>{
    console.log("reuslt",result)
    res.send(result)
  })
})


app.post("/api/blog/allList",(req,res)=>{
  console.log("sssss",req.body)
  let urlNum ="http://mock-fe.internal.weimob.com/mock/5e9d61b32ce0aa002019a148/blog/list";
  let requestData = JSON.stringify(req.body)
  getBlogIndexData(urlNum,requestData).then((result)=>{
    res.send(result)
  })
})


app.listen(3000,()=>{
  console.log("服务启动成功")
})

