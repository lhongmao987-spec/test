// index.js
const wordsModule = require('../../utils/words');

// 分类图标映射
const categoryIcons = {
  '全部': '🌟',
  '交通工具': '🚗',
  '食物': '🍜',
  '动物': '🐱',
  '职业': '👨‍💼',
  '运动': '⚽',
  '日常用品': '📱',
  '自然': '🌲',
  '地点': '🏠'
};

Page({
  data: {
    selectedTime: 60, // 默认60秒
    timeOptions: [60, 90, 120],
    categories: [], // 分类列表
    categoryIcons: categoryIcons, // 分类图标映射
    selectedCategory: null, // 选中的分类，null表示全部
    isNavigating: false // 是否正在跳转，用于防抖
  },

  onLoad() {
    // 获取分类列表
    const categories = wordsModule.getCategories();
    this.setData({
      categories: categories
    });
  },

  onReady() {
    // 页面渲染完成后，确保页面已完全加载
    console.log('首页加载完成');
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    // 如果点击的是已选中的分类，则取消选择（选择全部）
    const newCategory = this.data.selectedCategory === category ? null : category;
    this.setData({
      selectedCategory: newCategory
    });
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
    // 防抖处理：如果正在跳转，忽略本次点击
    if (this.data.isNavigating) {
      console.log('正在跳转中，忽略重复点击');
      return;
    }

    console.log('开始游戏按钮被点击，时长：', this.data.selectedTime, '分类：', this.data.selectedCategory);
    const time = this.data.selectedTime || 60;
    const category = this.data.selectedCategory || '';
    const url = `/pages/game/game?time=${time}${category ? '&category=' + encodeURIComponent(category) : ''}`;
    
    // 设置跳转状态
    this.setData({
      isNavigating: true
    });

    // 延迟一小段时间确保页面完全准备好
    setTimeout(() => {
      wx.navigateTo({
        url: url,
        success: () => {
          console.log('页面跳转成功');
          // 跳转成功后重置状态
          this.setData({
            isNavigating: false
          });
        },
        fail: (err) => {
          console.error('页面跳转失败：', err);
          // 重置跳转状态
          this.setData({
            isNavigating: false
          });
          
          // 如果是超时错误，尝试重试一次
          if (err.errMsg && err.errMsg.includes('timeout')) {
            console.log('跳转超时，尝试重试...');
            setTimeout(() => {
              wx.navigateTo({
                url: url,
                success: () => {
                  console.log('重试跳转成功');
                },
                fail: (retryErr) => {
                  console.error('重试跳转失败：', retryErr);
                  wx.showToast({
                    title: '跳转失败，请重试',
                    icon: 'none',
                    duration: 2000
                  });
                }
              });
            }, 300);
          } else {
            wx.showToast({
              title: '跳转失败，请重试',
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    }, 100); // 延迟100ms确保页面完全准备好
  }
});
