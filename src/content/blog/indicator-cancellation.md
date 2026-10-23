---
title: "Indicator cancellation"
description: ""
pubDate: "2014-02-16 13:04:48"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

It may sound like a small thing but ive been working on this bit for some time. I didn't want a mechanical cancellation, apart from anything else it would still have to be connected to the Arduino main unit. The micro roller switches I first tried were ok but couldn't handle any extra movement in the column, reed sensors seemed obvious but are slow moving.

![serialportscreenshot](<http://www.russellweb.eu/wp-content/uploads/serialportscreenshot-300x270.png>)

Finally I decided on a pair of miniature hall senders. These have a very fast reaction time, fast enough to be able to offset them both slightly and be able to measure the direction of rotation based upon the microsecond difference between one and the other going high. With the car on the stands I can move the steering wheel much quicker than normal, and the quickest traversal across the two senders was 30 milliseconds, more than enough to measure the difference. I have created and tested the code, this is working fine and I have also created the mounting bracket for the two senders. I just need to add some wiring plugs and a cover for that section of the column.

The pictures aren't fab but on each of the modules is a red led for power and green for when the hall sender is high. The three photos show the steering wheel centre and a little bit left and right, although the right hall sensor it's hard to make out the green led, but it's just at the top to the right of the connector.

The first mock up of the column cover is okay, but wasn't the correct sort of Perspex to form with heat, the next one will be. I will also be mounting the charging light LED for the alternator and the RCA plugs for the steering wheel power supply into the same cover. With that done I can pretty much wrap up the dashboard wiring and move onto the last few joins I need to make.

Center position

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-20140216_104002.jpg>)

Right position

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-20140216_1040231.jpg>)

Left position

![image](<http://www.russellweb.eu/wp-content/uploads/wpid-20140216_1040131.jpg>)
