+++
title = "09 Matrix Equation"
+++

{% katex() %}
A\vec{v}=\vec{b}
{% end %}

If $A$ is an $m\times n$ matrix and $\vec{x}$ is a vector in $\mathbb{R}^n,$ then

{% katex() %}
A\vec{x} = \begin{bmatrix}
\vec{}{a_{1}} & \vec{a}_{2} & \cdots & \vec{a}_{i}
\end{bmatrix} \begin{bmatrix}
x_{1} \\
x_{2} \\
\vdots \\
x_{n}
\end{bmatrix},
{% end %}
where $\vec{a}_{i}$ is the $i$th column of $A$.

{% katex() %}
= x_{1}\vec{a}_{1}+x_{2}\vec{a}_{2} +\cdots+x_{n}\vec{a}_{n},
{% end %}

{% katex() %}
A \in \mathbb{R}^{m\times n}, \vec{x} \in \mathbb{R}^n, \vec{b} \in \mathbb{R}^m.
{% end %}
which is a linear combination of the columns of $A$ using the coefficients of $A$ as weights.

What this means is that $A\vec{x} = \vec{b}$ only has a solution **if, and only if,** $\vec{b}$ is a linear combination of the columns of $A$.

> Given $A \in \mathbb{R}^{m\times n}$,
> 1. $\forall \vec{b} \in \mathbb{R}^n, A\vec{x}=\vec{b}$ has a solution.
> 2. each $\vec{b} \in R^m$ is a linear combination of the columns of $A$.
> 3. The columns of $A$ span $\mathbb{R}^m$
> 4. $A$ has a pivot in every row.

### Example 1

{% katex() %}
\begin{bmatrix}
-2 & 3 & 5 \\
0 & 1 & 7
\end{bmatrix}
\begin{bmatrix}
-1 \\
0 \\
5
\end{bmatrix}
=
-1 \begin{bmatrix}
-2 \\ 0
\end{bmatrix}
+0 \begin{bmatrix}
3 \\
2
\end{bmatrix}
+
5 \begin{bmatrix}
5 \\
7
\end{bmatrix}
{% end %}

## A Real Example
Given

{% katex() %}
\left[\begin{array}{ccc|c}
-2 & 1 & 0 & b_{1} \\
1 & 1 & 3 & b_{2} \\
-1 & 0 & -1 & b_{3}
\end{array}\right],
{% end %}
for what values of $b_{1},b_{2},b_{3}$ does this system have a solution?  
After $\text{rref}$ing the matrix, you get

{% katex() %}
\left[\begin{array}{ccc|c}
1 & 0 & 1 & -b_{3} \\
0 & 1 & 2 & b_{3}+b_{2} \\
0 & 0 & 0 & b_{1}-b_{2}-3b_{3}
\end{array}\right].
{% end %}
This means that there is a solution to this system so long as $b_{1}-b_{2}-3b_{3} = 0$,
If $b_{1}-b_{2}-3b_{3} \neq 0$, then the system is *inconsistent.*

> So we can guarantee that we always have a solution when there is a pivot in every row.

