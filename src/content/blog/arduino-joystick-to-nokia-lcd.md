---
title: "Arduino Joystick to Nokia LCD"
description: ""
pubDate: "2013-01-22 20:03:20"
author: "Tim Russell"
tags: []
heroImage: ""
draft: false
---

![3110_Board](<http://www.russellweb.eu/wp-content/uploads/2013/01/3110_Board-150x150.jpg>)

Moving on from the serial output in the joystick post, we will now present the data graphically on a small Nokia LCD screen, once again from Deal Extreme.

Once we have that working we'll introduce the map function. The map function takes a range of numbers and

maps

it to a new range.  As I stated in the previous post, the analogue input on the Arduino is measured as a value between 0 and 1024.  For programming we are better off limiting this to an 8 bit value, something between 0 and 255 or in the case of the Nokia 3110/5110 screen that we will be using; 5 and 84, as this is the screen size.

To prevent the character we will be displaying from wrapping around we will reduce the upper range to just 78.

```
a0Value = map(analogRead(analogue0), 1, 1023, 5, 0);
a1Value = map(analogRead(analogue1), 1, 1023, 0, 78);
```
On the rear of the LCD board the following connections are present, and we will connect these to the relevant pins on the Arduino. Remember the Nokia screen is 3v not 5v!

1. VCC - Arduino **3v3**
2. GND - Arduino GND
3. SCE - Arduino 7
4. RST - Arduino 6
5. D/C - Arduino 5
6. DN(MOSI) - Arduino 4
7. SCLK - Arduino 3
8. LED - Arduino **3v3**

Once wired up you can power up the circuit and you will notice the LCD should light up, but it won't display anything yet.

Lets add some code to support the screen. This section of the code is taken from Arduino.cc and includes a large table which is basically a conversion table from ASCII to codes specific to the Nokia LCD. The first definitions are just for the pins we will be using to control the LCD

```
#define PIN_SCE   7
#define PIN_RESET 6
#define PIN_DC    5
#define PIN_SDIN  4
#define PIN_SCLK  3

#define LCD_C     LOW
#define LCD_D     HIGH

#define LCD_X     84
#define LCD_Y     48
#define LCD_CMD   0
```
The last 5 constants are used in the functions required to use the board, and also to define the screen size.

As stated above we also have a large array that is used to store the Nokia code for the ASCII library. If you are only using a set number of characters then you could possibly shrink this down, but for now we'll keep it included.

```
static const byte ASCII[][5] =
{
 {0x00, 0x00, 0x00, 0x00, 0x00} // 20
,{0x00, 0x00, 0x5f, 0x00, 0x00} // 21 !
,{0x00, 0x07, 0x00, 0x07, 0x00} // 22 "
,{0x14, 0x7f, 0x14, 0x7f, 0x14} // 23 #
,{0x24, 0x2a, 0x7f, 0x2a, 0x12} // 24 $
,{0x23, 0x13, 0x08, 0x64, 0x62} // 25 %
,{0x36, 0x49, 0x55, 0x22, 0x50} // 26 &
,{0x00, 0x05, 0x03, 0x00, 0x00} // 27 '
,{0x00, 0x1c, 0x22, 0x41, 0x00} // 28 (
,{0x00, 0x41, 0x22, 0x1c, 0x00} // 29 )
,{0x14, 0x08, 0x3e, 0x08, 0x14} // 2a *
,{0x08, 0x08, 0x3e, 0x08, 0x08} // 2b +
,{0x00, 0x50, 0x30, 0x00, 0x00} // 2c ,
,{0x08, 0x08, 0x08, 0x08, 0x08} // 2d -
,{0x00, 0x60, 0x60, 0x00, 0x00} // 2e .
,{0x20, 0x10, 0x08, 0x04, 0x02} // 2f /
,{0x3e, 0x51, 0x49, 0x45, 0x3e} // 30 0
,{0x00, 0x42, 0x7f, 0x40, 0x00} // 31 1
,{0x42, 0x61, 0x51, 0x49, 0x46} // 32 2
,{0x21, 0x41, 0x45, 0x4b, 0x31} // 33 3
,{0x18, 0x14, 0x12, 0x7f, 0x10} // 34 4
,{0x27, 0x45, 0x45, 0x45, 0x39} // 35 5
,{0x3c, 0x4a, 0x49, 0x49, 0x30} // 36 6
,{0x01, 0x71, 0x09, 0x05, 0x03} // 37 7
,{0x36, 0x49, 0x49, 0x49, 0x36} // 38 8
,{0x06, 0x49, 0x49, 0x29, 0x1e} // 39 9
,{0x00, 0x36, 0x36, 0x00, 0x00} // 3a :
,{0x00, 0x56, 0x36, 0x00, 0x00} // 3b ;
,{0x08, 0x14, 0x22, 0x41, 0x00} // 3c <
,{0x14, 0x14, 0x14, 0x14, 0x14} // 3d =
,{0x00, 0x41, 0x22, 0x14, 0x08} // 3e >
,{0x02, 0x01, 0x51, 0x09, 0x06} // 3f ?
,{0x32, 0x49, 0x79, 0x41, 0x3e} // 40 @
,{0x7e, 0x11, 0x11, 0x11, 0x7e} // 41 A
,{0x7f, 0x49, 0x49, 0x49, 0x36} // 42 B
,{0x3e, 0x41, 0x41, 0x41, 0x22} // 43 C
,{0x7f, 0x41, 0x41, 0x22, 0x1c} // 44 D
,{0x7f, 0x49, 0x49, 0x49, 0x41} // 45 E
,{0x7f, 0x09, 0x09, 0x09, 0x01} // 46 F
,{0x3e, 0x41, 0x49, 0x49, 0x7a} // 47 G
,{0x7f, 0x08, 0x08, 0x08, 0x7f} // 48 H
,{0x00, 0x41, 0x7f, 0x41, 0x00} // 49 I
,{0x20, 0x40, 0x41, 0x3f, 0x01} // 4a J
,{0x7f, 0x08, 0x14, 0x22, 0x41} // 4b K
,{0x7f, 0x40, 0x40, 0x40, 0x40} // 4c L
,{0x7f, 0x02, 0x0c, 0x02, 0x7f} // 4d M
,{0x7f, 0x04, 0x08, 0x10, 0x7f} // 4e N
,{0x3e, 0x41, 0x41, 0x41, 0x3e} // 4f O
,{0x7f, 0x09, 0x09, 0x09, 0x06} // 50 P
,{0x3e, 0x41, 0x51, 0x21, 0x5e} // 51 Q
,{0x7f, 0x09, 0x19, 0x29, 0x46} // 52 R
,{0x46, 0x49, 0x49, 0x49, 0x31} // 53 S
,{0x01, 0x01, 0x7f, 0x01, 0x01} // 54 T
,{0x3f, 0x40, 0x40, 0x40, 0x3f} // 55 U
,{0x1f, 0x20, 0x40, 0x20, 0x1f} // 56 V
,{0x3f, 0x40, 0x38, 0x40, 0x3f} // 57 W
,{0x63, 0x14, 0x08, 0x14, 0x63} // 58 X
,{0x07, 0x08, 0x70, 0x08, 0x07} // 59 Y
,{0x61, 0x51, 0x49, 0x45, 0x43} // 5a Z
,{0x00, 0x7f, 0x41, 0x41, 0x00} // 5b [
,{0x02, 0x04, 0x08, 0x10, 0x20} // 5c ¥
,{0x00, 0x41, 0x41, 0x7f, 0x00} // 5d ]
,{0x04, 0x02, 0x01, 0x02, 0x04} // 5e ^
,{0x40, 0x40, 0x40, 0x40, 0x40} // 5f _
,{0x00, 0x01, 0x02, 0x04, 0x00} // 60 `
,{0x20, 0x54, 0x54, 0x54, 0x78} // 61 a
,{0x7f, 0x48, 0x44, 0x44, 0x38} // 62 b
,{0x38, 0x44, 0x44, 0x44, 0x20} // 63 c
,{0x38, 0x44, 0x44, 0x48, 0x7f} // 64 d
,{0x38, 0x54, 0x54, 0x54, 0x18} // 65 e
,{0x08, 0x7e, 0x09, 0x01, 0x02} // 66 f
,{0x0c, 0x52, 0x52, 0x52, 0x3e} // 67 g
,{0x7f, 0x08, 0x04, 0x04, 0x78} // 68 h
,{0x00, 0x44, 0x7d, 0x40, 0x00} // 69 i
,{0x20, 0x40, 0x44, 0x3d, 0x00} // 6a j
,{0x7f, 0x10, 0x28, 0x44, 0x00} // 6b k
,{0x00, 0x41, 0x7f, 0x40, 0x00} // 6c l
,{0x7c, 0x04, 0x18, 0x04, 0x78} // 6d m
,{0x7c, 0x08, 0x04, 0x04, 0x78} // 6e n
,{0x38, 0x44, 0x44, 0x44, 0x38} // 6f o
,{0x7c, 0x14, 0x14, 0x14, 0x08} // 70 p
,{0x08, 0x14, 0x14, 0x18, 0x7c} // 71 q
,{0x7c, 0x08, 0x04, 0x04, 0x08} // 72 r
,{0x48, 0x54, 0x54, 0x54, 0x20} // 73 s
,{0x04, 0x3f, 0x44, 0x40, 0x20} // 74 t
,{0x3c, 0x40, 0x40, 0x20, 0x7c} // 75 u
,{0x1c, 0x20, 0x40, 0x20, 0x1c} // 76 v
,{0x3c, 0x40, 0x30, 0x40, 0x3c} // 77 w
,{0x44, 0x28, 0x10, 0x28, 0x44} // 78 x
,{0x0c, 0x50, 0x50, 0x50, 0x3c} // 79 y
,{0x44, 0x64, 0x54, 0x4c, 0x44} // 7a z
,{0x00, 0x08, 0x36, 0x41, 0x00} // 7b {
,{0x00, 0x00, 0x7f, 0x00, 0x00} // 7c |
,{0x00, 0x41, 0x36, 0x08, 0x00} // 7d }
,{0x10, 0x08, 0x08, 0x10, 0x08} // 7e ←
,{0x78, 0x46, 0x41, 0x46, 0x78} // 7f →
};
```
...and now a number of routines that carry out a number of functions. The first routine

LcdCharacter

sends individual characters to the LCD through the LcdWrite function. Notice if you want to send a string this will have to be per character, unless we use the LcdString function further down.

```
void LcdCharacter(char character)
{
  LcdWrite(LCD_D, 0x00);
  for (int index = 0; index < 5; index++)
  {
    LcdWrite(LCD_D, ASCII);
  }
  LcdWrite(LCD_D, 0x00);
}
```
The

LcdClear

routine does exactly that, it writes to each location of the screen and clears the content. It may seen long winded but in practice with good coding you will only have to clear the screen now and again.

```
void LcdClear(void)
{
  for (int index = 0; index < LCD_X * LCD_Y / 8; index++)
  {
    LcdWrite(LCD_D, 0x00);
  }
}
```
When we start the script we also want to initialise the screen. This could also be carried out in the setup area of the script, but as we may need to call it again, we've made it a routine that can be used with a single command.

```
void LcdInitialise(void)
{
  pinMode(PIN_SCE,   OUTPUT);
  pinMode(PIN_RESET, OUTPUT);
  pinMode(PIN_DC,    OUTPUT);
  pinMode(PIN_SDIN,  OUTPUT);
  pinMode(PIN_SCLK,  OUTPUT);

  digitalWrite(PIN_RESET, LOW);
  digitalWrite(PIN_RESET, HIGH);

  LcdWrite( LCD_CMD, 0x21 );  // LCD Extended Commands.
  LcdWrite( LCD_CMD, 0xB1 );  // Set LCD Vop (Contrast). //B1
  LcdWrite( LCD_CMD, 0x04 );  // Set Temp coefficent. //0x04
  LcdWrite( LCD_CMD, 0x14 );  // LCD bias mode 1:48. //0x13
  LcdWrite( LCD_CMD, 0x0C );  // LCD in normal mode. 0x0d for inverse
  LcdWrite(LCD_C, 0x20);
  LcdWrite(LCD_C, 0x0C);
}
```
Now in contrast to the LcdCharacter, here we can send a string. You thought it was all going to be difficult with character to string conversions, well it is for now to keep you in practice, but later we will use the LcdString command. If you're paying attention, you will see that LcdString calls LcdCharacter the same way we would, so we will be using that method in the next sketch.

```
void LcdString(char *characters)
{
  while (*characters)
  {
    LcdCharacter(*characters++);
  }
}
```
..and finally the last step in getting the text actually onto the screen. The first and second step prepare the screen to receive data and the third sends the character as a byte using PIN_SDIN and the Most Significant Bit First (256-->0). Sending PIN_SCE high then latches the data, a bit like locking it in.

```
void LcdWrite(byte dc, byte data)
{
  digitalWrite(PIN_DC, dc);
  digitalWrite(PIN_SCE, LOW);
  shiftOut(PIN_SDIN, PIN_SCLK, MSBFIRST, data);
  digitalWrite(PIN_SCE, HIGH);
}
```
The

gotoXY

routine does exactly what you think it would, you call it by specifying a location on the screen and the function sets the virtual cursor to that location.

```
void gotoXY(int x, int y)
{
  LcdWrite( 0, 0x80 | x);  // Column.
  LcdWrite( 0, 0x40 | y);  // Row.
}
```
Ok that's a lot of code and functions but we're not there yet. The rest however will be easier for the novice to read and understand :)

First the constants as per the original Joystick sketch;

```
const int analogue0 = A0;  // Analog input pin that the potentiometer is attached to
const int analogue1 = A1;  // Analog input pin that the potentiometer is attached to
const int jbutton   = 2;

