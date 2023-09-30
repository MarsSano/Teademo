import {listNews} from "../../api/apis"
import {formatTime,formatNum} from "../../utils/common"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsArr:[],
    loading:false,  //为true时表示正在请求加载数据
    isData:false   //为true时表示没有数据了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取新闻列表
    this.getNewsData()
  },
  //获取新闻列表
  getNewsData(size=0){
    // size=0默认请求时从第一条数据开始
    this.setData({
      loading:true
    })

    listNews({
      limit:8,   //每次仅仅更新八条数据
      size
    }).then(res=>{
      //格式化获取到的新闻列表数据
      res.data.forEach(item=>{
        item.view_count=formatNum(item.view_count)
        item.publish_date=formatTime(item.publish_date)
      })
      //将新旧新闻列表数据进行拼接
      let oldData=this.data.newsArr
      let newData=[...oldData,...res.data]

      this.setData({
        newsArr:newData,
        loading:false
      })
      //新闻数据更新完后停止页面下拉刷新
      wx.stopPullDownRefresh()
      //获取到的新闻数据已是最大值时，将isData变为false
      if(this.data.newsArr.length==res.total){
        this.setData({
          isData:true
        })
      }
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
    // 下拉刷新将所有变量改为初始值后再发送请求
    this.setData({
      newsArr:[],
      isData:false,
      loading:false
    })
    this.getNewsData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 当isData为true时表示已没有更多数据，停止发送请求
    if(this.data.isData) return
    // 反之发送请求
    this.getNewsData(this.data.newsArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})