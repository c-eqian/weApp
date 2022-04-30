Component({
  data: {
    current: 0,
    color: "#7A7E83",
    infos:5,
    selectedColor: "#3cc51f",
    tabBarList:[
      {
        icon:"home-o",
        text:"首页",
        info:""
      },
      {
        icon:"chat-o",
        text:"消息",
        info:''
      },
      {
        icon:"user-o",
        text:"我的",
        info:""
      }
    ],
    "list": [
      {
        "pagePath": "/pages/index/index",
      },
      {
        "pagePath": "/pages/notice/notice",
      },
      {
        "pagePath": "/pages/person/person",
      }
    ]
  },
  attached() {
  },
  methods: {
    handleClickItem(e) {
     /* this.setData({
        active:e.detail,
      })*/
      wx.switchTab({
        url:this.data.list[parseInt(e.detail.key)].pagePath
    })
    }
  }
})