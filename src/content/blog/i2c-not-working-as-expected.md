---
title: "I2C not working as expected."
description: ""
pubDate: "2013-09-08 16:14:43"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-20130908_155756.jpg>)

Last week I connected the brain up to buttercup and did some tests. The first issue I had was the 12v to 5v converter I had purchased. Whenever the engine is started, as the starter motor was engaged there is a drop in the battery voltage, and this drop went below the limit if the power supply I had purchased and hence it all died! Fortunatly I had created my own psu and this had a 6v dropour because it uses the 7805 voltage regulator. I connected it all up and the power issue was fixed. The next problem I had was with the i2c link which appears to suffer quite badly from the noisy electrical environment. A number of times one or both of the Arduinos would lock up. Although I changed the bus speed to 10khz on the master and slave but not the steering wheel it was all still a bit flakey. I've decided to replace the I2c link to the steering wheel with the switches being part of two r2r ladders. I've tested this on the board in the photo and it works perfectly. The main unit and slave unit in the main brain I've decided to replace with a single mega arduino which has more pins.  The rest of the code, relays both 5v and 12v, and sensors are working fine so just a case of merging and moving the code to the mega, and rebuilding the buttons in the steering wheel.

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-20130907_134833.jpg>)

I've also decided to hook the ecu warning light, also known as motor check light up to the auxiliary lamp on the dashboard and enable a button behind the dash so that I can run engine diagnostics as and when required.
