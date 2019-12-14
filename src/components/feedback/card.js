import React from 'react'
import axios from 'axios'
import {apiPath} from '../../helpers/api'

const FeedbackCard = (props) => {
  const {feedback} = props

  const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
  const headers = { headers: {'authorization': localStorage.token} }



  const logFeedback = (e) => {
    console.log(headers)
      axios
          .put(apiPath(`/feedback/confirm/${props.feedback.feedback_id}`), {}, headers)
          .then(res => {
            props.update();
          })
          .catch(err => console.log(err) );
    }


  return <div>
    <h3>{ ['Bug Report', 'Question/Concern', 'Comment/Feedback', "I'd Like to Help Out", 'Other'][feedback.feedback_kind] }</h3>
    
    <div className="faq-answer">
    { feedback.feedback_name || feedback.feedback_email ? <span>
       { feedback.feedback_name } / {feedback.feedback_email}
    </span> : <p>Anonymous</p> } says:<br />
    <i>"{ feedback.feedback_message }"</i><br />
    { feedback.logged ? "" : <span className="format-link" onClick={logFeedback}>Click To Log Feedback</span> }
    </div>
    
  </div>

}

export default FeedbackCard
