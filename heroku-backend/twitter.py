from requests_oauthlib import OAuth1
from random            import randrange

import requests

def getTwitterData(user):
    API_KEY    = 'cabCJ8nMPq1STGLDP0UNyig9l'
    API_SECRET = 'IzBe0RF0SmVsZwMrq6qmcndozkhfahO8t8wpKshPRz4SoWGnYK'
    AUTH       = OAuth1(API_KEY, API_SECRET)

    return requests.get('https://api.twitter.com/1.1/users/show.json?screen_name=' + user, auth=AUTH).json()


def getPrompts(user):
    API_KEY    = 'cabCJ8nMPq1STGLDP0UNyig9l'
    API_SECRET = 'IzBe0RF0SmVsZwMrq6qmcndozkhfahO8t8wpKshPRz4SoWGnYK'
    AUTH       = OAuth1(API_KEY, API_SECRET)

    result = requests.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + user, auth=AUTH).json()
    tweets = list()

    if 'errors' in result or 'error' in result or len(result) == 0:
        return tweets

    for _ in range(10):
        tweets.append(result[randrange(len(result))]['text'])

    return tweets


def generateTweet(prompt):
    # https://medium.com/@molamk/how-to-use-openais-gpt-2-with-react-and-flask-9ca1573e5905
    return prompt
