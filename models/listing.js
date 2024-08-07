const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Review = require("./review");

let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://source.unsplash.com/user/erondu/1000x1000",
        set: (v) => v === "" ? "https://source.unsplash.com/user/erondu/1000x1000" : v
    },
    price: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owners: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

listingSchema.post("findOneAndDelete", async (data) => {
    if (data) {
        await Review.deleteMany({ _id: { $in: data.reviews } })
    }
});

let Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;