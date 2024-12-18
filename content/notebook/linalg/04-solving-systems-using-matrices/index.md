+++
title = "04 Solving Systems of Equations Using Matrices"
[extra]
katex = true
+++

Before we begin, we need to understand the **augmented matrix.**

# Augmented Matrix
An augmented matrix is a type of matrix that can be used to solve systems of equations.

Given a system of linear equations:

$$
\\begin{aligned}
&a_{11}x_{1}+a_{12}x_{2}+\\cdots+a_{1n}x_{n} =b_{1} \\\\
&\\vdots \\\\
&a_{m_{1}}x_{1}+a_{m2}x_{2}+\\cdots+a_{m}x_{n}=b_{m}
\\end{aligned}
$$

We can extract the coefficients ($a$'s) into a matrix:

$$
A =
\\begin{bmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
\\vdots &\\ddots  &  & \\vdots \\\\
a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{bmatrix}
$$

Now include the other side of the equation using an augmented matrix:

$$
\\left[\\begin{array}{ccc|c}
a_{11} & \\cdots & a_{1n} & b_{1} \\\\
a_{21} & \\cdots & a_{2n} & b_{2} \\\\
\\vdots \\\\
a_{m1} &\\cdots & a_{mn} & b_{m}
\\end{array}\\right]
$$

> The bar is like an = sign.

---

# Solving a System

1. Given a system of linear equations:

$$
\\begin{aligned}
&a_{11}x_{1}+a_{12}x_{2}+\\cdots+a_{1n}x_{n} =b_{1} \\\\
&\\vdots \\\\
&a_{m_{1}}x_{1}+a_{m2}x_{2}+\\cdots+a_{m}x_{n}=b_{m}
\\end{aligned}
$$
Convert the system into an augmented matrix.

2. We can now use elementary operations to get our augmented matrix into reduced row echelon form (RREF) to get our solutions.

> **<colorize>Tips:</colorize>**
> - If there is a pivot outside the coefficient matrix, it means that there are no solutions to the system (the system is inconsistent).
> - If the system is consistent, there are two possibilities:
> - If there are any free variables, there are infinitely many solutions.
> - If there are no free variables (every column has a pivot), there is one unique solution which can be solved for.
> - A row of zeros does not imply anything.

## Example Problem

Solve for $x, y,$ and $z$ in:

$$
\\begin{aligned}
-4x+3y +3z&=-2 \\\\
-2x+ y &=-3 \\\\
3x-2 y -z&=3
\\end{aligned}
$$

1. Rewrite the system as an augmented matrix.

$$
\\left[\\begin{array}{ccc|c}
-4 & 3 & 3 & -2 \\\\
-2 & 1 & 0 & -3 \\\\
3 & -2 & 1 & 3
\\end{array}\\right]
$$

2. Row reduce the matrix.

$$
\\left[\\begin{array}{ccc|c}
1 & 0 & 0 & 2 \\\\
0 & 1 & 0 & 1 \\\\
0 & 0 & 1 & 1
\\end{array}\\right] \\implies
\\begin{aligned}
x=2 \\\\ y=1 \\\\z=1
\\end{aligned}
$$
