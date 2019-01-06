const Mailer = require('mailer')
const db = require('database')
const surveyTemplate = require('mailer/templates/survey')
const Survey = db.model('Survey')

// Gets a list of surveys that belongs to a specific user
// Params
// limit - total of surveys to send back (default 10)
// skip - the current pagination index (default 0)
exports.getSurveyList = async ({ user, limit = 10, skip = 0 }) =>
  console.log('Get user surveys')

// Creates a survey for the current user
exports.createSurvey = async ({
  user,
  title,
  subject,
  body,
  recipients = []
}) => {
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    owned_by: user.id,
    dateSent: Date.now()
  })

  // Send email
  await new Mailer({ survey, content: surveyTemplate(survey) }).send()
  await survey.save()
  user.credits -= 1
  const updatedUser = await user.save()
  return updatedUser
}

// Saves the survey feedback of an user
exports.saveFeedback = async ({ user }) =>
  console.log('save feedback from user')
