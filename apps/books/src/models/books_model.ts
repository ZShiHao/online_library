import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import dayjs from "dayjs";
import store from "../services/oss.ts";
interface BookAttrs {
  title: string;
  author?: string;
  date?: number;
  language: string;
  cover: string;
  createDate?: string;
  updateDate?: string;
  tags: string[];
  source: {
    format: string;
    size: string;
    pages: number;
    fileName: string;
    location: string;
  }[];
  active?: boolean;
  download?: number;
}

interface BookDoc extends mongoose.Document, BookAttrs {}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: BookAttrs): BookDoc;
}

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: String,
      default: "",
    },
    date: {
      type: Number,
      default: "",
    },
    language: {
      type: String,
      index: true,
    },
    cover: String,
    createDate: {
      type: String,
      default: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
    updateDate: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      index: true,
    },
    source: {
      type: [
        {
          format: String,
          size: String,
          pages: Number,
          fileName: String,
          location: String,
        },
      ],
    },
    active: {
      type: Boolean,
      default: true,
    },
    download: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        const image_process=ret.source?'w_250':'w_110,h_146'
        ret.id = ret._id;
        ret.cover = store.signatureUrl("imgs/cover/" + ret.cover, {
          expires: process.env.EXPIRES
            ? Number(process.env.EXPIRES)
            : undefined,
            process: `image/resize,${image_process}`,
        });
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

bookSchema.pre("save", async function () {
  this.set("updateDate", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});

bookSchema.pre("updateOne", async function () {
  this.set("updateDate", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};

bookSchema.plugin(mongoosePaginate);

const Book = mongoose.model<BookDoc, mongoose.PaginateModel<BookDoc>>(
  "Book",
  bookSchema,
  "books"
);

export { Book, BookAttrs };
