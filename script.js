// 使用Open-Meteo免費API，不需要API密鑰
const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';

// 省名到省會城市的映射
const PROVINCE_TO_CAPITAL = {
    '山東': '濟南',
    '浙江': '杭州',
    '江蘇': '南京',
    '廣東': '廣州',
    '四川': '成都',
    '河北': '石家莊',
    '山西': '太原',
    '遼寧': '瀋陽',
    '吉林': '長春',
    '黑龍江': '哈爾濱',
    '安徽': '合肥',
    '福建': '福州',
    '江西': '南昌',
    '河南': '鄭州',
    '湖北': '武漢',
    '湖南': '長沙',
    '陝西': '西安',
    '甘肅': '蘭州',
    '青海': '西寧',
    '寧夏': '銀川',
    '新疆': '烏魯木齊',
    '雲南': '昆明',
    '貴州': '貴陽',
    '西藏': '拉薩',
    '海南': '海口',
    '廣西': '南寧',
    '內蒙古': '呼和浩特',
    '台灣': '台北',
    '香港': '香港',
    '澳門': '澳門'
};

// 全球主要城市坐標數據
const CITIES = {
    asia: {
        '香港': { lat: 22.3193, lon: 114.1694 },
        '澳門': { lat: 22.1987, lon: 113.5439 },
        '台北': { lat: 25.0330, lon: 121.5654 },
        '廣州': { lat: 23.1291, lon: 113.2644 },
        '深圳': { lat: 22.5431, lon: 114.0579 },
        '上海': { lat: 31.2304, lon: 121.4737 },
        '北京': { lat: 39.9042, lon: 116.4074 },
        '新加坡': { lat: 1.3521, lon: 103.8198 },
        '吉隆坡': { lat: 3.1390, lon: 101.6869 },
        '曼谷': { lat: 13.7563, lon: 100.5018 },
        '胡志明市': { lat: 10.8231, lon: 106.6297 }
    },
    china: {
        // 直轄市
        '北京': { lat: 39.9042, lon: 116.4074 },
        '上海': { lat: 31.2304, lon: 121.4737 },
        '天津': { lat: 39.3434, lon: 117.3616 },
        '重慶': { lat: 29.4316, lon: 106.9123 },
        
        // 浙江省
        '杭州': { lat: 30.2741, lon: 120.1551 },
        '寧波': { lat: 29.8683, lon: 121.5440 },
        '溫州': { lat: 27.9944, lon: 120.6986 },
        '嘉興': { lat: 30.7527, lon: 120.7500 },
        '湖州': { lat: 30.8703, lon: 120.0933 },
        '紹興': { lat: 30.0023, lon: 120.5810 },
        '金華': { lat: 29.1028, lon: 119.6474 },
        '衢州': { lat: 28.9700, lon: 118.8750 },
        '舟山': { lat: 30.0360, lon: 122.2070 },
        '台州': { lat: 28.6129, lon: 121.4280 },
        '麗水': { lat: 28.4517, lon: 119.9219 },
        
        // 山東省
        '濟南': { lat: 36.6512, lon: 117.1201 },
        '青島': { lat: 36.0671, lon: 120.3826 },
        '淄博': { lat: 36.8135, lon: 118.0554 },
        '棗莊': { lat: 34.8107, lon: 117.3229 },
        '東營': { lat: 37.4339, lon: 118.6751 },
        '煙台': { lat: 37.4638, lon: 121.4478 },
        '濰坊': { lat: 36.7069, lon: 119.1019 },
        '濟寧': { lat: 35.4154, lon: 116.5874 },
        '泰安': { lat: 36.1943, lon: 117.0896 },
        '威海': { lat: 37.5128, lon: 122.1201 },
        '日照': { lat: 35.4164, lon: 119.5269 },
        '臨沂': { lat: 35.1040, lon: 118.3560 },
        '德州': { lat: 37.4513, lon: 116.3574 },
        '聊城': { lat: 36.4560, lon: 115.9851 },
        '濱州': { lat: 37.3835, lon: 117.9707 },
        '菏澤': { lat: 35.2331, lon: 115.4697 },
        
        // 江蘇省
        '南京': { lat: 32.0603, lon: 118.7969 },
        '無錫': { lat: 31.4912, lon: 120.3119 },
        '徐州': { lat: 34.2058, lon: 117.2840 },
        '常州': { lat: 31.7719, lon: 119.9464 },
        '蘇州': { lat: 31.2989, lon: 120.5853 },
        '南通': { lat: 32.0146, lon: 120.8644 },
        '連雲港': { lat: 34.5960, lon: 119.1788 },
        '淮安': { lat: 33.5975, lon: 119.0153 },
        '鹽城': { lat: 33.3775, lon: 120.1633 },
        '揚州': { lat: 32.3932, lon: 119.4215 },
        '鎮江': { lat: 32.2044, lon: 119.4520 },
        '泰州': { lat: 32.4849, lon: 119.9153 },
        '宿遷': { lat: 33.9630, lon: 118.2755 },
        '新沂': { lat: 34.3697, lon: 118.3523 },
        
        // 廣東省
        '廣州': { lat: 23.1291, lon: 113.2644 },
        '深圳': { lat: 22.5431, lon: 114.0579 },
        '珠海': { lat: 22.2708, lon: 113.5766 },
        '汕頭': { lat: 23.3540, lon: 116.6822 },
        '佛山': { lat: 23.0219, lon: 113.1219 },
        '韶關': { lat: 24.8018, lon: 113.5918 },
        '湛江': { lat: 21.2742, lon: 110.3594 },
        '肇慶': { lat: 23.0515, lon: 112.4658 },
        '江門': { lat: 22.5751, lon: 113.0946 },
        '茂名': { lat: 21.6682, lon: 110.9255 },
        '惠州': { lat: 23.0793, lon: 114.4165 },
        '梅州': { lat: 24.2993, lon: 116.1255 },
        '汕尾': { lat: 22.7861, lon: 115.3647 },
        '河源': { lat: 23.7461, lon: 114.6975 },
        '陽江': { lat: 21.8579, lon: 111.9828 },
        '清遠': { lat: 23.6817, lon: 113.0514 },
        '東莞': { lat: 23.0489, lon: 113.7447 },
        '中山': { lat: 22.5159, lon: 113.3929 },
        '潮州': { lat: 23.6618, lon: 116.6307 },
        '揭陽': { lat: 23.5479, lon: 116.3554 },
        '雲浮': { lat: 22.9292, lon: 112.0446 },
        
        // 四川省
        '成都': { lat: 30.6624, lon: 104.0633 },
        '自貢': { lat: 29.3528, lon: 104.7770 },
        '攀枝花': { lat: 26.5804, lon: 101.7184 },
        '瀘州': { lat: 28.8719, lon: 105.4433 },
        '德陽': { lat: 31.1270, lon: 104.3979 },
        '綿陽': { lat: 31.4678, lon: 104.6794 },
        '廣元': { lat: 32.4353, lon: 105.8434 },
        '遂寧': { lat: 30.5132, lon: 105.5711 },
        '內江': { lat: 29.5805, lon: 105.0582 },
        '樂山': { lat: 29.5677, lon: 103.7613 },
        '南充': { lat: 30.7953, lon: 106.0647 },
        '眉山': { lat: 30.0480, lon: 103.8319 },
        '宜賓': { lat: 28.7602, lon: 104.6308 },
        '廣安': { lat: 30.4564, lon: 106.6333 },
        '達州': { lat: 31.2092, lon: 107.5023 },
        '雅安': { lat: 29.9977, lon: 103.0135 },
        '巴中': { lat: 31.8691, lon: 106.7536 },
        '資陽': { lat: 30.1292, lon: 104.6417 },
        
        // 其他省份主要城市
        '武漢': { lat: 30.5928, lon: 114.3055 },
        '長沙': { lat: 28.2282, lon: 112.9388 },
        '南昌': { lat: 28.6829, lon: 115.8579 },
        '合肥': { lat: 31.8206, lon: 117.2272 },
        '福州': { lat: 26.0745, lon: 119.2965 },
        '鄭州': { lat: 34.7466, lon: 113.6254 },
        '石家莊': { lat: 38.0428, lon: 114.5149 },
        '太原': { lat: 37.8706, lon: 112.5489 },
        '西安': { lat: 34.3416, lon: 108.9398 },
        '蘭州': { lat: 36.0611, lon: 103.8343 },
        '西寧': { lat: 36.6171, lon: 101.7782 },
        '銀川': { lat: 38.4872, lon: 106.2309 },
        '烏魯木齊': { lat: 43.8256, lon: 87.6168 },
        '昆明': { lat: 25.0389, lon: 102.7183 },
        '貴陽': { lat: 26.6477, lon: 106.6302 },
        '拉薩': { lat: 29.6520, lon: 91.1721 },
        '海口': { lat: 20.0458, lon: 110.3417 },
        '三亞': { lat: 18.2528, lon: 109.5122 },
        '南寧': { lat: 22.8174, lon: 108.3669 },
        '哈爾濱': { lat: 45.8038, lon: 126.5349 },
        '長春': { lat: 43.8171, lon: 125.3235 },
        '瀋陽': { lat: 41.8057, lon: 123.4315 },
        '大連': { lat: 38.9140, lon: 121.6147 },
        '呼和浩特': { lat: 40.8418, lon: 111.7518 }
    },
    japan: {
        '東京': { lat: 35.6762, lon: 139.6503 },
        '大阪': { lat: 34.6937, lon: 135.5023 },
        '京都': { lat: 35.0116, lon: 135.7681 },
        '福岡': { lat: 33.5904, lon: 130.4017 },
        '名古屋': { lat: 35.1815, lon: 136.9066 },
        '札幌': { lat: 43.0642, lon: 141.3469 },
        '仙台': { lat: 38.2682, lon: 140.8694 },
        '廣島': { lat: 34.3853, lon: 132.4553 },
        '沖繩': { lat: 26.2124, lon: 127.6792 },
        '金澤': { lat: 36.5613, lon: 136.6562 },
        '奈良': { lat: 34.6851, lon: 135.8048 },
        '橫濱': { lat: 35.4437, lon: 139.6380 },
        
        // JAL航線擴展城市
        '秋田': { lat: 39.7186, lon: 140.1024 },
        '青森': { lat: 40.8244, lon: 140.7400 },
        '旭川': { lat: 43.7711, lon: 142.3649 },
        '函館': { lat: 41.7740, lon: 140.7267 },
        '花卷': { lat: 39.3889, lon: 141.1133 },
        '出雲': { lat: 35.3668, lon: 132.7551 },
        '鹿兒島': { lat: 31.5602, lon: 130.5581 },
        '北九州': { lat: 33.8834, lon: 130.8751 },
        '高知': { lat: 33.5597, lon: 133.5311 },
        '小松': { lat: 36.4008, lon: 136.4486 },
        '熊本': { lat: 32.7898, lon: 130.7417 },
        '釧路': { lat: 42.9849, lon: 144.3820 },
        '松山': { lat: 33.8416, lon: 132.7658 },
        '三澤': { lat: 40.7033, lon: 141.3683 },
        '宮崎': { lat: 31.9077, lon: 131.4202 },
        '長崎': { lat: 32.7503, lon: 129.8779 },
        '新潟': { lat: 37.9161, lon: 139.0364 },
        '帶廣': { lat: 42.9236, lon: 143.2061 },
        '大分': { lat: 33.2382, lon: 131.6126 },
        '岡山': { lat: 34.6551, lon: 133.9195 },
        '網走': { lat: 44.0206, lon: 144.2740 },
        '白濱': { lat: 33.6909, lon: 135.3640 },
        '高松': { lat: 34.3402, lon: 134.0434 },
        '德島': { lat: 34.0658, lon: 134.5592 },
        '奄美大島': { lat: 28.3772, lon: 129.4927 },
        '德之島': { lat: 27.8364, lon: 128.8814 },
        '石垣島': { lat: 24.3448, lon: 124.1571 },
        '宮古島': { lat: 24.8050, lon: 125.2819 },
        '久米島': { lat: 26.3487, lon: 126.8066 },
        '與論島': { lat: 27.0446, lon: 128.4017 },
        '屋久島': { lat: 30.3321, lon: 130.5158 }
    },
    global: {
        '香港': { lat: 22.3193, lon: 114.1694 },
        '東京': { lat: 35.6762, lon: 139.6503 },
        '大阪': { lat: 34.6937, lon: 135.5023 },
        '首爾': { lat: 37.5665, lon: 126.9780 },
        '釜山': { lat: 35.1796, lon: 129.0756 },
        '台北': { lat: 25.0330, lon: 121.5654 },
        '新加坡': { lat: 1.3521, lon: 103.8198 },
        '吉隆坡': { lat: 3.1390, lon: 101.6869 },
        '雅加達': { lat: -6.2088, lon: 106.8456 },
        '馬尼拉': { lat: 14.5995, lon: 120.9842 },
        '曼谷': { lat: 13.7563, lon: 100.5018 },
        '胡志明市': { lat: 10.8231, lon: 106.6297 },
        '雪梨': { lat: -33.8688, lon: 151.2093 },
        '墨爾本': { lat: -37.8136, lon: 144.9631 },
        '奧克蘭': { lat: -36.8485, lon: 174.7633 },
        '洛杉磯': { lat: 34.0522, lon: -118.2437 },
        '舊金山': { lat: 37.7749, lon: -122.4194 },
        '夏威夷': { lat: 21.3099, lon: -157.8581 },
        '倫敦': { lat: 51.5074, lon: -0.1278 },
        '巴黎': { lat: 48.8566, lon: 2.3522 },
        '羅馬': { lat: 41.9028, lon: 12.4964 }
    }
};

