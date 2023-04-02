// -- Start of Constance Definition --
const API_ENDPOINT = "https://www.jma.go.jp/bosai/forecast/data/forecast/"
const columns = ["エリア", "今日の予報", "明日の予報"]
// -- End of Constance Definition --

// -- Start of Initialization --
// Grid用のDOM生成
const gridDom = document.createElement("div")
gridDom.id = "wrapper"
document.body.appendChild(gridDom)

// Gridの初期化
const grid = new gridjs.Grid({
  columns: columns,
  data: []
}).render(document.getElementById("wrapper"));
// -- End of Initialization --

// -- Start of EventHandler --
function OnSearch(){
  // 検索キーワード取得
  const keyword = document.getElementById("keyword").value

  // 条件未指定の場合
  if(keyword == null || keyword == "")
  {
    window.alert("検索条件を指定してください。")
    return
  }
  
  // APIリクエストURL作成
  const reqUrl = API_ENDPOINT + keyword + ".json"
  const config = {
    headers:{
      "Access-Control-Allow-Origin" : "*"
    }
  }

  // API call
  fetch(reqUrl)
  .then((response)=>{
    return response.json()
  })
  .then((weatherRes)=>{
    // データ取得
    const weatherData = weatherRes[0].timeSeries[0].areas
    
    // Grid更新
    updateGrid(weatherData)
  })
}
// -- End of EventHandler --

// -- Start of local functions --
// Gridデータ更新
function updateGrid(weatherData){
  // 出力データ編集
  let dispData = []
  for(let i = 0; i < weatherData.length; i++)
  {
    const data = [weatherData[i].area.name, weatherData[i].weathers[0], weatherData[i].weathers[1]]
    dispData.push(data)
  }

  // Grid更新
  grid.updateConfig({
    data: dispData
  }).forceRender();
}
// -- End of local functions --
