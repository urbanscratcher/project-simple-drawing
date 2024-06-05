# Simple Drawing

November 2023 ~ January 2024 (3 months)

This is a simple drawing web application made with p5js.

## Features
- **Freehand drawing**: Set color and stroke weight for freehand drawing.
- **Line**: Set color and stroke weight for line drawing.
- **Eraser**: Set eraser size.
- **Spray**: Set spray color, size, and density.
- **Fill**: Set fill color, density, and spread.
- **Free transform**: Adjust control points after drawing freehand lines.
- **Cut and paste**: Cut and paste parts of the drawing.
- **Blank canvas**: Clear the drawing and load a blank canvas.
- **Save file**: Save as a png file.
- **State preservation**: Maintains color, stroke weight, and other options even when switching tools.

## Technical Focus
- Practiced using the p5js DOM library.
- Learned the principles of drawing tools.

## Demo
<video src="https://github.com/urbanscratcher/project-simple-drawing/assets/17016494/25af8bf5-355f-4ec5-8836-8167fe52ceab" controls></video>

[Visit the Site](https://joun-drawing.netlify.app)

## Tech Stack

### Frontend
- **Library**: p5js, p5js DOM
- **Language**: JavaScript

### Backend
- None

### Cloud Services and Deployment
- **Hosting and deployment**: Netlify

---

## Reflection
- I found tutorials on how to create a drawing board and tried to make a simple one.
- The concept of p5js having a looping frame is important, but I still don't have a good grasp of it. I think I need to study it more.
- p5js DOM seems to have some limitations, especially in terms of state management and node selection. And the readability wasn't very good.
  
## Next

- I'm considering whether or not to refactor the code into classes.
- I think I can add various features like select, undo/redo, zoom, 3D model loading, etc.
- I want to make it so that you can adjust the weight using the "[" and "]" keys like in Photoshop.
- For some new ideas, I thought about making a feature where a random word is thrown at you and you have to draw a picture within a time limit, or a feature that shows the statistics of the most frequently used colors after drawing a picture.
