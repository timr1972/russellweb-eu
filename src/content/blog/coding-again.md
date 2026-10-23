---
title: "Coding again."
description: ""
pubDate: "2013-08-11 23:45:16"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

I've been thinking about the engine start button recently. Although I have a key ignition and steering lock, the button was only for starting the engine, and to stop the engine you would need to turn the key off.  I would like to make the start button, also the stop button, logical really but to do this I need to know if the engine is running and also need to add some extra logic.  I've decided to use an Arduino nano dedicated to this function, along with an opto-isolator to take the tacho signal from the ecu and decide if the engine is running or not!  Rather simple really.

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-20130811_2332311.jpg>)

The basic coding is in place and I've checked the ecu signal is correctly being read by the Arduino, and now I've started planning the circuit board as it needs to have three Mosfets, one opto-isolator and a 12v to 5v supply.  I may add an I2C output to the board so that it can log to a centralised data logger for all of the on board electronics, but that's a separate project.
