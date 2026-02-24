const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  id: String,
  name: String,
  storage: String,
  color: String,
  price: Number,
  mrp: Number,
  image: String
});

const EMIPlanSchema = new mongoose.Schema({
  id: String,
  tenure: Number,
  interestRate: Number,
  cashback: Number,
  monthlyAmount: Number
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  image: String,
  description: String,
  variants: [VariantSchema],
  emiPlans: [EMIPlanSchema]
});

module.exports = mongoose.model('Product', ProductSchema);
