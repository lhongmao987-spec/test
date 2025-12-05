// game.js
let getRandomWords;
try {
  // 微信小程序require不需要.js扩展名
  const wordsModule = require('../../utils/words');
  getRandomWords = wordsModule.getRandomWords;
  console.log('词库模块加载成功');
} catch (e) {
  console.error('加载词库失败：', e);
  // 备用词库
  const defaultWords = [
    '小龙虾', '火锅', '烧烤', '奶茶', '冰淇淋',
    '手机', '电脑', '键盘', '鼠标', '耳机',
    '篮球', '足球', '乒乓球', '游泳', '跑步',
    '猫', '狗', '兔子', '熊猫', '老虎',
    '苹果', '香蕉', '西瓜', '草莓', '葡萄',
    '汽车', '飞机', '火车', '自行车', '摩托车',
    '医生', '老师', '警察', '消防员', '厨师',
    '太阳', '月亮', '星星', '云朵', '彩虹'
  ];
  getRandomWords = function(count = 50) {
    const shuffled = [...defaultWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };
  console.log('使用备用词库');
}

Page({
  data: {
    timeLimit: 60, // 总时长（秒）
    remainingTime: 60, // 剩余时间
    currentWord: '', // 当前词语
    wordIndex: 0, // 当前词语索引
    words: [], // 词库
    correctCount: 0, // 猜对数量
    skipCount: 0, // 跳过数量
    totalCount: 0, // 总数量
    timer: null, // 定时器
    cardAnimation: '' // 卡片动画
  },

  onLoad(options) {
    console.log('游戏页面开始加载，参数：', options);
    
    try {
      const time = parseInt(options.time) || 60;
      console.log('解析时长：', time);
      
      // 获取词库
      let words = [];
      try {
        words = getRandomWords ? getRandomWords(100) : [];
        console.log('词库获取成功，词语数量：', words.length);
      } catch (e) {
        console.error('获取词库时出错：', e);
        words = [];
      }
      
      // 如果词库为空，使用备用词
      if (!words || words.length === 0) {
        console.warn('词库为空，使用备用词');
        words = ['小龙虾', '火锅', '烧烤', '奶茶', '冰淇淋', '手机', '电脑', '键盘'];
      }
      
      const firstWord = words[0] || '测试';
      console.log('第一个词语：', firstWord);
      
      this.setData({
        timeLimit: time,
        remainingTime: time,
        words: words,
        currentWord: firstWord,
        totalCount: 1,
        cardAnimation: 'fade-in'
      });

      console.log('数据设置完成，开始倒计时');
      // 开始倒计时
      this.startTimer();
      console.log('游戏页面加载完成');
    } catch (error) {
      console.error('游戏页面加载错误：', error);
      console.error('错误堆栈：', error.stack);
      wx.showModal({
        title: '加载失败',
        content: '游戏页面加载出错：' + (error.message || '未知错误'),
        showCancel: false,
        success: () => {
          wx.navigateBack();
        }
      });
    }
  },

  onUnload() {
    // 页面卸载时清除定时器
    this.clearTimer();
  },

  // 开始倒计时
  startTimer() {
    this.data.timer = setInterval(() => {
      let remaining = this.data.remainingTime;
      remaining--;
      
      if (remaining <= 0) {
        this.clearTimer();
        this.gameOver();
        return;
      }

      this.setData({
        remainingTime: remaining
      });
    }, 1000);
  },

  // 清除定时器
  clearTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.data.timer = null;
    }
  },

  // 切换到下一个词
  nextWord() {
    const { words, wordIndex } = this.data;
    const nextIndex = wordIndex + 1;
    
    if (nextIndex >= words.length) {
      // 词库用完了，重新打乱
      const newWords = getRandomWords ? getRandomWords(100) : [];
      this.setData({
        words: newWords,
        wordIndex: 0,
        currentWord: newWords[0] || '',
        totalCount: this.data.totalCount + 1
      });
    } else {
      this.setData({
        wordIndex: nextIndex,
        currentWord: words[nextIndex],
        totalCount: this.data.totalCount + 1
      });
    }
  },

  // 点击正确
  onCorrect() {
    this.setData({
      correctCount: this.data.correctCount + 1,
      cardAnimation: 'fade-out'
    });

    setTimeout(() => {
      this.nextWord();
      this.setData({
        cardAnimation: 'fade-in'
      });
    }, 200);
  },

  // 点击跳过
  onSkip() {
    this.setData({
      skipCount: this.data.skipCount + 1,
      cardAnimation: 'fade-out'
    });

    setTimeout(() => {
      this.nextWord();
      this.setData({
        cardAnimation: 'fade-in'
      });
    }, 200);
  },

  // 游戏结束
  gameOver() {
    const { correctCount, skipCount, totalCount, timeLimit } = this.data;
    
    wx.redirectTo({
      url: `/pages/result/result?correct=${correctCount}&skip=${skipCount}&total=${totalCount}&time=${timeLimit}`
    });
  },

  // 提前结束
  onBack() {
    wx.showModal({
      title: '提示',
      content: '确定要结束本轮游戏吗？',
      success: (res) => {
        if (res.confirm) {
          this.clearTimer();
          this.gameOver();
        }
      }
    });
  }
});

