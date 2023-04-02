module.exports = {
    multiploMongooseToObject : function (mogooseArrays){
        return mogooseArrays = mogooseArrays.map(mogooseArrays> mogooseArrays.toObject())
    }
}