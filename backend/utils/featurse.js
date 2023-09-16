class ApiFeatures {
  constructor(qurey, qureystr) {
    this.qurey = qurey;
    this.qureystr = qureystr;
  }

  search() {
    const name = this.qureystr.name ? {
        name:{
            $regex:this.qureystr.name,
            $options:'i',
        },
    } : {}

    console.log(name);

    this.qurey=this.qurey.find({...name})
    return this;
  }

  filter(){
    const qureyCopy={...this.qureystr}
    
    //remove fileds in product
    const removeFileds=['name','page','limit']

    removeFileds.forEach(key=>delete qureyCopy[key])
    // this.qurey=this.qurey.find(qureyCopy)  find cataegry and remove another fileds

    //Filer for price
    let convertStr=JSON.stringify(qureyCopy);
    convertStr=convertStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`) 

    this.qurey=this.qurey.find(JSON.parse(convertStr))
    return this
  }

  pagination(resultPage){

    const currentPage=Number(this.qureystr.page) || 1

    const skip=resultPage*(currentPage-1)   //10*(2-1) 10*1 : 10 product skip and show 2 page

    this.qurey=this.qurey.limit(resultPage).skip(skip)
    return this
  }
}

module.exports = ApiFeatures;
