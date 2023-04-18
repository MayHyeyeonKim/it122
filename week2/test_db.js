import { Maybuck } from "./models/Items.js";

// return all records
Maybuck.find({}).lean()
  .then((items) => {
    console.log(items);
  })
  .catch(err => next(err));

// // return all records that match a condition
// Book.find({"author": "Smith" }).lean()
//   .then((items) => {
//     console.log(book);
//   })
//   .catch(err => next(err));

// // return a single record
// Book.findOne({"title": "Dune" }).lean()
//   .then((book) => {
//       console.log(book);;
//   })
//   .catch(err => next(err));

// // insert or update a single record
// const newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
// Book.updateOne({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
//   if (err) return next(err);
//   console.log(result);
//   // other code here
// });