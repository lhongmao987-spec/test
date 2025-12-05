// index.js
Page({
  data: {
    selectedTime: 60, // 默认60秒
    timeOptions: [60, 90, 120]
  },

  onLoad() {
    // 页面加载
  },

  // 选择时长
  selectTime(e) {
    const time = e.currentTarget.dataset.time;
    this.setData({
      selectedTime: time
    });
  },

  // 开始游戏
  startGame() {
    console.log('开始游戏按钮被点击，时长：', this.data.selectedTime);
    const time = this.data.selectedTime || 60;
    wx.navigateTo({
      url: `/pages/game/game?time=${time}`,
      success: () => {
        console.log('页面跳转成功');
      },
      fail: (err) => {
        console.error('页面跳转失败：', err);
        wx.showToast({
          title: '跳转失败，请重试',
          icon: 'none'
        });
      }
    });
  }
});
