const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Database connection is established successfully.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

// Schema Validation
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
});

// Create a model using the schema and export
const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 15.99,
});

book1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

/*
// Validation for Update

Book.findByIdAndUpdate("// id", { //update condition }, { runValidators: true })
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

  */
