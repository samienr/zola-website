+++
title = "Lecture 1"
+++
# Why we study probability and random processes
- The world around us is random
- Comms systems are impaired by random noise
- Computer network traffic patterns are random
- clocks have jitter
- cant control randomness, but can understand and use that understanding to our advantage
---
# Basic Set Theory
- A set $S$ is a collection of objects which are elements of the set
- If $x$ is an element of $S$, we say $x \\in S$
- If $x$ is not an element of $S$, we say $x \\in S$
- If S has no elements, it is called the empty set $\\emptyset$
-  Sets can be:
	- Finite:
		- ex: $\\{ 1, 2, 3, 4 \\}$
	- Countable infinite
		- ex: $\\mathbb{Z}$
	- Uncountable
		- ex: $\\mathbb{R}$

## Relationships
### Subsets
$$S \\in T$$
### Equality
If every element of the set $S$ is also an element of set $T$, we say $S$ is a <colorize>"subset of $T$"</colorize>
>  If $S \\subset T$ and $T \\subset S$, then $S = T$.
#### Universal Set $\\Omega$
The set of all objects in the particular context.

### Complement
 The set of all elements of $\\Omega$ that do not belong to $S$
>  can be written as $S^{C}$ or $S^\\prime$

### Union
The set of all elements that belong to $S$ or $T$
### Intersection
The set of all elements that belong to both $S$ and $T$

## Algebraic Properties
### Commutative
$$
S \\cup T = T \\cup S
$$

$$
S \\cap T = T \\cap S
$$

### Associative
$$
S \\cup (T \\cup W) = (S \\cup T) \\cup W
$$

$$
S \\cap (T \\cap W) = (S \\cap T) \\cap W
$$

### Distributive
$$
S\\cup \\left( T\\cap W \\right) =\\left( S\\cup T \\right) \\cap \\left( S\\cup W \\right)
$$

$$
S\\cap \\left( T\\cap W \\right) =(S\\cap T)\\cup(S\\cap W)
$$

### De Morgan's Laws
$$
(S\\cap T)^\\prime=S^\\prime \\cup T^\\prime
$$

$$
(S\\cup T)^\\prime=S^\\prime\\cap T^\\prime
$$
