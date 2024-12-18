+++
title = "03 Row Echelon Form"
[extra]
katex = true
+++

A matrixis in Row Echelon Form if:
1. The **leading entry** (first non-zero number from left to right) in any row is to the right of the leading entries above it.
2. Every entry in a column below a leading entry is zero.
3. If there is a zero row, it is below all other rows.

$$
\\begin{bmatrix}
2 & 7 & 5 & 0 & 3 \\\\
0 & 0 & 2 & 1 & 6 \\\\
0 & 0 & 0 & 4 & 8 \\\\
0 & 0 & 0 & 0 & 0
\\end{bmatrix}
$$
> Notice the "staircase" like form of the matrix.  

2, 2, and 4 are considered *leading entries*.

---
# Reduced Row Echelon Form (rref)
Matrices are in **Reduced Row Echelon Form** (RREF) if they are in Row Echelon Form, **AND** the following:

4. Every leading Entry is 1
5. Every entry above and below any leading entries is 0

> Every matrix has a one unique rref form. 

$$
\\left[\\begin{array}{ccc|c}
\\fbox{1} & 0 & 0 & 3 \\\\
0 & \\fbox{1} & 0 & -4 \\\\
0 & 0 & \\fbox{1} & 5
\\end{array}\\right]
\\text{ is in rref.}
$$

They can look weird too:

$$
\\left[\\begin{array}{cccc|c}
\\fbox{1} & -2 & 0 & 3 & 4 \\\\
0 & 0 & \\fbox{1} & 2 & 1 \\\\
0 & 0 & 0 & 0 & 0 \\\\
\\end{array}\\right] \\text{ is also in rref.}
$$

The leading entries are boxed above. They are also called *pivots.*

Reduced Row Echelon Form makes it extremely easy to see the solutions to a system, keeping in mind that <colorize>each column is a variable.</colorize> 

All we have to do is go column by column and isolate the variables that are in pivot columns, and leave all other variables as *<colorize>free</colorize>*, meaning they can be anything. It might be helpful to add that variables that are not free are called *<colorize>basic variables.</colorize>*

$$
\\left[\\begin{array}{cccc|c}
1 & -2 & 0 & 3 & 4 \\\\
0 & 0 & 1 & 2 & 1 \\\\
0 & 0 & 0 & 0 & 0 \\\\
\\end{array}\\right]
\\implies \\begin{aligned}
x_{1} & = 4+2x_{2} -3x_{4} \\\\
x_{2} &\\text{ is free.} \\\\
x_{3} & = 1-2x_{4} \\\\
x_{4} &\\text{ is free.}
\\end{aligned}
$$

> **<colorize>Tip:</colorize>**
> If two augmented matrices have the same coefficient matrices, you can use the same operations to row reduce them.


