
var mongoose = require('mongoose')
const ideaSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    details :{
        type : String,
        require : true
    },
    
    userID : {
        type : String,
        required: true
    },
    date : {
        type: Date,
        default : Date.now

    },
});

var IdeaModel = mongoose.model('Ideas',ideaSchema)

module.exports = IdeaModel;
