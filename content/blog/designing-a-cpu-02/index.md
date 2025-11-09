+++
title = "Designing a CPU From Scratch, Part 2: Arithmetic Logic Unit"
date = "2025-10-27"
description = "Understanding RV32I instructions and implementing arithmetic operations"
draft = true
[taxonomies]
tags = ["Projects", "Computer Architecture", "Designing a CPU"]
+++

After skimming through the RV32I instruction set, I figured I could start with the arithmetic logic unit (ALU). The ALU is where most actual computations happen. Its composition depends on what operations it needs to perform. For RV32I, these are the operations I will need to implement for a functional ALU:

1. adder/subtractor/comparator
1. AND
1. OR
1. XOR
1. shifters (left, logical right, arithmetic right)
1. overflow detection
1. flag/condition code output
1. move/pass operand

