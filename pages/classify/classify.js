// pages/classify/classify.js
import {listNav,listProduct} from "../../api/apis"
let navid;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navActive:0,  //定义选中的类别
    navArr:[],
    productArr:[],
    loading:false,  
    isData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getNavList();
    // 首页点击导航传参后跳转到分类页面，相当于触发了导航条切换事件
    let {idx}=options;
    if(idx){
      //如果idx存在的话说明是从首页点击跳转
      this.navChange(idx)
    }else{
    //反之则是分类页面的默认初始化，展示第一个导航条的内容
    navid=this.data.navArr[0]._id
    this.getProductList()
    }
    
  },
  //获取导航栏列表
  async getNavList(){
    await listNav().then(res=>{
      this.setData({
        navArr:res.data
      })
    })
  },
  //获取产品列表
  getProductList(size=0){

    this.setData({
      loading:true
    })

    listProduct({
      navid,
      size
    }).then(res=>{
      //拼接新旧数据
      let oldData=this.data.productArr;
      let newData=oldData.concat(res.data);
      this.setData({
        productArr:newData,
        loading:false
      })

      if(this.data.productArr.length==res.total){
        this.setData({
          isData:true
        })
      }
    })
  },
  //导航条切换事件
  navChange(e){
    // index来自分类页面切换导航条或者首页点击导航列表
    let index=e?.detail?.index??e;
    navid=this.data.navArr[index]._id;
    this.setData({
      productArr:[],
      isData:false,
      navActive:Number(index)
    })
    this.getProductList();
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
    // 数据已是最大时停止发送请求
    if(this.data.isData)return

    this.getProductList(this.data.productArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})