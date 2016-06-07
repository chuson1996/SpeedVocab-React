/* eslint-disable new-cap */
import mongoose from 'mongoose';
const termSchema = mongoose.Schema({
	quizletTermId: String,
	setId: String,
	imageSrc: String
});
export default mongoose.model('Term', termSchema);
