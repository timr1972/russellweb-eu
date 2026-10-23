---
title: "Never Assume"
description: ""
pubDate: "2014-05-07 22:55:24"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

I've been quite busy recently with a number of things, not least my day job, however I have found a few minutes to chat on the S2 forum and spend a few minutes in the garage solving one of the many irritating problems.

The issue I had was with the fuel pump: in theory when you switch on the ignition the fuel pump doesn't run until the engine is rotating faster than 13 RPM.  The fuel pump in buttercup however ran as long as the ignition was switched on so I had the feeling something wasn't right.  I asked the obvious question in the forums and yes that was indeed not right.

![edge_fusebox](<http://www.russellweb.eu/wp-content/uploads/edge_fusebox-768x576.jpg>)

As you can see in this picture the fuel pump relay appears to be correctly wired in; a live feed, two outputs, coil powered by the ignition key and the blue wire going off to the ECU that switches ground to activate the relay coil.

This also seemed to line up with the wiring diagram below.

![3BMotronic_1](<http://www.russellweb.eu/wp-content/uploads/3BMotronic_1-549x768.jpg>)

However I made the assumption that I could mix and match the outputs from the relay (87 and 87a) without any issue, I was wrong.  Inside the ECU is a hold over circuit that provides power to the components on one side of the relay but not the other.  By mixing the outputs the hold over was also supplying the fuel pump with power.  A silly but fortunately simple mistake to rectify.  Now when the ignition key is turned on, all you hear is a brief buzz from the cooling pump and then silence and not the annoying fuel pump whine. :) Happy.

This also makes it easier to now work on the issue with the ECU cutting out, and removes a potential cause.  Unfortunately the issue does still exist, but to fix it all I seem to have to do is to wiggle the ECU plug, or switch off the ignition unplug the ECU, plug it back in and try again.  The plug has 55 connections and when I wired the car up initially 3 of them were bodged because of a broken connector on one of the hall senders.  I have fixed the broken connector in the loom and the wires in the ECU plug, but I may have created other issues or possibly not replaced the contact pins correctly.  This will be a slow careful process but hopefully I can focus on the few pins I had changed and not have to go through all 55 of them!
