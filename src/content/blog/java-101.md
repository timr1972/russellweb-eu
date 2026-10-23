---
title: "Java 101"
description: ""
pubDate: "2014-03-18 20:53:09"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

In between the kit car work I have taken it upon myself to improve my java skills and hence my Android skills.  I have a few apps running in the SDK and on my phone.  The following excerpt I'm quite proud of as it contains a number of basic but critical java programming steps.  Although I have been programming for sometime it's always been just my way, but now I am teaching myself a structured approach, protecting variables, creating sub classes and building step by step on my capabilities and experience, resulting in better, safer code.

class Library { int size; String bookTitle; String authorName; void lookup(){ System.out.println(size + ", " + bookTitle + ", " + authorName); } } class Functions{ int GiveMeARandom(int x){ int number = (int) (Math.random() * x); return number; } } class Variables{ private int varX = 0; private int varXupper = 100; private int varXlower = 0; public boolean setX (int x){ boolean result = false; if (x > varXlower && x<varXupper) { varX = x; result = true; } return result; } public int getX() { return varX; } } class TestDrive { public static void main(String[] args) { Functions func = new Functions(); Variables var = new Variables(); int tempNumber = func.GiveMeARandom(200); if (var.setX(tempNumber)) { Library d = new Library(); d.size=var.getX(); d.lookup(); } else { System.out.println("Lookup Number " + tempNumber + " out of range"); } } }
