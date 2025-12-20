+++
title = "Designing a CPU From Scratch, Part 3: Datapath and Control Unit"
date = "2025-12-19"
description = "Giving some muscle and brains to this machine"
draft = true
[taxonomies]
tags = ["Projects", "Computer Architecture", "Designing a CPU"]
+++

Last time, we finished off with a very barebones set of components
for our RISC-V core. Now we can begin with the most interesting part
of this process: connecting the datapath and creating the control signals.

In this part we will be putting together the components we made last time,
in addition to making some more smaller components that will be needed
to make these connections. We will also have to create a set of control
signals and a control unit to assert appropriate signals for each instruction.

# Immediate Generator

# Control Signals
- make tables defining what each signal is, what it's used for, and what it means

# Control Unit
- some stuff about instruction decoding and then make the instruction decoder
- two level decoding: one for opcode, one for funct3/7

# Pipeline Registers

# Datapath Wiring

- Make hazards and bypassing part 4
