import React, { useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group"

import { Comments, Retweet, Liked, Share } from "./icons"

import "../styles/modal.scss"

function clearLocalStorage() {
  if (typeof window !== `undefined`) {
    window.localStorage.clear()
    window.location.reload()
  }
}

const Modal = ({ showModal, closeModal, demoActive, toggleDemo }) => {
  const [darkMode, toggleDarkMode] = useState(
    (typeof window !== `undefined`)
      ? ((window.localStorage.getItem('ui-dark-mode') === 'on') || false)
      : false
  )

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.localStorage.setItem('ui-dark-mode', darkMode ? 'on' : 'off')
    }
  })
  
  if (typeof document !== `undefined`) {
    if (darkMode) {
      document.getElementsByTagName('html')[0].classList.add('ui-dark-mode')
    }
    else {
      document.getElementsByTagName('html')[0].classList.remove('ui-dark-mode')
    }
  }

  return (
    <>
      <CSSTransition
        appear={true}
        in={showModal}
        timeout={100}>

        <div className={`modal-background`}>
          <div className={`modal-content`}>
            <h1 className={`info-header title`}>{'Infinite Scroll Is Not Enough'}</h1>
            <div className={`info-body`}>

              <h1 className={`info-header settings`}>{`Settings`}</h1>
              <div className={`info-settings`}>
                <button onClick={() => toggleDarkMode( ! darkMode )}>{`Toggle light/dark mode`}</button>
                <button onClick={toggleDemo}>{`Toggle demo`}</button>
                <button onClick={() => clearLocalStorage()}>{`Reset settings and clear cache`}</button>
              </div>
              {/* <div className={`dark-mode-toggle`}>
                <span className={`light-toggle`} onClick={() => toggleDarkMode( ! darkMode )} />
              </div> */}

              <h1 className={`info-header about`}>{`About`}</h1>
              <div className={`info-about`}>
                {/* <p className={`warn`}>{`Note: Tweet generation has currently been disabled`}</p> */}
                <p className={`left`}>{`In these uncertain times, many of us have turned to social media, especially Twitter, to fill our lives with entertainment while a pandamic sends ripples of unease to many people.`}</p>
                <p className={`left`}>{`Unfortunately, a person can only write so many tweets, and if you were to scroll through a individual's twitter feed long enough, reaching the end is inevitable.`}</p>
                <p className={`left`}>{`If you have found yourself in such a predicament, rejoice! You have stumbled upon the solution to all your problems! 'Infinite Scroll Is Not Enough' lets you generate tweets using an advanced Neural Language Model AI based on your favorite twitter user's tweet history.`}</p>
                <p className={`left`}>{`Let's get through some of the basics of using this web app. On the homepage you'll see the most liked tweets that have been generated by our app. When you like a tweet, you can expect it to be displayed on the home page for others to enjoy. Liking a tweet works exactly the same as Twitter. Simply click the`}{Liked}{`icon on any tweet that you may have found to be interesting, humorous or whatever other reason you might like a tweet.`}</p>
                <p className={`left`}>{`You can also share tweets that you may have liked by clicking the`}{Share}{`icon.`}</p>
                <p className={`left`}>{`Please note that the`}{Comments}{`and`}{Retweet}{`icons are purely decorative and are non-functional.`}</p>
                <p className={`left`}>{`You can also use the lightbulb in the upper right-hand corner to toggle between light and dark mode, which are aesthetically identical to Twitter's own layout and color schemes.`}</p>
                <p className={`left`}>{`In order to generate tweets for a specific user, simply use the search bar in the center of the top bar to type in the user's Twitter handle, and then enjoy the tweets! Simply keep scrolling to continuously generate tweets for that user for as long as you need to get your fix!`}</p>
                <p className={`warn`}>{`As a note of caution, please be aware that the tweets generated by this app are not reflective of the Twitter user whose tweets were used the generate them. The AI used in this application was trained on many other distinct sources that influence its text generation.`}</p>
              </div>

              <h1 className={`info-header credits`}>{`Credits`}</h1>
              <div className={`info-credits`}>
                <p>{`Contributors: Jonathan, Xuejin, Benjamin, Ka Ming`}</p>
                <p>{`Check out our GitHub repo `}<a href="https://github.com/jkelaty/infinite-scroll-is-not-enough" target="_blank" noopener="true" rel="noreferrer" >{`here!`}</a></p>
              </div>

            </div>
            <button className={`close-modal`} onClick={closeModal}>{`Close`}</button>
          </div>
        </div>

      </CSSTransition>
    </>
  )
}

export default Modal

