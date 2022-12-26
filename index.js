const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({title:"Limonade", level: "Easy Peasy", ingredients:["lemon", "water", "sugar"], cuisine: "refreshment", dishType: "drink", image: "https://www.pequerecetas.com/wp-content/uploads/2021/05/limonada-como-se-hace.jpg", duration: 15, creator: "la sed"})
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(() => {
    console.log ('No more Carrot Cake')
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
