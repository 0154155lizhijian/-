//index.js
//获取应用实例
var app = getApp()
const initItems = [
  { total: '', quantity: '', unitPrice: '' },
  { total: '', quantity: '', unitPrice: '' },
  { total: '', quantity: '', unitPrice: '' }
];
Page({
  data: {
    motto: '比价计算器☞',
    userInfo: {},
    defaultSize: 'default',
    disabled: false,
    iconType:'info_circle',
    items: initItems,
    minPriceIndex: -1,
  },
  toCalcMin: function(data){
    // 初始化最小价格
    let minPrice = Infinity;
    let minPriceIndex = -1;
  
    // 遍历 items 数组，找到最小价格元素的索引
    for (let i = 0; i < data.length; i++) {
      if (data[i].unitPrice && data[i].unitPrice < minPrice) {
        minPrice = data[i].unitPrice;
        minPriceIndex = i; 
      }
    }
    this.setData({
      minPriceIndex
    })
  },
  handleTotalChange: function (e) {
    const index = e.target.dataset.index;
    const total = e.detail.value;
    const newItems = this.data.items;
    const item = newItems[index];
    if(total && item.quantity){
      newItems[index] = {
        total,
        quantity: item.quantity,
        unitPrice: total / item.quantity,
      }
      this.toCalcMin(newItems);
    }else{
      newItems[index] = {
        ...newItems[index],
        total,
      }
    }
    this.setData({
      items: this.data.items
    });
  },
  handleQuantityChange: function (e) {
    const index = e.target.dataset.index;
    const quantity = e.detail.value;
    const newItems = this.data.items;
    const item = newItems[index];
    if(item.total && quantity){
      newItems[index] = {
        total: item.total ,
        quantity,
        unitPrice: item.total / quantity,
      }
      this.toCalcMin(newItems);
    }else{
      newItems[index] = {
        ...newItems[index],
        quantity,
      }
    }
    this.setData({
      items: this.data.items
    });
  },
  handleUnitPriceChange: function (e) {
    const index = e.target.dataset.index;
    const unitPrice = e.detail.value;
    const newItems = this.data.items;
    const item = newItems[index];
    if(unitPrice && item.quantity){
      newItems[index] = {
        total: unitPrice * item.quantity,
        quantity: item.quantity,
        unitPrice,
      }
      this.toCalcMin(newItems);
    }else{
      newItems[index] = {
        ...newItems[index],
        unitPrice,
      }
    }
    this.setData({
      items: this.data.items
    });
  },
  reset: function(e){
    this.setData({
      items: initItems,
      minPriceIndex: -1
    });
  },
  add: function(){
    this.setData({
      items: [...this.data.items, {}]
    });
  },
  toCalc:function(){
    wx.navigateTo({
      url:'../calc/calc'
    })
  },
  onLoad: function () {
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
