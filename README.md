# draw-numbers
There are mainly two parts in the assignment:

**1.Modeling:** Model the geometry of 2-digit numbers.

**2.Interaction:** Implement the callback functions of the given controls.

## Task 1 – Modeling
- The user must be able to enter numbers from 0 to 99 using theNumber textbox.
- Your  program  will  display  2-digit  numbers  from  0  to  99,  centered  at  the  origin.  For  the  digits between 0-9, you will display a “0” at the beginning (e.g00, 01, 02, ... , 09)
- The initial number to display will bethe last two digits of your student ID.(E.g. If your student ID is 123456789, when the program starts 89 must be written on the screen.)
## Task 2 – Interaction
- **Number:** Textbox to read 2-digit number between 0 and 99from the user. Determines the digits that will be rendered.
- **Color:** Pass the color obtained from slidersto the fragment shader to determine the color of the digits.
- **Position:** Perform 2D translation according to X and Y slider values.
- **Scale:** Scale the size of the digits according to the slider values.
- **Rotation:** Rotate the digits in z axis according to the slider values.
- **Be  careful  about  the  order  of  transformations.** Rotation  and  scale  should  be  local  (about  the center of the digits).Theyshould not change the position.

## Screenshot

![screenshot](https://github.com/cvngur/draw-numbers/blob/master/screenshot.png)