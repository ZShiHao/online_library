import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import dayjs from "dayjs";
interface TagsAttrs {
  name:string;
  tags:string[],
  sort?:number,
  createDate?: string;
  updateDate?: string;
  active?: boolean;
}

interface TagDoc extends mongoose.Document, TagsAttrs {}

interface TagModel extends mongoose.Model<TagDoc> {
  build(attrs: TagsAttrs): TagDoc;
}

const tagSchema = new mongoose.Schema({
  name:String,
  tags:Array,
  sort:{
    type:Number,
    require:true
  },
  createDate: {
    type: String,
    default: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  },
  updateDate: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
}
);

tagSchema.pre("save", async function () {
  this.set("updateDate", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});

tagSchema.pre("updateOne", async function () {
  this.set("updateDate", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});

tagSchema.pre("updateMany", async function () {
  this.set("updateDate", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});

tagSchema.statics.build = (attrs: TagsAttrs) => {
  return new Tag(attrs);
};

tagSchema.plugin(mongoosePaginate)

const Tag = mongoose.model<TagDoc, mongoose.PaginateModel<TagDoc>>("Tag", tagSchema,'tags');

export { Tag, TagsAttrs };