import express from "express";
import dotEnv from "dotenv";
import mongoose from "mongoose";
const MONGOOSE_URL =
  "mongodb+srv://backer:TeQpVtG4yT3DAbX0@projectm.fqzmsbf.mongodb.net/";

const URI = process.env.MONGOOSE_URL;
// console.log(process.env.PORT);
mongoose
  .connect(MONGOOSE_URL)
  .then(() => console.log("connection to DB set"))
  .catch((e) => console.log(e));

//   create database
const storeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  materialNo: { type: String, require: true },
  store: { type: String, require: true },
  quantity: { type: Number, require: true, default: 0 },
});

const Store = mongoose.model("StoreModel", storeSchema);

const addNewItem = async ({ name, materialNo, store, quantity }) => {
  const exist = await Store.findOne({ name: name });
  if (exist) {
    console.log("Item already exist");
    return;
  }

  const newItem = await Store({
    name: "Test2",
    materialNo: "123",
    store: "s1",
    quantity: 5,
  });
  newItem.save();
};

const updateStoreItem = async ({ id, quantity }) => {
  try {
    const exist = await Store.findByIdAndUpdate(
      { _id: id },
      { quantity: quantity }
    );
  } catch (error) {
    console.log(error);
  }
};
const deleteStoreItem = async ({ id }) => {
  try {
    const exist = await Store.findByIdAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
};
addNewItem({ name: "test2" });
updateStoreItem({ id: "659684c4894f2772ce2b8b64", quantity: 1 });
const storeDetails = await Store.find();
console.log(storeDetails);
dotEnv.config();
const app = express();
const port = 5000;

app.use("/", () => console.log("hello"));

app.listen(process.env.PORT, () => console.log("server is running"));
