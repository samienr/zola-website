+++
title = "02 Matrices"
+++

A matrix is an array of symbols consisting of $m$ rows and $n$ columns. Matrices are usually given a capital letter for their symbol.

{% katex() %}
A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
\vdots &\ddots  &  & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
{% end %}

## Size
The size of a matrix is its number of rows by its number of columns. The size of A would be $m \times n.$
> **Example:** if $ B = \\begin{bmatrix} 2 & -7 & 5 \\\\ 0 & 3 & 1 \\end{bmatrix},$ then $B$ is a $2\\times 3$ matrix.

## Entries
**Entry: A single symbol in a matrix.**

For example, using the same matrix $B$, we can refer to entries using the following format: $b_{ij},$ which would point to the entry at the $i$th row and $j$th column of $B.$

{% katex() %}
\begin{align*}
b_{23} & = 1 \\
b_{32} &\text{ undefined.}
\end{align*}
{% end %}

---
# Elementary Row Operations
There are 3 operations:
1. **Replacement**: Replace a row with the sum of said row and a multiple of another row.
{% katex() %}
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix} R_{2}-2R_{1} \equiv
\begin{bmatrix}
1 & 2 & 3 \\
2 & 1 & 0 \\
7 & 8 & 9
\end{bmatrix}
{% end %}

2. **Interchange**: Swap 2 rows.
{% katex() %}
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix} R_{3} \leftrightarrow R_{1} \equiv
\begin{bmatrix}
7 & 8 & 9 \\
4 & 5 & 6 \\
1 & 2 & 3
\end{bmatrix}
{% end %}

3. **Scale**: Multiply a row by a nonzero number.
{% katex() %}
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix} R_{1}\cdot 3 \equiv
\begin{bmatrix}
3 & 6 & 9 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
{% end %}
