import mongoose from "mongoose";
import { Password } from "../services/password.ts";
import store from "../services/oss.ts";
interface UserAttrs {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

interface UserDoc extends mongoose.Document, UserAttrs {}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.avatar=store.signatureUrl(ret.avatar,{expires:process.env.EXPIRES?Number(process.env.EXPIRES):undefined})
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
