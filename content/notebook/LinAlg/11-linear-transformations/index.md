+++
title = "11 Linear Transformations"
+++

{% katex() %}
T: \mathbb{R}^n \to \mathbb{R}^m
{% end %}
<figcaption>A function/transformation that maps an input from one vector space into another.</figcaption>

#### Properties
A *<colorize>linear transformation</colorize>* is a type of function that satisfies 2 properties:
<dl>
    <dt>
        $\forall \vec{u}, \vec{v} \in \mathbb{R}^n, T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v})$
    </dt>
    <dd>
        Respects vector addition
    </dd>
    <dt>
        $\forall \vec{u} \in \mathbb{R}, \forall c \in \mathbb{R}, T(c\vec{u}) = cT(\vec{u})$
    </dt>
    <dd>
        Respects scalar multiplication
    </dd>
</dl>

#### Matrix Representation
Every linear transformation $T$ can be represented as a matrix, such that $T(\vec{v}) = A\vec{v}$ for all $\vec{v} \in \mathbb{R}^n$. $A$ is determined by how $T$ maps a basis of $\mathbb{R}^n$ to a basis of $\mathbb{R}^m$.

## Examples
### Dilation <small>and contraction</small>
Define $T: \mathbb{R}^2 \to \mathbb{R}^2$ as a dilation by a factor $k$:

{% katex() %}
T(\vec{v}) = k\vec{v} \text{ for } \vec{v} = \begin{bmatrix} x \\ y \end{bmatrix} \in \mathbb{R}^2.
{% end %}

 $T(\vec{u}) = k\vec{u}$
- **Addition**: $T(\vec{u} + \vec{v}) = k(\vec{u} + \vec{v}) = k\vec{u} + k\vec{v} = T(\vec{u}) + T(\vec{v}) \\; \checkmark$
- **Scalar Multiplication**: $T(d\vec{u}) = k(d\vec{u}) = d(k\vec{u}) = dT(\vec{u}) \\; \checkmark$

Matrix representation:

{% katex() %}
A = \begin{bmatrix}
k & 0 \\
0 & k
\end{bmatrix}
{% end %}

{{ image(url='dilation.svg', transparent=true, svg=true) }}
<figcaption>Points (0,1) and (1,0) dilated by a factor of 2.</figcaption>
