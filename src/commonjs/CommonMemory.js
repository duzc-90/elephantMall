/**
 *
 */
class CommonMemory {
  get category () {
    return this.categorytemp
  }
  set category (category) {
    this.categorytemp = category
  }
  get categoryName () {
    return this.categoryNametemp
  }
  set categoryName (categoryName) {
    this.categoryNametemp = categoryName
  }
  get categoryGoods () {
    return this.categoryGoodstemp
  }
  set categoryGoods (categoryGoods) {
    this.categoryGoodstemp = categoryGoods
  }
}
export default CommonMemory
