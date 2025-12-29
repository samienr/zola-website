+++
title = "Designing a CPU From Scratch, Part 3: Datapath"
date = "2025-12-29"
description = "The machine's musculoskeletal system"
[taxonomies]
tags = ["Projects", "Computer Architecture", "Designing a CPU"]
+++

Last time, we finished off with a very barebones set of components
for our RISC-V core. Now we can begin with the first half of most interesting part
of this process: connecting the datapath and creating the control signals.

Microarchitectures are typically divided into two parts: a datapath and a 
control unit. The datapath consists of structures that hold the architectural 
state of the machine (like those we made in Part 2 of these blogs). It also 
houses a bunch of combinational logic which is used to process that state
information and create new state information for the next state. This is what
we will be making in this blog entry.

This is all driven by the control unit, which receives state information from
the datapath, then tells the datapath what to do using control signals, such
as write enables, mux selectors, and any other "decisions" our datapath logic
has to make. We will figure out what control signals we need in Part 4 after
creating the datapath.

We will begin by putting together the components we made last time,
in addition to making some smaller components that will be needed
to make these connections. In the next part we will create a set of control
signals and a control unit to assert appropriate signals for each instruction.

# Pipeline Registers
Let's start by taking a look at the components we made in [Part 2](@/blog/designing-a-cpu-02/index.md).
<figure>
{{ image(url="basicComponents.png", hover=true) }}
<figcaption>The components we made in Part 2: PC, ALU, instruction and data memory</figcaption>
</figure>

Since this is a pipelined machine, before we wire everything up, we need
to think about what stage we want each component to be used in. Each instruction
will propagate through all five stages of the pipeline: instruction fetch (`IF`),
instruction decode (`ID`), address generation/execute (`AGEX`), memory access (`M`),
and writeback (`WB`). Since an instruction can only occupy one stage at a time,
we need a way to keep track of data and control signals for each instruction
as it traverses the pipeline stages. We will place registers between each stage
that will store whatever information an instruction may need as it is processed.
Now, whenever we want to place a component into the datapath, we need to consider
what stage it would best belong in.

We know that the instruction memory must be accessed using the address in the PC 
during `IF`, so we will place them there. The register file will need to be accessed
in `ID` so that source registers are ready to be accessed by the `AGEX` stage. The
data memory will obviously need to be accessed during the `M` stage.
<figure>
{{ image(url="pipelineRegs.png", hover=true) }}
<figcaption>Each of the aforementioned components closest to the pipeline registers they will access the most</figcaption>
</figure>

Now we will go through each pipeline stage and add whatever components are needed
to support every instruction in the RV32I instruction set.

# Fetch
The fetch stage is mostly already mostly done. The PC simply requests the I-cache
for whatever instruction is at the PC's address. The I-cache retrieves the instruction
and latches it into the `IF/ID` register. Additionally, the PC must update each with
each instruction. In most cases it is simply incremented by 4, but branch and jump
instructions will cause the PC to take another value. For this reason, we need to mux
in all its possible next values. The target addressses for branches and `jal` are
computed the same way, so those can share a mux input, and `jalr` will use the ALU
output, so that will also need its own mux input.

Now we can update the PC, however the PC does *not* change every cycle. As we
will discuss in the next blog, there are cases where pipeline stages may stall. When
this happens, we must not update the PC, hence we need to note that we need a control
signal to indicate whether or not the PC should be updated in a cycle.

And now that I've mentioned stalling, we might as well include some abstract hardware
for that too.
<figure>
{{ image(url="IF.png", hover=true) }}
<figcaption>Instruction fetch stage</figcaption>
</figure>

# Decode
## Control Unit
The decode stage takes the instruction fetched from the previous stage and figures out
what the rest of the datapath should do with the instruction. Part of this involves
producing the appropriate control signals for the instruction. Thus, the control unit
belongs in this stage. In our case, the control unit is really just a big ROM where each
entry is the set of control signals for a particular type of instruction. Since we don't
yet know which control signals are needed, we'll design the datapath components first,
assuming the control unit will provide the necessary signals. We'll specify the actual
control signal values once the datapath requirements are clear.

## Immediate Generator
Since the immediate bit derivations are different for each instruction type, the value generation
will use separate logic for each type of instruction. Depending on the instruction type, we will
then select which decoding scheme we will use for the current instruction. *"How will we choose?"*
you may ask *<small>(or not)</small>*. *This,* is the first place we will need to use a control
signal. The control unit will look at the instruction type and determine what the appropriate selector
bits for the immediate value mux should be. The correct value will come out of the mux and be latched
into the `ID/AGEX` register.

As for the implementation, it's just a matter of checking the opcode and then bit swizzling everything
together, then sign extending:

|Instruction Type | Expression |
|---------------|------------|
|I-type | `{ {20{inst[31]}}, inst[31:20] }` |
|S-type | `{ {20{inst[31]}}, inst[31:25], inst[11:7] }` |
|B-type | `{ {19{inst[31]}}, inst[31], inst[7], inst[30:25], inst[11:8], 1'b0 }` |
|U-type | `{ inst[31:12], 12'h000 }` |
|J-type | `{ {11{inst[31]}}, inst[31], inst[19:12], inst[20], inst[30:21], 1'b0 }` |