int a0Value = 0;        // value read from the x-axis
int a1Value = 0;        // value read from the y-axis
int jbValue = 0;        // value read from the joystick button
char value2[4] ;
```
..the init part, that sets up our screen, serial connection and gets us ready to run. You can see here the call to the LcdInitialise and LcdClear routines that we just added.

```
void setup() {
  Serial.begin(115200);
  pinMode(jbutton, INPUT_PULLUP);     // Set button as input and enable pullup
  LcdInitialise();
  LcdClear();
}
```
Ok, so now if we run the script, it should power up and initialise the screen. Now lets add the loop function and start passing information on to the screen.

```
void loop(void)
{
  gotoXY(a1Value,a0Value);         // Go to last position and ...
  LcdCharacter(' ');               // clear the screen at that position.
  a0Value = map(analogRead(analogue0), 1, 1023, 5, 0);  // Read the A0 value and MAP this to a new range of 5-0
  a1Value = map(analogRead(analogue1), 1, 1023, 0, 78); // Read the A1 value and MAP this to the range 0-78
  if (digitalRead(jbutton) == HIGH) { // This section looks at the joystick button and sets a value
    jbValue=0;
  }else {
    if (displaychar==1) {
      displaychar=0;
    } else {
      displaychar=1;
    }
   do {                     // To prevent button bounce this is added while the button is depressed.
     jbValue=1 ;
   } while (digitalRead(jbutton) == LOW);
   delay (100);
 }

  // Print the results to the serial monitor:
  Serial.print("a0 = " );
  Serial.print(analogRead(analogue0));
  Serial.print("\t a1 = ");
  Serial.print(analogRead(analogue1));
  Serial.print("\t jb = ");
  Serial.println(jbValue);

  // Print the character + or - dependent on the button state to
  // the screen at the position maped from the joystick position
  gotoXY(a1Value,a0Value);
  if (displaychar == 1) {
    LcdCharacter('+');
  } else {
    LcdCharacter('-');
  }
  delay(50);
}
```
Well that's about it. In the next blog we'll take the joystick off and bring an RFID reader into the frame that we will use the LCD to show the card ID.
