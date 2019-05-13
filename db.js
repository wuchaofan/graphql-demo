import mongoose from 'mongoose'
mongoose.connect("mongodb://127.0.0.1:27017/userdata", {useNewUrlParser: true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// 账户的数据库模型
const UserSchema = new mongoose.Schema({
    name:String,
});
const User = mongoose.model('users',UserSchema);

export {
    User
}