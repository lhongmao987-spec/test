// 词库数据
const words = [
  '小龙虾', '火锅', '烧烤', '奶茶', '冰淇淋',
  '手机', '电脑', '键盘', '鼠标', '耳机',
  '篮球', '足球', '乒乓球', '游泳', '跑步',
  '猫', '狗', '兔子', '熊猫', '老虎',
  '苹果', '香蕉', '西瓜', '草莓', '葡萄',
  '汽车', '飞机', '火车', '自行车', '摩托车',
  '医生', '老师', '警察', '消防员', '厨师',
  '太阳', '月亮', '星星', '云朵', '彩虹',
  '唱歌', '跳舞', '画画', '写字', '看书',
  '睡觉', '吃饭', '喝水', '跑步', '走路',
  '开心', '难过', '生气', '惊讶', '害怕',
  '红色', '蓝色', '绿色', '黄色', '紫色',
  '春天', '夏天', '秋天', '冬天', '雪',
  '雨', '风', '雷', '闪电', '雾',
  '学校', '医院', '超市', '公园', '图书馆',
  '桌子', '椅子', '床', '沙发', '电视',
  '门', '窗', '墙', '地板', '天花板'
];

// 随机打乱数组
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 获取随机词库
function getRandomWords(count = 50) {
  const shuffled = shuffleArray(words);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

module.exports = {
  words,
  getRandomWords
};

