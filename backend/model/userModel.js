const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const emailExp = new RegExp(
          "[a-zA-Z0-9]+@[a-zA-Z]+.(com|in|ca|gov)",
          "mi"
        );
        return emailExp.test(value);
      },
    },
  },
  mobile: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
    // validate: {
    //   validator: (value) => value > 0 && value <= 200,
    //   message: (props) =>
    //     `${props.value} should be greater than 0 and less than 200`,
    // },
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.statics.removeById = async function (id) {
  let user = await this.findById(id);
  if (user) {
    let deletedUser = await user.remove();
    return deletedUser;
  }
  return null;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
