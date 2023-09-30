// pages/search/search.js
import {listProduct} from "../../api/apis"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total:0,  //搜索产品总数
    productList:[], //搜索产品列表
    historyList:[], //搜索历史列表
    keyword:"",   //搜索关键字
    noData:false  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 先获取本地的搜索历史存储
    let list=wx.getStorageSync('searchKeyArr') || null;
    if(list){
      this.setData({
        historyList:list
      })
    }
  },
  //搜索框发生变化
  onChange(e){
    this.setData({
      keyword:e.detail
    })
  },
  //确定搜索
  onSearch(){
    let hisArr=this.data.historyList || [];
    hisArr.unshift(this.data.keyword);
    // 搜索历史去重
    hisArr=[...new Set(hisArr)];
    // 只能展示最新的八条搜索历史
    hisArr=hisArr.slice(0,8);

    this.setData({
      historyList:hisArr
    })
    // 存储搜索历史
    wx.setStorageSync('searchKeyArr', hisArr);
    this.getData();
  }, 
  //清除搜索框
  onClear(){
    this.setData({
      keyword:"",
      productList:[],
      total:0,
      noData:false
    })
  }, 
  //点击搜索历史实现搜索功能
  tapItemSearch(e){
    console.log(e);
    this.setData({
      keyword:e.currentTarget.dataset.value
    })
    this.getData()
  },
  //清空搜索历史
  removeHistory(){
    //清除本地搜索历史储存
    wx.removeStorageSync('searchKeyArr');
    this.setData({
      keyword:"",
      historyList:[],
      productList:[],
      total:0,
      noData:false
    })
  },
  // 获取搜索内容
  getData(){
    listProduct({
      keyword:this.data.keyword,
      limit:10
    }).then(res=>{
      let noData=false;
      //如果搜索不到内容将noData置为true,展示搜索不到
      if(res.data.length==0){
        noData=true
      }
      this.setData({
        total:res.total,
        productList:res.data,
        noData
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

  }
})