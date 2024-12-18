+++
title = "01 Systems of Equations"
[extra]
katex = true
+++

A **system of linear equations** is a collection of linear equations with some variables in common, such as

$$
\begin{aligned}
&a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n} &= b_{1} \\\\
&a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n} &= b_{2} \\\\
&a_{31}x_{1}+a_{32}x_{2}+\cdots+a_{3n}x_{n} &= b_{3} \\\\
&\vdots \\\\
&a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n} &= b_{m} \\\\
\end{aligned}
$$

where all $a$'s and $b$'s are known, and $x$'s are unknown.

<dl>
<dt>Solution</dt><dd>All $x$'s that solve every equation simultaneously</dd>
<dt>Solution Set</dt><dd>The set of all possible solutions to the system.</dd>
</dl>

> Two systems are equivalent if the solution sets are equivalent.

## Three possibilities for the solution set

<dl>
<dt>No solutions</dt>
<dd>
Same slope, parallel lines
{{ image(url='nosol.svg', transparent=true, svg=true) }}
</dd>
<dt>One unique solution</dt>
<dd>
Lines cross once
{{ image(url='onesol.svg', transparent=true, svg=true) }}
</dd>
<dt>Infinitely many solutions</dt>
<dd>
Equivalent Systems
{{ image(url='infsol.svg', transparent=true, svg=true) }}
</dd>
