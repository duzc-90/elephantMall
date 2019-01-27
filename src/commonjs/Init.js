import Vue from 'vue'
import CommonMemory from './CommonMemory'
import http from '../util/http'
class Init {
  static init () {
    let commonMemory = new CommonMemory()
    http.get('/getCategory').then(result => {
      if (result.resultCode === result.SUCCESS) {
        commonMemory.category = result.data
        commonMemory.categoryName = result.mapList[0]
      }
    })
    http.get('/getGoodsByCategoryId').then(result => {
      if (result.resultCode === result.SUCCESS) {
        commonMemory.categoryGoods = result.data
      }
    })
    Vue.prototype.commonMemory = commonMemory
  }
}
export default Init
