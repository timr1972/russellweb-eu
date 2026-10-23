---
title: "Prototype built and tested"
description: ""
pubDate: "2013-08-14 23:24:21"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

Having tested on the breadboard, I've now made a soldered example ready to be installed and tested in buttercup once I fix the ecu connector.

The module in the photo gas two inputs and three outputs. The inputs are from the tacho and the start button, the ouputs are for the LED in the start button surround sound, the starter motor relay and an ignition relay that is normally closed (NC).

The tacho input is monitored for engine speed and if the engine isnt running or a tacho response hasn't been received in half a second it is assumed the engine isn't running and the LED in the start button is turned on.

When the start button is pressed in this state the starter motor relay is switched on my the Arduino, and when the engine speed is abive 400rpm it is assumed the engine is running and the starter motor relay is disengaged, the LED in the start button is also turned off.

If the start button is pressed while the engine is running the relay for the ignition circuit is activated and the engine will stop. The ignition relay is released when no tacho response stops, although this may be a bad idea as the tacho response comes from the ecu, fed by the ignition!
