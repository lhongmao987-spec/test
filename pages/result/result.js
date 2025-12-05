// result.js
Page({
  data: {
    correctCount: 0,
    skipCount: 0,
    totalCount: 0,
    timeLimit: 60,
    evaluation: ''
  },

  onLoad(options) {
    const correct = parseInt(options.correct) || 0;
    const skip = parseInt(options.skip) || 0;
    const total = parseInt(options.total) || 0;
    const time = parseInt(options.time) || 60;

    // 计算评价
    const rate = total > 0 ? (correct / total) : 0;
    let evaluation = '';
    if (rate >= 0.8) {
      evaluation = '太棒了！你们配合得真默契！';
    } else if (rate >= 0.6) {
      evaluation = '还不错！继续加油！';
    } else if (rate >= 0.4) {
      evaluation = '还可以，多练习会更好！';
    } else {
      evaluation = '再接再厉，相信你们可以的！';
    }

    this.setData({
      correctCount: correct,
      skipCount: skip,
      totalCount: total,
      timeLimit: time,
      evaluation: evaluation
    });
  },

  // 再来一轮
  playAgain() {
    wx.redirectTo({
      url: `/pages/game/game?time=${this.data.timeLimit}`
    });
  },

  // 返回首页
  backToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  }
});

