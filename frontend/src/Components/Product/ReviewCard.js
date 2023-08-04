import { Rating } from "@mui/lab"
import React from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <div className="reviewCard">
      <AccountCircleIcon sx={{fontSize : 40 , color : "grey" }} />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard