import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as lightHeart } from "@fortawesome/free-regular-svg-icons";

export default function Likes({className, numLikes}) {
  return (
    <div className={'like-component ' + className}>
    <FontAwesomeIcon className='icon' icon={lightHeart} />
    <p>{numLikes}</p>
  </div>
  )
}
