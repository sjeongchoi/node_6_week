const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
});

imageSchema.statics.getImages = function () {
    return this.find({});
}

imageSchema.statics.getImageById = function (id) {
    return this.findById(id);
    // return this.findOne({ _id: ObjectId("5ad0f6758f05a642a76b3a62") })
}

imageSchema.statics.addImage = function (image) {
    return image.save()
}
var Image = module.exports = mongoose.model('Image', imageSchema);
