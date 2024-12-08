# Implementation of a simple Logo language using html, css and javascript.

This is a collaborative project to develop a simple LOGO programming language designed to help students learn the basic concepts of programming logic. A set of commands can be entered to move a robot across the screen and create drawings. The commands are written in Spanish to make it easy to understand for Spanish-speaking students that don't know English yet.

Check it out here: [LOGO](https://www.logo.cdavidsv.dev/)

## Available Commands
- **adelante**: Moves the robot forward.
- **atras**: Moves the robot backward.
- **derecha**: Rotates the robot towards the right.
- **izquierda**: Rotates the robot towards the left.
- **limpiar**: Clear the canvas screen.
- **centrar**: Centers the robot in the center of the screen.
- **repetir**: Repeats a set of commands the ammount of times specified.
- **levantar_pluma**: Picks the pen to begin drawing.
- **bajar_pluma**: Stops painting.
- **color**: Change the color of the pen.

## Syntax

```
adelante <number>

atras <number>

derecha <angle>

izquierda <angle>

limpiar

centrar

repetir <number> [ <command> ... ]

levantar_pluma

bajar_pluma
```

## Examples of commands to try

Command: `color rojo ade 200 color verde der 90 ade 200 color azul izq 90 ade 200`
![Screenshot 2023-03-28 132748](https://user-images.githubusercontent.com/88672259/228347291-178f398d-10ca-4476-afd9-0014cc685a4c.jpg)

---

Command: `repetir 100 [adelante 200 derecha 89]`
![Screenshot 2023-03-28 133141](https://user-images.githubusercontent.com/88672259/228347550-a691ae38-5aa0-426b-be65-e521f331fc83.jpg)

---

Command: `repetir 99 [color rojo ade 200 der 85604 color verde ade 240 izq 326677 color azul ade 150]`
![Screenshot 2023-03-28 133103](https://user-images.githubusercontent.com/88672259/228347709-cea9194c-845e-482e-9f94-7af26dad21a9.jpg)

---

## Getting Started
To use this Logo Language, simply open the **index.html** on a live-server. The Logo Language interface will appear on your screen, and you can begin entering commands to control the turtle.

