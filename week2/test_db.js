import { Maybuck } from "./models/Items.js";

// return all records
Maybuck.find({}).lean()
  .then((items) => {
    console.log(items);
  })
  .catch(err => next(err));