+++
title = "09 Homogenous Systems"
[extra]
katex = true
+++

A homogenous system is just an equation where a matrix multiplied by some vector = 0.  
Can also be interpreted as a set of solutions that make the system = 0.

$$
A\\vec{x} = \\vec{0}.
$$

$A$ is some matrix, $\\vec{0}$ is the Zero Vector.

This is always consistent because

$$
A\\vec{0} = \\vec{0}
$$
always works. This is called the *<colorize>trivial solution</colorize>*, because it is trivial (duh).

> The important question here is: **<colorize>Are there non-trivial solutions to a given system?</colorize>**

We simply set up an augmented matrix and solve for $x$'s that allow a solution of $\\vec{0}$.
> **If there are any free variables, then we have infinitely many non-trivial solutions.**


### Example problem
For what values of $\\vec{x}$ does the following equation have a solution?

$$
\\begin{bmatrix}
1 & 3 & -1 & 3 \\\\
2 & 6 & 2 & 2 \\\\
1 & 3 & 1 & 1
\\end{bmatrix}\\vec{x}=0
$$

We will begin by looking at this equation as a solving system of equations:

$$
\\begin{align*}
\\begin{bmatrix}
1 & 3 & -1 & 3 \\\\
2 & 6 & 2 & 2 \\\\
1 & 3 & 1 & 1
\\end{bmatrix}
\\vec{x}=\\begin{bmatrix}
0 \\\\
0 \\\\
0
\\end{bmatrix} \\\\
\\left[\\begin{array}{cccc|c}
1 & 3 & -1 & 3 & 0 \\\\
2 & 6 & 2 & 2 & 0 \\\\
1 & 3 & 1 & 1 & 0
\\end{array}\\right] \\\\
\\overset{ \\text{rref} }{ \\to } \\left[\\begin{array}{cccc|c}
1 & 3 & 0 & 2 & 0 \\\\
0 & 0 & 1 & -1 & 0 \\\\
0 & 0 & 0 & 0 & 0
\\end{array}\\right]
\\end{align*}
$$

Notice upon looking at the RREF that columns 2 and 4 do not have a pivot. This means that $x_{2}$ and $x_{4}$ are *<colorize>free variables</colorize>*.

This means that we can represent this equation as the following:

$$
\\begin{align*}
\\begin{cases}
x_{1}+3x_{2}+2x_{4}=0 \\\\
x_{2} \\text{ is free.} \\\\
x_{3}-x_{4}=0 \\\\
x_{4} \\text{ is free.} \\\\
\\end{cases} \\\\
\\text{let }x_{2}=s,x_{4}=t 
&\\implies \\begin{cases}
x_{1}=-3s-2t \\\\
x_{3}=t
\\end{cases} \\\\
&\\implies
\\vec{x}=\\begin{bmatrix}
x_{1} \\\\
x_{2} \\\\
x_{3} \\\\
x_{4}
\\end{bmatrix}
=\\begin{bmatrix}
-3s-2t \\\\
1s+0t \\\\
0s+1t \\\\
0s+1t
\\end{bmatrix} \\\\
&\\therefore \\vec{x}=
s\\begin{bmatrix}
-3 \\\\
1 \\\\
0 \\\\
0
\\end{bmatrix}+
t\\begin{bmatrix}
-2 \\\\
0 \\\\
1 \\\\
1
\\end{bmatrix}, s, t, \\in \\mathbb{R}
\\end{align*}
$$
