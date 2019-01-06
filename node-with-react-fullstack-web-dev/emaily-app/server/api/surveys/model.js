const mongoose = require('mongoose')
const { Schema } = mongoose

// Recipient Schema
// I do the aux schema inside of the survey model file since it will be used as sub document
// we don't add a new recipient collection
const recipientSchema = new mongoose.Schema({
  email: String,
  responded: { type: Boolean, default: false }
})

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  owned_by: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
})

surveySchema.statics.getUserSurveys = async ({ user }) => {}

mongoose.model('Survey', surveySchema)
