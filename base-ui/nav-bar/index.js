// base-ui/nav-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true
  },
  properties: {
    title: {
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:0
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    hanleLeftClick: function() {
      this.triggerEvent('hanleLeftClick')
    }
  },
  lifetimes:{
    ready: function() {
      const statusBarHeight = getApp().globalData.statusBarHeight
      this.setData({
        statusBarHeight
      })
    }
  }
})
