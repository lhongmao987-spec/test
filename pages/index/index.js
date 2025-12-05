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
    selectedCategory: null // 选中的分类，null表示全部
  },

  onLoad() {
    // 获取分类列表
    const categories = wordsModule.getCategories();
    this.setData({
      categories: categories
    });
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
    console.log('开始游戏按钮被点击，时长：', this.data.selectedTime, '分类：', this.data.selectedCategory);
    const time = this.data.selectedTime || 60;
    const category = this.data.selectedCategory || '';
    const url = `/pages/game/game?time=${time}${category ? '&category=' + encodeURIComponent(category) : ''}`;
    wx.navigateTo({
      url: url,
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
