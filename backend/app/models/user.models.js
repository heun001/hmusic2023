const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "username is required"],
        },
        avatar_Url: {
            type: String,
            default: 'http://localhost:8088/api/image/meo.jpg'
        },
        email: {
            type: String,
            trim: true,
            lowercas: true,
        },

        password: String,
        name: String,
        introduce: String,

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role"
        },
        ban: Boolean,
    },

    {
        timestamps: true,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("user", schema);