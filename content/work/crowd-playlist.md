---
title: crowd playlist
subtitle:
date: 2019-06-01
draft: false
image: /assets/crowd_wave.png
---

## crowd-playlist is a web-app allowing users to collaborate and build a playlist together in real time, using the spotify api.

[visit site](http://cly.li/live/crowd)
[view code](https://github.com/claytercek/crowd-playlist)

My goal with this project was to create a service that my friends and I could use whenever we’re hanging out and listening to music. Instead of one person controlling the aux cord, crowd-playlist allows people to create live playlists together. Users can add any song from the Spotify library to the shared playlist, and it even game-ifies the process by allowing anyone in the group to vote any track up or down the queue.

![playlist view](/assets/crowd_owner.png)
![playlist view - mobile](/assets/crowd_guest-mobile.png)

![search view - mobile](/assets/crowd_guest-mobile-search.png)
![search view](/assets/crowd_owner-search.png)

For the visual design of the app, I tried to keep the aesthetic very simple. The whole app is two pages, one for creating/joining a group, and the other for both search and playlist view.

The only difference between the host and guest view is the host has a group code and pause/skip functionality. Otherwise it is totally identical.

![home view](/assets/crowd_home.png)
![playlist view owner - mobile](/assets/crowd_owner-mobile.png)
![playlist view guest - mobile](/assets/crowd_guest-mobile.png)

One of the main reasons I wanted to do this project was because I wanted to get a better grasp on Node and React, and I felt that this project would be the perfect opportunity to do so.

The search and playback functionality are all achieved through the Spotify Web API. Luckily, whenever I hit a road block or something I just couldn’t figure out, I was able to reference several other existing projects on Github that do something similar using the Spotify API, like C by José M Pérez.

The server and client communicate through rest api calls and WebSockets. When a new host joins, the server creates a new WebSocket group that all the guests are also put into when they join with the 4 letter group code. Any time a user votes or adds a song, the changes are pushed to the server, all the users get pinged over the WebSocket, which then triggers an API call to the server to fetch the updated list.