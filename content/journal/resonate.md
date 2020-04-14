---
title: developing resonate
date: 2019-06-21
category: case study
image: /assets/resonate_icon.png
description: Resonate is a mobile app built off of the spotify api that allows people to explore any location's local music taste, and helps find the perfect playlist to fit the mood.
draft: false
---

## description: Resonate is a mobile app built off of the spotify api that allows people to explore any location's local music taste, and helps find the perfect playlist to fit the mood.

## About the project

**Problem:** There is no real way to discover new music based on moods, activity or even location.

**The solution:** We created Resonate which helps users discover newly recommended songs based on moods, activity, and current location.

## Understanding the Project

We started out by listing our projects strengths, weaknesses, opportunities, and threats in order to understand the possibilities and the limitations.

![SWOT analysis](/assets/resonate_swot.png)

## Our Process

We divided our timeline into three main categories: User Research, Ideation, and Design/Prototype. Our user research was further divided into surveys, and semi structured informal interviews.

--- 

## Understanding our Users

Whether young or old, everyone listens to music but we wanted to focus on people who use online music streaming services like Spotify, Apple Music, Pandora, etc. Research showed that people between the age of 14 to 39 (mostly students and young professionals) listen to music online, so we set our targeted audience to be students and young professionals.

Some of the key findings from our user research:

- People like sharing music with their friends
- People listen to music during long travels.
- People have memories of songs from particular places.
- People listen to music while doing something on the side, like exercising, studying, meditating, etc.

After mapping out the journey of a typical music streaming app user, we found out that the playlist creation process is very long and boring, social music sharing is not very intuitive, and finding music specific to the location is very hard.

## Sketching Out Ideas

![sketches](/assets/resonate_sketch.png)

## Studying moods in music and social contexts

While perceptions of color are somewhat subjective, there are some color effects that have more universal meaning. Colors in the red area of the color spectrum are known as warm colors and include red, orange, and yellow. These warm colors evoke emotions ranging from feelings of warmth and comfort to feelings of anger and hostility. Colors on the blue side of the spectrum are known as cool colors and include blue, purple, and green. These colors are often described as calm, but can also call to mind feelings of sadness or indifference.

## Information Architecture

We conducted a few card sort exercises with the same participants we interviewed in the initial stages of research to get a better sense of our targeted users' mental models with the user flow.

![card sort](/assets/resonate_card.png)

![user flow](/assets/resonate_flow.png)

## Converting Sketches to Low Fidelity Screens

![low fidelity](/assets/resonate_low.png)

## Final Design

![home screen](/assets/resonate_home.png)
![map screen](/assets/resonate_map.png)
![playlist screen](/assets/resonate_playlist.png)

## Building the App

The development phase was divided into two main components: 
- the react-native frontend
- the node backend

The react visual component was further broken down into six main components (see diagram below) including the settingsView (settings screen), createView (create a new playlist), browseView (find your saved playlists), homeView (home screen and the mood picker overlay), playlistView (playlist details), and the playerView (playback screen). These six main components were also broken down into smaller components. We used redux for the complicated state management of the application.

The server side was broken down into three main components including the database (songs, playlists, artists, etc), API integration (Google maps and Spotify authentication), and recommendations (custom algorithm to provide users with recommended playlists). We used mongodb to store our userdata, and express to route our API.

![home screen](/assets/resonate_track-stack.mp4)
![playback screen](/assets/resonate_playback.png)
![playlist screen](/assets/resonate_mood-picker.mp4)