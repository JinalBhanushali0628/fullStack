class APIFeature {

    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }
    
    search(){
        const keyword = this.querystr.keyword ? {
            name : {
                $regex : this.querystr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword);

        this.query = this.query.find({...keyword})
        return this
    }

    filter(){

        const queryCopy = { ...this.querystr }
        console.log(queryCopy);
        //Removing fields from query
        const removeField = ['keyword','limit','page'];
        removeField.forEach(element => delete queryCopy[element]);
        
        //advance filter for price, rating etc
        let querystrSet = JSON.stringify(queryCopy)
        querystrSet = querystrSet.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        console.log(querystrSet);
        this.query= this.query.find(JSON.parse(querystrSet));

        return this;

    }

    pagination(productPerPage)
    {
        const currentPage = Number(this.query.page) || 1
        const skipProduct = productPerPage * (currentPage -1 )
        this.query = this.query.limit(productPerPage).skip(skipProduct)
        return this
    }
    
}

module.exports = APIFeature;