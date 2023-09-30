import {formatTime} from "../../utils/common"
import {newsDetail} from "../../api/apis"
let id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    id=options.id
    this.getDetail()
  },
  //获取新闻详情
  getDetail(){
    newsDetail({
      id
    }).then(res=>{
      //格式化发表日期
      res.data.publish_date=formatTime(res.data.publish_date,6)
      //为某些标签添加类名,以便写样式
      res.data.content=res.data.content.replace(/<p/gi,"<p class='pstyle'")
      res.data.content=res.data.content.replace(/<img/,"<img class='imgstyle'")
      this.setData({
        detail:res.data
      })
      //更改页面标题
      wx.setNavigationBarTitle({
        title: res.data.title
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title:this.data.detail.title,
      path:"/pages/newsDetail/newsDetail?id="+this.data.detail._id
    }
  },
  onShareTimeline(){
    return {
      title:this.data.detail.title,
      path:"/pages/newsDetail/newsDetail?id="+this.data.detail._id
    }
  }
})