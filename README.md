<div align="center"> 
<h1>Paint-esque</h1>
<img src="./src/gif/realhero.gif" width="750">
<p><em>A paint-like application</em></p>
</div>

## Introduction

As of part of the [Odin Curriculum](https://www.theodinproject.com/lessons/foundations-etch-a-sketch), this proyect comes as challenge to archieve a simple drawing application via DOM Manipulation.

## Implementations

- Simple pleasing design with non-disturbing hover animations
- Ability to download your draw via [html2canvas](https://github.com/niklasvh/html2canvas) implemented via CDN
- Integrated HTML5 color selector
- Reset canvas on pencil re-size
- Right click eraser
- Fun mode: each time you pass over a div it increases it opacity value, plus it looks like Minesweeper. In this mode the eraser behaves removing 1 step of opacity instead. (not in the gif tho)

## to-do 
- [Performance boost on box-shadow animation](https://tobiasahlin.com/blog/how-to-animate-box-shadow/);
- pen size without canvas redrawing:

	at canvas generation give each div a fixed coordinate, like a1 a2 a3, b1 b2 b3 etc...
	on mouse event check target div coordinate info
	if pen size is (pensizeVar), ex 9, and targeted div is ex d5, color too d4 d6 c4 c6 e4 e6. quite doable doing ++ and -- for the rows and array index for the columns


