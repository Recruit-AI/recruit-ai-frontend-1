import React from 'react'
import axios from 'axios'

const FeedbackCard = (props) => {
  const {feedback} = props

  const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
  const headers = { headers: {'authorization': localStorage.token} }



  const logFeedback = (e) => {
    console.log(headers)
      axios
          .put(`https://grimwire.herokuapp.com/api/feedback/confirm/${props.feedback.feedback_id}`, {}, headers)
          .then(res => {
            props.update();
          })
          .catch(err => console.log(err) );
    }


  return <div>
    { ['Bug Report', 'Question/Concern', 'Comment/Feedback', 'Other'][feedback.feedback_kind] }<br />
    Message: { feedback.feedback_message }<br />
    Contact: { feedback.feedback_name } @ {feedback.feedback_email}<br />
    { feedback.logged ? "Logged" : <span onClick={logFeedback}>Click To Log Feedback</span> }
  </div>

}

export default FeedbackCard