## Register File
Since RISC-V formats all its instruction types in a way such that the addresses of the
source and destination registers are always in the same bit fields, pulling data out of
the register file is trivial. To get our source registers, we simply need to get `IR[19:5]`
for `rs1` and `IR[24:20]` for `rs2`. By the end of the clock cycle, these registers should
be fetched and latched in for the `AGEX` stage. As for the destination register, whatever
instruction is currently in the decode stage is not going to be ready to write back results
just yet. In fact, the instructions that are ready to write back results will be those in the
`WB` stage. Because of this, we're not going to connect `we` or any of the `rd` inputs quite yet.
We'll come back to this later once we hit a stage where instructions are ready to write back their results.

<figure>
{{ image(url="ID.png", hover=true) }}
<figcaption>Instruction decode stage</figcaption>
</figure>

# Address Generation/Execute
Like the name suggests, this stage does a few things, including:
1. computing results for arithemic and logical operations
1. generating target addresses for memory accesses and branch/jump targets
1. producing conditional flags

## Execution
In Part 2, we discussed everything the ALU does. All of that happens here. All we have to do is
determine what the ALU's operands are and wire it up. Most instructions will simply involve using
two source registers. In these cases,  `ALU_A` and `ALU_B` will be `rs1` and `rs2`, respectfully.  
However, that is not all. I and U-type instructions use immediate values instead of `rs2`, so that
will need to be muxed. Additionally, the `auipc` instruction uses the PC instead of `rs1`, so that
will also need to be muxed.

## Address Generation
All address generation comes from adding the PC with an offset which comes from the instruction's
given immediate value. Since our immediate values were decoded and generated in the `ID` phase,
they are ready to use in the `AGEX` stage. We can trivially pull the immediate values values from
the `ID/AGEX` registers and then add that to the PC to get the correct PC offset. This is the target
address for branches, jumps, and memory loads/stores.

The `jalr` instruction is unique in that its target address comes from adding an immediate value
to a source register, meaning its address generation must come from the ALU if we don't want to add
more hardware. Additionally, RV32I requires that addresses generated by the `jalr` instruction are
half-word aligned, so the last bit must be 0. This is due to maintaining compatibility with
RV32C-capable machines.

## Condition Codes/Flags
To determine whether or not a branch should be taken, `rs1` and `rs2` are compared according to
what we mentioned in Part 2. Recall that when we made the ALU, the primary output was the result
of the arithmetic or logical operation. But the secondary outputs were the `zero`, `lt` and `ltU`
signals. We will use these as discussed in Part 2, along with another control signal to generate
the PCMUX signal used in the `IF` stage. The reason we need another signal is because of the jump
instructions. Since they are unconditional, we need a way to change our address no matter what.

## Control Hazard
Because it takes until the `AGEX` stage to determine what the next PC should be, this introduces
what is called a hazard: What do we do with the two instructions fetched immediately after a jump
or branch? We need a way to tell our machine to ignore those instructions in case the wrong
instructions were fetched. This is a control hazard and will be handled later in Part 4 after we
have a mostly complete control unit. This is because we want to have the entire big picture in mind
when managing hazards.

<figure>
{{ image(url="AGEX.png", hover=true) }}
<figcaption>Address generate/execute stage</figcaption>
</figure>

# Memory Access
The memory stage of the pipeline is quite simple in terms of hardware with our level of abstraction.
We only need to supply the data memory unit with an address and some control signals for write accesses.
If the current instruction is a load instruction, then the data of whatever is at the supplied address
must be latched for the `WB` stage.

We'll also need a control signal to ensure that accesses are processed
in an appropriate manner for the right data size for each instruction.

Additionally, since memory can
take several cycles to be ready, we will need to ensure that we know whether or not we are ready to move
the instruction to the next stage yet or if we need to wait a little longer for the memory to be ready.
<figure>
{{ image(url="M.png", hover=true) }}
<figcaption>Memory access stage</figcaption>
</figure>

# Writeback
This is arguably the simplest pipeline stage, as all it does is write whatever needs to be written into
whatever register needs to be changed, given that the instruction does need to write something to a register.

Many instructions will compute something with the ALU during `AGEX` and then write that result into `rd`, whose
address is given by the instruction. Load instructions will use the retrieved data from `M`, and jump instructions
will store the return linkage into `rd`.
<figure>
{{ image(url="WB.png", hover=true) }}
<figcaption>Writeback stage</figcaption>
</figure>

# Putting It All Together
Now that we have our individual stages, it is time to connect them all!
We're now halfway done with the CPU. All that's left now is determining control signals and
creating the control unit. After that, we need to consider hazards and then test the design
by hand-tracing all the RV32I instructions as a final verification step before we begin the
implementation for an FPGA.

<figure>

![](datapath.png#full-bleed)
<figcaption>Our (mostly) complete pipeline datapath</figcaption>
</figure>
