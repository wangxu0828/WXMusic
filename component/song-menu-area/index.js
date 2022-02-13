// component/song-menu-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Array,
      value:[]
    },
    title: {
      type:String,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        screenWidth:getApp().globalData.screenWidth
      })
    },
  },

})
