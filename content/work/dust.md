---
title: generative dust
subtitle: 
date: 2019-10-01
draft: false
image: /assets/dust_screencap.png
---

This project was created using touchdesigner. The system takes a video as input, and then uses the feedback TOP and noise displacement to achieve the "dust in the wind" aesthetic. The following two videos show what the system outputs when fed a static image, with varying settings on the noise and delay.

![](/assets/dust_static_01-converted.mp4)
![](/assets/dust_static_02-converted.mp4)

To then add motion to the input image, I generated particles with randomized life expectency, Y position, and color. I then mapped each of these particles to a rectangle, with the peak height of the rectangle being informed by the particle's life expectency.

![](/assets/dust_motion-converted.mp4)
![](/assets/dust_with-color-converted.mp4)
