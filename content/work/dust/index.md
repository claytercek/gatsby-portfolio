---
title: "generative dust"
subtitle: ""
date: "2019-10-01"
draft: false
image: "screencap.png"
---

This project was created using touchdesigner. The system takes a video as input, and then using the feedback TOP and noise displacement to achieve the "sand in the wind" aesthetic. The following two videos show what the system outputs when fed a static image, with varying settings on the noise and delay.

![](static_01-converted.mp4)
![](static_02-converted.mp4)

To then add motion to the input image, I generated particles with randomized life expectency, Y position, and color. I then mapped each of these particles to a rectangle, with the peak height of the rectangle being informed by the particle's life expectency.

![](motion-converted.mp4)
![](with-color-converted.mp4)
