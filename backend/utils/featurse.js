class ApiFeatures {
  constructor(qurey, qureystr) {
    this.qurey = qurey;
    this.qureystr = qureystr;
  }

  search() {
    const keyword = this.qureystr.keyword ? {
        name:{
            $regex:this.qureystr.keyword,
            $options:'i',
        },
    } : {}

    this.qurey=this.qurey.find({...keyword})
    return this;
  }

  filter(){
    const qureyCopy={...this.qureystr}
    
    //remove fileds in product
    const removeFileds=['name','page','limit']

    removeFileds.forEach(key=>delete qureyCopy[key])

    this.qurey=this.qurey.find(qureyCopy)
    return this
  }
}

module.exports = ApiFeatures;
