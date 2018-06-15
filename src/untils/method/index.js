import data from 'china-area-data';


// export const toData = () => {
//     let arr = [];
//     const province = data["86"];
//     for (const key in province) {
//         if (province.hasOwnProperty(key)) {
//             let provinceTemp = {};
//             const provinceName = province[key];
//             provinceTemp.value = provinceName;
//             provinceTemp.label = provinceName;
//             provinceTemp.children = [];
            
//             const city = data[key];
//             for (const cityKey in city) {
//                 if (city.hasOwnProperty(cityKey)){
//                     let cityTemp = {};
//                     const cityName = city[cityKey];
//                     cityTemp.value = cityName;
//                     cityTemp.label = cityName;
//                     cityTemp.children = [];
//                     provinceTemp.children.push(cityTemp);

//                     const area = data[cityKey];
//                     for (const areaKey in area) {
//                         if (area.hasOwnProperty(areaKey)) {
//                             let areaTemp = {};
//                             const areaName = area[areaKey];
//                             areaTemp.value = areaName;
//                             areaTemp.label = areaName;
//                             cityTemp.children.push(areaTemp)
//                         }
//                     }
//                 }
//             }
//             arr.push(provinceTemp);
//         }
//     }
//     return arr;
// }

// 把数组打成一维
// let _data = { '86': '中国' };
let _data = {};

Object.keys(data).forEach(item => {
    _data = {..._data, ...data[item]};
});

function getAreaData(key) {
    return {
        value: JSON.stringify({key, name: _data[key]}),
        label: _data[key],
        children: data[key] ? Object.keys(data[key]).map(getAreaData) : [],
    };
}

export default getAreaData('86');

// console.log(getList('86'));