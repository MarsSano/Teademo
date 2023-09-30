// 引入封装后的request
import {request} from "../utils/request"
// 获取分类导航列表
export function listNav(){
  return request({
    url:"/nav/get",
    method:"POST"
  })
}
//获取新闻列表
export function listNews(data){
  return request({
    url:"/news/get",
    method:"POST",
    data
  })
}
//获取新闻详情
export function newsDetail(data){
  return request({
    url:"/news/detail",
    method:"POST",
    data
  })
}
//获取产品列表
export function listProduct(data){
  return request({
    url:"/product/getlist",
    method:"POST",
    data
  })
}
//获取产品详情
export function productDetail(data){
  return request({
    url:"/product/detail",
    method:"POST",
    data
  })
}