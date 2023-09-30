// 实现request请求的二次封装
// 声明基础路径
const baseURL='https://tea.qingnian8.com';
export function request(params){
  let dataObj=params.data || {};
  let headerObj={
    "Content-Type":"application/json"
  }
  return new Promise((resolve,reject)=>{
    wx.request({
      url:baseURL+params.url,
      method:params.method||"GET",
      data:dataObj,
      header:headerObj,
      success:res=>{
        // 请求失败的话展示相应错误
        if(res.data.errCode!=0){
          reject(res.data);
          wx.showToast({
            title: res.data.errMsg,
            mask:true,
            icon:"error"
          })
          return;
        }
        resolve(res.data)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}