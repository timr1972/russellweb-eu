---
title: "Raspberry Pi as PPP VPN Gateway"
description: ""
pubDate: "2013-03-17 00:26:13"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

I've taken a break from the Arduino's to have a play with the Raspberry Pi that my parents had kindly given me.  I have a set of SDHC cards and have been playing.  I have a vanilla config, a kiosk mode config, a LAMP config and a Syslog server version.   All of these need a 4gb class 10 SDHC card.  Although the syslog and the vanilla will run on a 2gb you are left with next to no real room on the card.  My RPi is fitted with a set of the

ModMyPi heatsinks

as a precaution, and as I have had to over-clock it slightly these are probably essential.

This post is for the VPN gateway config, and I won't pretend to be a Linux guru, so if I make silly errors or go around things the wrong way please be patient with me!

There are a lot of posts on the internet about how to copy the RPi image to the SD card so I won't cover that in detail, but needless to say, you need to do it.  I am using

2013-02-09-wheezy-raspbian.img

for this post on a 2Gb card, and have the box connected to an apple USB keyboard and mouse and my TV via the HDMI port.

Right, enough with the preamble, time to get building. Insert your SD card, connect KB, mouse and screen, Wifi dongle and finally power supply.  I set my RPi on the Wifi first then moved on to carrying out the rest of the config on my laptop through

PuTTY

.

On the initial boot you will be taken into

Raspi-config.

You will need to set the following options:

1. expand_rootfs (Although not strictly required on a 2gb card !)
2. change_pass (For security)
3. memory_split (Set to 32 as we are not using the GPU for this build)
4. overclock (Set to modest)
5. SSH (Enable it)
6. boot_behaviour (Set to on for now)

Now finish and reboot the RPi.  Following the reboot, you will be presented with the desktop mode. Give the RPi time to complete it's boot, although it may not appear to do anything, give it a minute before you start the WiFi config.

![wpa_gui](<http://www.russellweb.eu/wp-content/uploads/2013/03/wpa_gui-300x275.png>)

Once the WiFi is configured and connected, you can start PuTTY or a local terminal and carry out the next steps to update the software and install the extra software we require.

First we update the repository:

```
sudo apt-get update
```
Now we install the VPN software and network manager:

```
sudo apt-get install pptp-linux network-manager-pptp tightvncserver vim
```
..and finally we carry out an upgrade of all of the installed packages:

```
sudo apt-get upgrade
```
I tend to run the next command just to clean up the installed packages as we are only running on a 2Gb card.

```
sudo apt-get autoremove
```
Ok, now we are getting somewhere, we've installed RPi OS, added packages and updated the installed packages, we are rolling! Now lets do some more tidying up; first we stop X the desktop environment from automatically loading and we want to connect the Ethernet port and assign it a static IP address on your internal network.

From the terminal or a PuTTY session, run the raspi-config again (

sudo raspi-config

), and change the

boot-behaviour

so the desktop is not automatically started. You can reboot now if you want although it is not necessary.

Now plug in the Ethernet cable and wait a few seconds. From PuTTY or a terminal window type if config and check the interface has been given an IP address.

```
pi@raspberrypi ~ $ ifconfig
eth0      Link encap:Ethernet  HWaddr b8:27:eb:45:b8:3d
          inet addr:192.168.1.75 Bcast:192.168.1.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:8256 errors:0 dropped:0 overruns:0 frame:0
          TX packets:6465 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:704633 (688.1 KiB)  TX bytes:1816944 (1.7 MiB)
```
If you want to you can change your DHCP server/router to assign a static address in which case you can skip this step. If however you would like a static address, read on :)

In the terminal window enter the command:

```
sudo vi /etc/network/interfaces
```
This will open the interfaces file and you can enter you configuration here. As default the Ethernet interface eth0 will show the line;

```
iface eth0 inet dhcp
```
This is the line we will change and add a few lines under this as per the following example. The editor we are using is VIM so you will need to press the

key or the letter

I

before you can make changes. Use the cursor keys to navigate around the file and add the required lines.

```
iface eth0 inet static
address 192.168.1.99
netmask 255.255.255.0
gateway 192.168.1.254
```
As we are using the VIM editor, once you have finished making the changes, press the

key and then type

:wq

. You will see this as you type it appear in the bottom left of the screen.

You have now edited the file and saved it, or (W)ritten it out, and the Q is for (Q)uit. You will now be back at your system prompt. You can now reboot the RPi and move on to the next configuration steps.

```
sudo reboot
```
Right it's back, login via the terminal or use the PuTTY. We are going to create a file that contains the login information for the tunnel, then configure the tunnel and the routing, finally adding NAT rules.
The first action is the login information, run the command and add a new line with the login name for the VPN server, PPTP, the VPN password and an asterisk.

```
sudo vi /etc/ppp/chap-secrets
          rpi  PPTP password *
```
Remember this is VIM so first an I or the

key to edit, and

:wq

to save a quit the editor. The next file is the tunnel config, this is an example replace the server FQDN wit your own server FQDN or IP address.

```
sudo vi /etc/ppp/peers/vpn01
	pty "pptp vpn01.local.test --nolaunchpppd"
	name rpi
	remotename PPTP
	require-mppe-128
	file /etc/ppp/options.pptp
	ipparam vpn01
```
Once save the next file is for the purposes of routing traffic. I use this connection to a testlab that is in the 10.0.0.0/8 range, while my own network is 192.168.1.0/24, so change the IP range as required.

```
sudo vi /etc/ppp/ip-up.d/route-traffic
	#!/bin/bash
	NET="10.0.0.0/8"
	IFACE="ppp0"
	route add -net ${NET} dev ${IFACE}
```
Finally we need to ensure the last file we created can be run by the system, so we need to give it execute rights.

```
sudo chmod +x /etc/ppp/ip-up.d/route-traffic
```
Lets get that VPN up! The first command is to create the tunnel, then add routing and NAT. Later we will make these changes permanent but for now the actions are manual.

```
sudo pppd call vpn01
```
That was simple, no errors, no bells and whistles, just that one command and the connection should be up. To check the connection status use the

ifconfig

command and check the link is up and running.

```
ppp0      Link encap:Point-to-Point Protocol
          inet addr:10.10.20.99  P-t-P:10.10.20.2  Mask:255.255.255.255
          UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1466  Metric:1
          RX packets:1150 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1597 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:3
          RX bytes:259682 (253.5 KiB)  TX bytes:102483 (100.0 KiB)
```
Hopefully you have the same, if not you need to go check your VPN server and double check your configuration steps!

The next step is the routing and NATing of network from the eth0 interface to and from the PPP tunnel.

```
sudo su
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables --table nat --append POSTROUTING --out-interface ppp0 -j MASQUERADE
iptables -I INPUT -s 10.0.0.0/8 -i ppp0 -j ACCEPT
iptables --append FORWARD --in-interface eth0 -j ACCEPT
exit
```
![windows_ping](<http://www.russellweb.eu/wp-content/uploads/2013/03/windows_ping-300x210.png>)

I did almost all of the above from my laptop, so now I want to check my tunnel works. It's not necessary to change my entire network to test this, I'm just going to add a temporary static route to my laptop. Again my example is using my test lab IP address, you will need to change the numbers to match your own situation. Launch a dos window and enter the following command;

```
route add 10.0.0.0 mask 255.0.0.0 192.168.1.99
```
..and that is it, or at least almost. All of the configuration changes for NATing and VPNing are volatile, when you restart the RPi the connections will need to be manually restarted, the same goes for the network route I added on my laptop.

My next post will cover making these changes permanent.
