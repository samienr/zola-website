+++
title = "07 Linear Combinations"
+++


If $\vec{v_{1}}, \vec{v_{2}}, \dots , \vec{v_{k}} \in \mathbb{R}^n$ and $c_{1}, c_{2}, \dots, c_{k} \in \mathbb{R}$, then

{% katex() %}
c_{1}\vec{v_{1}}, c_{2}\vec{v_{2}}, \dots, c_{k}\vec{v_k}
{% end %}
is a *<colorize>linear combination</colorize>* of the $\vec{v}$'s using $c$'s as *<colorize>weights</colorize>*.

> A linear combination is just a scaled column vector that can be written in terms of other vectors

*Example:*

{% katex() %}
\begin{align*}
c_{1} \begin{bmatrix}
1 \\
4 \\
7
\end{bmatrix}
+c_{2} \begin{bmatrix}
2 \\
5 \\
8
\end{bmatrix}
+c_{3} \begin{bmatrix}
3 \\
6 \\
9
\end{bmatrix}
&= \begin{bmatrix}
1 \\
1 \\
1
\end{bmatrix} \\ \\
\implies c_{1}+2c_{2}+3c_{3}&=1 \\
4c_{2}+5c_{2}+6c_{3} & =1 \\
7c_{1}+8c_{2}+9c_{3} & =1
\end{align*}
{% end %}

If $\begin{bmatrix}1\\\\1\\\\1\\end{bmatrix}$ can be be written in terms of $\begin{bmatrix}1\\\\4\\\\7\end{bmatrix}, \begin{bmatrix}2\\\\5\\\\8\end{bmatrix},$ and $\begin{bmatrix}3\\\\6\\\\9\end{bmatrix},$ then it is a linear combination of the 3 aforementioned matrices.
