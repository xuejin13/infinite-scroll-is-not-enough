import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard } from "@fortawesome/free-regular-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { CopyToClipboard } from 'react-copy-to-clipboard'

import "../styles/modal.scss"

// Closes modal and resets copied indicator
function closeModal(close, reset) {
  reset(false)
  close.call()
}

/*
 * Share Modal Component
 * 
 * Displays a modal with a link to share a
 * given generated tweet
 */
const ShareModal = ({show, tweet, close}) => {
  const [copied, setCopied] = useState(false)

  let shareURL = `https://jkelaty.github.io/infinite-scroll-is-not-enough/tweet?id=${tweet}`

  return (
    <CSSTransition
      appear={true}
      in={show}
      timeout={100}>

      <div className={`modal-background`}>
        <div className={`modal-content small`}>

          <div className={`share-link`}>
            <input className={`share-input`} type={`text`} value={shareURL} readOnly />

            <CopyToClipboard text={shareURL}>
              <div className={`clipboard` + (copied ? ` copied` : ``)} onClick={() => setCopied(true)}>
                <FontAwesomeIcon className={`icon-clipboard`} icon={faClipboard} />
                <FontAwesomeIcon className={`icon-checkmark`} icon={faCheck} />
              </div>
            </CopyToClipboard>
          </div>

          <button className={`close-modal`} onClick={() => closeModal(close, setCopied)}>{`Close`}</button>

        </div>
      </div>

    </CSSTransition>
  )
}

export default ShareModal

