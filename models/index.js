const mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/first_mongoose_app');
mongoose.Promise = global.Promise;

UsersModel = require('./User');
IdeasModel = require('./Idea');
module.exports = IdeasModel;
module.exports = UsersModel;