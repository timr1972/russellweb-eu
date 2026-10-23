---
title: "Steering Wheel lights up...again."
description: ""
pubDate: "2015-04-08 21:17:28"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

Although the steering wheel buttons in buttercup work fine, I can't see them at night. With gloves on I can't really find them and having hit the horn instead of main beam at 3 am on the way to Brugge I decided a better solution was needed.

In the picture above are IP67 push buttons from

Apem

with a separate pair of pins for the coloured LEDs.  I've added a resistor in line to each of these, different by colour to try and get the same light level on all of them.  The LEDs only come on with the side/head lights so they will also be switched on with the aid of a high side NPN PNP transistor pair, avoiding overloading the Arduino.

![wpid-wp-1428524673101.jpg](<http://www.russellweb.eu/wp-content/uploads/wpid-wp-1428524673101-225x300.jpg>)

I'm presently designing a mini circuit board to house an Arduino Nano, the transistors, Bluetooth module and screw terminals for the switches and Neo pixel ring.  Trying to make this super small, down to about 55x20mm.

![SteeringWheel.PNP_pcb](<http://www.russellweb.eu/wp-content/uploads/SteeringWheel.PNP_pcb-300x236.png>)
