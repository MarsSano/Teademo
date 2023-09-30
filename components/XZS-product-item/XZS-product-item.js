// components/XZS-product-item/XZS-product-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickPro(e){
      let id=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/productDetail/productDetail?id='+id,
      })
    }
  }
})