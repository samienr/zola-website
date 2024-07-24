+++
title = "05 Vectors"
+++

A *<colorize>column vector</colorize>* is a matrix which has just **one column.**

{% katex() %}
\vec{v} = \mathbf{v}=\begin{bmatrix}
v_{1} \\
v_{2} \\
\vdots \\
v_{n}
\end{bmatrix}
{% end %}

# Column Vector Operations
## Vector Addition
If $\vec{u}$ and $\vec{v} \in \mathbb{R}^n,$ then

{% katex() %}
\vec{u}+\vec{v}=\begin{bmatrix}
\vec{u_{1}+\vec{v_{1}}} \\
\vec{u_{2}+\vec{v}_{2}} \\
\vdots \\
\vec{u}_n+\vec{v}_{n}
\end{bmatrix}.
{% end %}
$\vec{u}$ and $\vec{v}$ **must be the same size.** ($\mathbb{R}^{2}$ is **not** in $\mathbb{R}^{3}$)


**Example:**
Given $\\vec{v}=\\begin{bmatrix}2 \\\\2 \\end{bmatrix}$ and $\\vec{u}=\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}$, 

{% katex() %}
\mathbb{u+v}=
\begin{bmatrix}
2+3 \\
2+1
\end{bmatrix}
=
\begin{bmatrix}
5 \\
5
\end{bmatrix}.
{% end %}

## Scalar Multiplication
if $\vec{u} \in \mathbb{R}^n$ and $c \in \mathbb{R}$, then

{% katex() %}
c\vec{u}=\begin{bmatrix}
c\vec{u_{1}} \\
c\vec{u_{2}} \\
\vdots \\
c\vec{u_{n}}
\end{bmatrix}.
{% end %}

Example:

{% katex() %}
\begin{align*}
\text{Given } A=\begin{bmatrix}
4 \\
7 \\
9
\end{bmatrix} \text{ and } b&=2, \\
Ab&=\begin{bmatrix}
8 \\
14 \\
18
\end{bmatrix}.
\end{align*}
{% end %}

We will discuss the cross and dot products at a later time.