// 天氣圖標映射
const WEATHER_ICONS = {
    'clear': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '⛅',
    'broken clouds': '☁️',
    'overcast clouds': '☁️',
    'light rain': '🌦️',
    'moderate rain': '🌧️',
    'heavy rain': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
    'fog': '🌫️'
};

// Open-Meteo天氣代碼映射
const WEATHER_CODES = {
    0: { description: '晴天', icon: '☀️', clear: true },
    1: { description: '基本晴朗', icon: '🌤️', clear: true },
    2: { description: '局部多雲', icon: '⛅', clear: true }, // 適合拍攝
    3: { description: '部分多雲', icon: '☁️', clear: true }, // 適合拍攝
    45: { description: '霧', icon: '🌫️', clear: false },
    48: { description: '冰霧', icon: '🌫️', clear: false },
    51: { description: '小雨', icon: '🌦️', clear: false },
    53: { description: '中雨', icon: '🌧️', clear: false },
    55: { description: '大雨', icon: '⛈️', clear: false },
    61: { description: '小雨', icon: '🌦️', clear: false },
    63: { description: '中雨', icon: '🌧️', clear: false },
    65: { description: '大雨', icon: '⛈️', clear: false },
    71: { description: '小雪', icon: '🌨️', clear: false },
    73: { description: '中雪', icon: '❄️', clear: false },
    75: { description: '大雪', icon: '❄️', clear: false },
    80: { description: '陣雨', icon: '🌦️', clear: false },
    81: { description: '強陣雨', icon: '🌧️', clear: false },
    82: { description: '暴雨', icon: '⛈️', clear: false },
    95: { description: '雷陣雨', icon: '⛈️', clear: false },
    96: { description: '雷陣雨伴冰雹', icon: '⛈️', clear: false },
    99: { description: '強雷陣雨伴冰雹', icon: '⛈️', clear: false }
};

