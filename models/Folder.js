/* eslint-disable new-cap */
import mongoose from 'mongoose';
const folderSchema = mongoose.Schema({
    userId: String,
    name: {
        type: String,
        required: true,
        trim: false
    },
    fromLang: {
        type: String,
        required: true,
        trim: true
    },
    toLang: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});
export default mongoose.model('Folder', folderSchema);
