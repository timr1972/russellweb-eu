---
title: "Finally..."
description: ""
pubDate: "2013-09-30 21:20:31"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-1380360458370.jpg>)

Having tried with I2c and ladder resistor arrays, I've finally resorted to PWM signalling between two Arduinos.

Both the I2c and the resistor array were affected by the quality of the power supply. For the I2c this could result in one or both of the units hanging until they are reset, and for the resistor array the values fluctuated so much that I was encountering so many false reads it was a joke.  Finally the PWM method seems to be working, and most importantly reliably!

In short I have connected an output from one of the PWM pins on the steering wheel Arduino, which is a Teensy 2.0 btw, to a PWM pin in the main Arduino, a Mega unit.  I have also connected an output in the opposite direction from the main unit to the steering wheel and this is switched between high and low.  The steering wheel has the pullup enabled so when the main unit pulls the pin low this is sensed by the steering wheel unit.

I haven't added a lo-pass filter on the input of the main unit, instead I'm using the pulsein function to measure the pulse lengths of the PWM signal and convert this to a reading.  Although false readings are possible, they won't cause either of the units to hang.  The signal in the opposite direction is used to signify if the ignition key is on or off, and the LED on the steering wheel is flashed periodically to indicate the units are active but the key is turned off.

Hopefully in the next few days I can fit it back into the car and test it fully.
