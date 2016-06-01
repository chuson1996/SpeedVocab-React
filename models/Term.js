/* eslint-disable new-cap */
import mongoose from 'mongoose';
const termSchema = mongoose.Schema({
	quizletTermId: String,
	// quizletSetId: String,
	note: String
});
export default mongoose.model('Term', termSchema);
