+++
title = "11 Linear Transformations"
+++

{% katex() %}
T: \mathbb{R}^n \to \mathbb{R}^m
{% end %}

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
