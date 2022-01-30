const mongoose = require("mongoose");
const Joi = require("joi");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

function validate(user) {
  console.log("ccccccc", user);
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  console.log(schema.validate(user));
  return schema.validate(user);
}

module.exports = { User, validate };
