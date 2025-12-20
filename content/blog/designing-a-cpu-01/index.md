+++
title = "Designing a CPU From Scratch, Part 1: ISA"
date = "2025-10-26"
description = "Figuring out what we need"
[taxonomies]
tags = ["Projects", "Computer Architecture", "Designing a CPU"]
+++

I've been wanting to practice my understanding of computer architecture ever since I completed [this course](https://users.ece.utexas.edu/~patt/24f.460n/) during my studies. However, I didn't know Verilog at the time, so the most I could do was a cycle-accurate pipelined [simulator](https://github.com/samienr/ECE460N/tree/main/lab6/submission).

The goal is to take this project to the next level: **I'm going to make a synthesizable pipelined RISC-V core in RTL.** The goal is simple: create a pipelined, in-order processor that can execute RV32I instructions.

After I get some basic functionality, I will try to implement support for interrupts/exceptions. Then I'll explore caches, branch prediction, and out-of-order execution.

# Instruction Set Architecture
The instruction set architecture (ISA) is the contract between hardware and software, meaning it defines how instructions are encoded, what registers exist, and what operations a CPU can perform. It is **not** the implementation details. In other words, it defines *what* the CPU can do, but doesn't dictate *how.*

Choosing the ISA is a *very significant* decision as it affects the CPUs fundamental design, and everything that builds on it. This includes instruction encoding, register file, and memory.

Since the primary purpose of this project is the learning experience, I figured using the RV32I instruction set is a no-brainer. The abundance of resources due to RISC-V's open-source nature makes it a natural choice for such a learning exercise. 

With that in mind, I can start designing the individual logical components of the processor. I don't have the entire thing planned out yet, but I'm going to begin with the following components, then continue with whatever makes the most sense:
1. ALU
1. Register file
1. Decoder + control signals
1. We'll figure it out as we go

Once I get everything working, I'll try to get this running on an FPGA.

I'm optimistic I can get this done within a few months, but Murphy's Law *is* very much a thing.