// 根據天氣代碼獲取天氣信息
function getWeatherInfo(weatherCode) {
    return WEATHER_CODES[weatherCode] || { description: '未知', icon: '🌤️', clear: false };
}

// 獲取Open-Meteo天氣預報數據
async function getForecastData(cityName, lat, lon, days = 5) {
    try {
        // Open-Meteo支持16天預報，且完全免費
        const maxDays = Math.min(days, 16);
        const url = `${WEATHER_API_BASE}?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=${maxDays}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Open-Meteo API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 轉換為統一格式
        const forecastList = [];
        for (let i = 0; i < data.daily.time.length; i++) {
            const date = new Date(data.daily.time[i]);
            const weatherCode = data.daily.weathercode[i];
            const weatherInfo = getWeatherInfo(weatherCode);
            
            forecastList.push({
                dt: Math.floor(date.getTime() / 1000),
                dt_txt: data.daily.time[i] + ' 12:00:00',
                main: {
                    temp: Math.round((data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2),
                    temp_max: Math.round(data.daily.temperature_2m_max[i]),
                    temp_min: Math.round(data.daily.temperature_2m_min[i])
                },
                weather: [{
                    main: weatherInfo.clear ? 'Clear' : 'Clouds',
                    description: weatherInfo.description,
                    icon: weatherInfo.icon,
                    weathercode: weatherCode
                }]
            });
        }
        
        return {
            city: { name: cityName, coord: { lat, lon } },
            cnt: forecastList.length,
            list: forecastList
        };
    } catch (error) {
        console.warn(`Failed to get forecast for ${cityName}:`, error);
        // 如果API失败，返回空结果
        return {
            city: { name: cityName, coord: { lat, lon } },
            cnt: 0,
            list: []
        };
    }
}

// 計算兩點間距離（使用Haversine公式）
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径（公里）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// 估算旅行时间
function estimateTravelTime(distance) {
    if (distance < 100) {
        return `${Math.round(distance / 60 * 60)}小时 (驾车)`;
    } else if (distance < 500) {
        return `${Math.round(distance / 80 * 60)}分钟 (高速)`;
    } else if (distance < 1000) {
        return `${Math.round(distance / 250 * 60)}分钟 (高铁) 或 ${Math.round(distance / 80)}小时 (驾车)`;
    } else {
        return `${Math.round(distance / 800 * 60)}分钟 (飞机) 或 ${Math.round(distance / 80)}小时 (驾车)`;
    }
}

// 判断是否为晴天（适配Open-Meteo数据）
function isSunnyWeather(weather) {
    // 如果有weathercode，使用Open-Meteo的数据
    if (weather.weathercode !== undefined) {
        const weatherInfo = getWeatherInfo(weather.weathercode);
        return weatherInfo.clear;
    }
    // 兼容旧格式
    const sunnyConditions = ['clear', 'few clouds', '晴天', '基本晴朗'];
    const description = weather.description.toLowerCase();
    return sunnyConditions.some(condition => description.includes(condition));
}

// 获取天气图标（适配Open-Meteo数据）
function getWeatherIcon(weather) {
    // 如果有weathercode，使用Open-Meteo的数据
    if (weather.weathercode !== undefined) {
        const weatherInfo = getWeatherInfo(weather.weathercode);
        return weatherInfo.icon;
    }
    // 兼容旧格式，使用icon字段
    if (weather.icon && typeof weather.icon === 'string' && weather.icon.length > 1) {
        return weather.icon;
    }
    // 默认图标
    const description = weather.description.toLowerCase();
    return WEATHER_ICONS[description] || '🌤️';
}

// 创建城市卡片（多天天气预报）
function createCityCard(forecastData, currentLocation, distance, travelTime) {
    const cityName = forecastData.city.name;
    const forecasts = forecastData.list;
    
    // 统计晴天数
    let sunnyDays = 0;
    forecasts.forEach(forecast => {
        if (isSunnyWeather(forecast.weather[0])) {
            sunnyDays++;
        }
    });
    
    const hasSunnyDays = sunnyDays > 0;
    
    // 创建每日天气预报
    const dailyWeatherHtml = forecasts.map((forecast, index) => {
        const date = new Date(forecast.dt * 1000);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        const dayName = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
        const weather = forecast.weather[0];
        const icon = getWeatherIcon(weather);
        const temp = Math.round(forecast.main.temp);
        const isSunny = isSunnyWeather(weather);
        
        return `
            <div class="daily-forecast ${isSunny ? 'sunny-day' : ''}">
                <div class="forecast-date">${dateStr} ${dayName}</div>
                <div class="forecast-weather">
                    <span class="forecast-icon">${icon}</span>
                    <span class="forecast-temp">${temp}°C</span>
                </div>
                <div class="forecast-desc">${weather.description}</div>
                ${isSunny ? '<span class="sunny-tag">☀️</span>' : ''}
            </div>
        `;
    }).join('');
    
    return `
        <div class="city-card ${hasSunnyDays ? 'sunny-highlight' : ''}">
            <div class="city-name">${cityName}</div>
            <div class="sunny-summary">
                ${hasSunnyDays ? `🌞 未來${forecasts.length}天有${sunnyDays}個晴天` : `☁️ 未來${forecasts.length}天無晴天`}
            </div>
            <div class="forecast-container">
                ${dailyWeatherHtml}
            </div>
            <div class="travel-info">
                <div class="distance">📍 距離: ${Math.round(distance)}公里</div>
                <div class="duration">⏱️ 預計用時: ${travelTime}</div>
                ${hasSunnyDays ? '<div style="color: #f39c12; font-weight: bold;">✨ 適合拍攝安排！</div>' : ''}
            </div>
        </div>
    `;
}

// 显示错误信息
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = `<div class="error">${message}</div>`;
    setTimeout(() => {
        errorDiv.innerHTML = '';
    }, 5000);
}

// 主搜索函数
async function searchSunnyCities() {
    const currentLocationInput = document.getElementById('current-location').value.trim();
    const searchRadius = document.getElementById('search-radius').value;
    const daysAhead = parseInt(document.getElementById('days-ahead').value);
    
    if (!currentLocationInput) {
        showError('請輸入您的當前位置');
        return;
    }
    
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const searchBtn = document.getElementById('search-btn');
    
    // 显示加载状态
    loadingDiv.style.display = 'block';
    resultsDiv.innerHTML = '';
    searchBtn.disabled = true;
    
    try {
        // 获取当前位置坐标（支持省名识别）
        let currentLocation = null;
        let actualLocationName = currentLocationInput;
        
        // 首先检查是否是省名，如果是则转换为省会城市
        if (PROVINCE_TO_CAPITAL[currentLocationInput]) {
            actualLocationName = PROVINCE_TO_CAPITAL[currentLocationInput];
            console.log(`省名"${currentLocationInput}"已轉換為省會城市"${actualLocationName}"`);
        }
        
        // 在城市数据库中查找位置
        for (const regionKey of Object.keys(CITIES)) {
            if (CITIES[regionKey][actualLocationName]) {
                currentLocation = CITIES[regionKey][actualLocationName];
                break;
            }
        }
        
        if (!currentLocation) {
            // 提供更友好的错误信息
            if (PROVINCE_TO_CAPITAL[currentLocationInput]) {
                throw new Error(`省會城市"${actualLocationName}"暫不在支持清單中，請嘗試輸入其他城市`);
            } else {
                throw new Error(`未找到"${currentLocationInput}"，請檢查城市名稱或嘗試輸入省名（如：山東、浙江）`);
            }
        }
        
        // 获取所有城市的天气数据
        const cityList = CITIES[searchRadius];
        const weatherPromises = Object.entries(cityList).map(async ([cityName, coords]) => {
            const forecastData = await getForecastData(cityName, coords.lat, coords.lon, daysAhead);
            const distance = calculateDistance(
                currentLocation.lat, currentLocation.lon,
                coords.lat, coords.lon
            );
            const travelTime = estimateTravelTime(distance);
            
            // 检查是否有晴天
            let hasSunnyDays = false;
            forecastData.list.forEach(forecast => {
                if (isSunnyWeather(forecast.weather[0])) {
                    hasSunnyDays = true;
                }
            });
            
            return {
                forecastData,
                distance,
                travelTime,
                hasSunnyDays
            };
        });
        
        const results = await Promise.all(weatherPromises);
        
        // 按距離排序所有結果
        const allCities = results.sort((a, b) => a.distance - b.distance);
        
        // 分类城市
        const sunnyCities = allCities.filter(city => city.hasSunnyDays);
        const cloudyCities = allCities.filter(city => !city.hasSunnyDays);
        
        // 显示结果 - 总是显示所有城市
        let resultsHtml = '';
        
        if (sunnyCities.length > 0) {
            resultsHtml += `
                <div style="grid-column: 1/-1; text-align: center; margin-bottom: 20px;">
                    <h3 style="color: #00b894;">🌞 適合拍攝的晴天城市 (${sunnyCities.length}個)</h3>
                </div>
                ${sunnyCities.map(city => 
                    createCityCard(city.forecastData, currentLocationInput, city.distance, city.travelTime)
                ).join('')}
            `;
        }
        
        // 检查是否显示所有城市
        const showAllCities = document.getElementById('show-all-cities').checked;
        
        if (cloudyCities.length > 0) {
            const displayCount = showAllCities ? cloudyCities.length : Math.min(cloudyCities.length, 12);
            resultsHtml += `
                <div style="grid-column: 1/-1; text-align: center; margin: 30px 0 20px 0;">
                    <h3 style="color: #8b755d;">☁️ 其他城市天氣參考 ${showAllCities ? `(全部${cloudyCities.length}個)` : `(顯示最近${displayCount}個)`}</h3>
                    <p style="color: #8b755d; font-size: 0.9em;">雖然不是晴天，但也可以考慮不同的拍攝風格</p>
                </div>
                ${cloudyCities.slice(0, displayCount).map(city => 
                    createCityCard(city.forecastData, currentLocationInput, city.distance, city.travelTime)
                ).join('')}
            `;
        }
        
        if (sunnyCities.length === 0 && cloudyCities.length === 0) {
            resultsHtml = `
                <div style="text-align: center; padding: 40px; color: #636e72;">
                    <h3>😔 暫無天氣數據</h3>
                    <p>無法獲取天氣信息，請稍後重試</p>
                </div>
            `;
        }
        
        resultsDiv.innerHTML = resultsHtml;
        
    } catch (error) {
        showError(error.message || '搜索過程中發生錯誤，請稍後重試');
        console.error('Search error:', error);
    } finally {
        loadingDiv.style.display = 'none';
        searchBtn.disabled = false;
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加回车键支持
    document.getElementById('current-location').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchSunnyCities();
        }
    });
});