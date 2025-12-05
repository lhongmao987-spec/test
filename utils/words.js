// 词库数据 - 按分类组织
const wordCategories = {
  '交通工具': [
    '汽车', '飞机', '火车', '自行车', '摩托车', '公交车', '地铁', '出租车',
    '轮船', '直升机', '电动车', '滑板车', '三轮车', '卡车', '救护车', '消防车'
  ],
  '食物': [
    '小龙虾', '火锅', '烧烤', '奶茶', '冰淇淋', '蛋糕', '披萨', '汉堡',
    '寿司', '拉面', '饺子', '包子', '馒头', '油条', '豆浆', '咖啡',
    '苹果', '香蕉', '西瓜', '草莓', '葡萄', '橙子', '芒果', '榴莲'
  ],
  '动物': [
    '猫', '狗', '兔子', '熊猫', '老虎', '狮子', '大象', '长颈鹿',
    '猴子', '企鹅', '海豚', '鲸鱼', '鲨鱼', '蝴蝶', '蜜蜂', '蚂蚁',
    '鸟', '鸡', '鸭', '鹅', '猪', '牛', '羊', '马'
  ],
  '职业': [
    '医生', '老师', '警察', '消防员', '厨师', '护士', '律师', '工程师',
    '设计师', '程序员', '记者', '演员', '歌手', '画家', '司机', '售货员'
  ],
  '运动': [
    '篮球', '足球', '乒乓球', '游泳', '跑步', '羽毛球', '网球', '排球',
    '滑雪', '滑冰', '瑜伽', '健身', '爬山', '骑行', '跳绳', '跳舞'
  ],
  '日常用品': [
    '手机', '电脑', '键盘', '鼠标', '耳机', '电视', '冰箱', '洗衣机',
    '桌子', '椅子', '床', '沙发', '台灯', '镜子', '牙刷', '毛巾'
  ],
  '自然': [
    '太阳', '月亮', '星星', '云朵', '彩虹', '雨', '风', '雷',
    '闪电', '雾', '雪', '春天', '夏天', '秋天', '冬天', '花'
  ],
  '地点': [
    '学校', '医院', '超市', '公园', '图书馆', '电影院', '餐厅', '酒店',
    '机场', '车站', '银行', '邮局', '博物馆', '游乐园', '海滩', '山上'
  ]
};

// 获取所有分类
function getCategories() {
  return Object.keys(wordCategories);
}

// 获取指定分类的词库
function getWordsByCategory(category) {
  return wordCategories[category] || [];
}

// 获取所有词库（合并所有分类）
function getAllWords() {
  let allWords = [];
  Object.keys(wordCategories).forEach(category => {
    allWords = allWords.concat(wordCategories[category]);
  });
  return allWords;
}

// 随机打乱数组
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 获取随机词库（支持分类）
function getRandomWords(count = 50, category = null) {
  let words = [];
  if (category && wordCategories[category]) {
    words = wordCategories[category];
  } else {
    words = getAllWords();
  }
  const shuffled = shuffleArray(words);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

module.exports = {
  wordCategories,
  getCategories,
  getWordsByCategory,
  getAllWords,
  getRandomWords
};

