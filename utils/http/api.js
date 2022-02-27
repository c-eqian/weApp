//引入封装的reuest请求
const { request } = require('./request.js')
//基于业务封装的接口
module.exports={
/*	getBanner:()=>{
		return request(','GET',{},true);
  },*/
  
  post:(_url,_data)=>{
    return request(_url,'POST',_data);

  },
  get:(_url,_data)=>{
    return  request(_url,'GET',_data);
  }

  
}