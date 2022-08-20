const express = require('express')
const axios = require('axios')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const response = await axios.get('https://sueldos-tech-chile-2022.herokuapp.com/v2/answers')
    const answers = response.data
    const metadataKeys = [
      'Submission ID',
      'Respondent ID',
      'Submitted at'
    ]

    const newResponse = answers
      .map((answer) => {
        let newAnswer = {
          answers: []
        }

        for (const key in answer) {
          if (metadataKeys.includes(key)) {
            newAnswer = {
              [key]: answer[key],
              ...newAnswer
            }
          } else {
            newAnswer.answers.push({
              question: key,
              answer: answer[key]
            })
          }
        }

        return newAnswer
      })

    res.send(newResponse)
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
