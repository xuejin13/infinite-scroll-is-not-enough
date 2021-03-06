import React from "react"
import queryString from "query-string"

import Index from "./index.jsx"
import Tweet from "../components/tweet"

/*
 * Generated Tweets Page
 * 
 * Used to display generated tweets for a specified user. Makes API
 * requests to the backend to continuously serve new tweets. Handles
 * changing API endpoint for demo mode.
 */
class GeneratedTweets extends Index {
  // Checks for change in props, used for when user
  // generates tweets for new user or toggles demo mode
  static getDerivedStateFromProps(props, state) {
    let user = queryString.parse(props.location.search).user

    if (user !== state.user || props.demoActive !== state.demoActive) {
      return {
        tweets: [],
        canLoadMore: true,
        loadingTweets: true,
        error: false,
        demoActive: props.demoActive,
        user: user,
        currentPage: 0,
        count: 0
      }
    }
    else {
      return null
    }
  }

  // Initial fetch call if change in user or demo mode toggled
  componentDidUpdate() {
    if (this.state.canLoadMore && this.state.count === 0) {
      this.fetchTweets()
    }
  }

  // Retrieves state object - overriden for derived pages
  getState(props) {
    return {
      tweets: [],
      canLoadMore: true,
      loadingTweets: true,
      error: false,
      demoActive: props.demoActive,
      user: queryString.parse(props.location.search).user,
      currentPage: 0,
      count: 0
    }
  }

  // Fetches tweets from backend API - overriden for derived pages
  fetchTweets() {
    if (this.state.demoActive) {
      this.demoTweets() // Demo mode active
    }
    else {
      this.generateTweets() // Generative mode active
    }
  }

  // Fetch tweets by generating from user's tweet history
  generateTweets() {
    fetch(`https://infinite-scroll-is-not-enough.herokuapp.com/generate/${this.state.user}`, { method: 'Get' })
      .then(res => res.json())
      .then(tweet_arr => {
        if (tweet_arr.length === 0) {
          this.setState({
            canLoadMore: false,
            loadingTweets: false,
            error: true 
          })
        }
        
        let _tweets = []

        for (let i = 0; i < tweet_arr.length; ++i) {
          _tweets.push(<Tweet tweet={tweet_arr[i]} key={i + this.state.count} />)
        }

        this.setState({
          tweets: this.state.tweets.concat(_tweets),
          loadingTweets: false,
          count: this.state.count + tweet_arr.length
        })
      })
      .catch(error => {
        this.setState({
          canLoadMore: false,
          loadingTweets: false,
          error: true 
        })
      })
  }

  // Fetch tweets from demo database
  demoTweets() {
    fetch(`https://infinite-scroll-is-not-enough.herokuapp.com/demo/${this.state.user}/${this.state.currentPage}`, { method: 'Get' })
      .then(res => res.json())
      .then(tweet_arr => {
        if (tweet_arr.length === 0) {
          this.setState({
            canLoadMore: false,
            loadingTweets: false,
            error: true 
          })
        }

        let _tweets = []

        for (let i = 0; i < tweet_arr.length; ++i) {
          _tweets.push(<Tweet tweet={tweet_arr[i]} key={i + this.state.count} />)
        }

        this.setState({
          tweets: this.state.tweets.concat(_tweets),
          loadingTweets: false,
          currentPage: this.state.currentPage + 1,
          count: this.state.count + tweet_arr.length
        })
      })
      .catch(error => {
        this.setState({
          canLoadMore: false,
          loadingTweets: false,
          error: true 
        })
      })
  }
}

export default GeneratedTweets

