import {formatNum,formatTime} from "../../utils/common"
import {listNav,listNews} from "../../api/apis"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navArr:[],
    newsArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航栏和新闻列表数据
    this.getNavData();
    this.getNewsData();
  },
  //获取导航栏
  getNavData(){
    listNav().then(res=>{
      this.setData({
        navArr:res.data
      })
    })
  },
  //获取新闻列表
  getNewsData(){
    listNews({
      limit:3,  //首页只展示三条新闻
      hot:true  //新闻为热点新闻
    }).then(res=>{
      //将获取到的新闻列表数据进行格式化
      res.data.forEach(item=>{
        item.view_count=formatNum(item.view_count)
        item.publish_date=formatTime(item.publish_date)
      });
        this.setData({
          newsArr:res.data
        })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})