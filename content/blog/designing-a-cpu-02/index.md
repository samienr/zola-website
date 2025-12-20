+++
title = "Designing a CPU From Scratch, Part 2: Fundamental Components"
date = "2025-12-19"
description = "Understanding RV32I instructions and implementing the most basic hardware"
[taxonomies]
tags = ["Projects", "Computer Architecture", "Designing a CPU"]
+++
# Arithmetic Logic Unit (ALU)

After skimming through the RV32I instruction set, I figured I could start with
the arithmetic logic unit (ALU). The ALU is where most actual computations happen.
Its composition depends on what operations it needs to perform. For RV32I,
these are the operations I will need to implement for a functional ALU:

|Instruction |ALU Unit Needed |
|-------------|---------------|
|`add`, `addi`|Adder |
|`sub`, `slt`, `sltu`|Subtractor |
|`slli`, `srli`, `srai`, `sll`, `sra`, `srl`|Shifter |
|`and`, `or`, `xor`, `andi`, `ori`, `xori`| Primitive logic gates |

Our design will simply have circuitry to compute all these operations and
then multiplex out whatever an `ALU_Op` control signal requests.

I'm aware that there are some other instructions that do math, such as
`auipc` and `lui`. These operations will use their own dedicated
hardware outside of the ALU.

## Condition Codes/Flags

In addition to the operations, our machine also needs to generate condition
flags. RV32I doesn't really define how we will handle whether branches are
taken or not, so how we approach this is up to us. The simplest approach
I found was only checking for three conditions:

1. Is our result zero?
1. Is A < B? (unsigned)
1. Is A < B? (signed)

We can easily use the results of the subtractor for these signals. Every type of branch instruction we will need to consider can be resolved using these three conditions.

| Instruction | Logical Condition | ALU Signal |
|-------------|-------------------|------------|
|beq|A == B|Zero|
|bne|A != B|NOT Zero|
|bltu|A \< B (unsigned)|A < B (unsigned)|
|bgeu|A \>= B (unsigned)|NOT A < B (unsigned)|
|blt|A \< B (signed)|A < B (signed)|
|bge|A \>= B (signed)|NOT A < B (signed)|

The `zero` condition will simply check if A and B are equal to each other.  
The less than (unsigned) condition `ltU` will be computed by subtracting
`A - B` and taking the complement of the subtractor's borrow bit.  
The less than (signed) condition `lt` will use the same subtractor and
result. Its value will come from the `XOR` of the subtractor's borrow
bit and another signal that indicates whether or not the subtractor had overflow.

## ALU Code

```verilog
module ALU(
    input [31:0] A,
    input [31:0] B,
    input [3:0] ALU_Op,
    output reg [31:0] Result,
    output zero, lt, ltU
    );

wire [32:0] sub_full = {1'b0, A} - {1'b0, B};
wire sub_overflow = (A[31] ^ B[31]) & (sub_full[31] ^ A[31]);

assign zero = A == B;
assign lt  = sub_full[31] ^ sub_overflow;
assign ltU = ~sub_full[32];

always @(*)
begin
Result = 32'b0;
    case (ALU_Op)
        `ALU_ADD:       Result = A + B;
        `ALU_SUB:       Result = sub_full[31:0];
        `ALU_SHF_L:     Result = A << B[4:0];
        `ALU_SHF_R_L:   Result = A >> B[4:0];
        `ALU_SHF_R_A:   Result = $signed(A) >>> B[4:0];
        `ALU_AND:       Result = A & B;
        `ALU_OR:        Result = A | B;
        `ALU_XOR:       Result = A ^ B;
        `ALU_PASSB:     Result = B;
        `ALU_SLT:       Result = {{31{1'b0}}, lt};
        `ALU_SLTU:      Result = {{31{1'b0}}, ltU};
        default:        Result = A;
    endcase
end
endmodule
```

# Register File

This is one of the most trivial yet most important components to make.
Since we won't be doing anything superscalar or out-of-order just yet,
we can get away with writing a very simple register file with just two
read ports and one write port. Our ISA tells us that we have 32 registers
with 32 bits each. Since reading doesn't change state, we can make that
part combinational and save some time. However, since writing does change
state, it must be synchronized, so changes will only be made on rising
clock edges. Other than that, the only thing we need to keep in mind is
that the x0 register (address 0b00000) is always 0, and writing to it
makes no changes.

**EDIT:** Looks like I missed something here. Since this machine is going
to be pipelined, we need to account for the case where one register is being
written by one instruction, but is simultaneously being read by a future
instruction in an earlier phase of the pipeline. In this case, the value
that is being written must be forwarded to the next instruction, *not* the
value that was there before. To fix this, all we need is the ability to
directly output what is being written if the destination register happens
to be one of the source registers.

## Register File Code

```verilog
module RegFile(
    input clk,
    input [4:0] rs1,
    input [4:0] rs2,
    input we,
    input [4:0] wr_addr,
    input [31:0] wr_data,
    output [31:0] rd1,
    output [31:0] rd2
    );
    
    reg [31:0] registers[31:0];

    always @(posedge clk)
        if (we && wr_addr != 5'b0)
            registers[wr_addr] <= wr_data;

    assign rd1 = (rs1 == 0) ? 32'b0 : // read x0
                 (rs1 == wr_addr && we) ? wr_data : // bypass
                 registers[rs1]; // normal read

    assign rd2 = (rs2 == 0) ? 32'b0 :
                 (rs2 == wr_addr && we) ? wr_data :
                 registers[rs2];
endmodule
```

# Program Counter (PC)

Even more trivial than the register file is the PC. The PC is a simple 32-bit register
that can be updated every cycle. In real hardware, this would be driven by some reset
logic or a boot ROM.

## PC Code

```verilog
module PC(
    input clk,
    input we,
    input [31:0] in,
    output [31:0] out
    );
    
    reg [31:0] counter;
    initial counter = 32'h8000_0000;
    assign out = counter;
    always @(posedge clk)
        if (we) counter <= in;
    
endmodule
```

# Memory

Even though RISC-V architecturally has instruction and data memory unified,
I'm going to keep instructions and data separate in hardware as it makes
pipelining much less of a headache. They're usually cached separately in
most machines anyways.

## Instructions

We will make the instruction memory behave like a synchronous ROM.
We'll also ensure that it is only word addressable.

```verilog
// TODO: Add simulated delay

module InstructionMemory(
    input clk,
    input [31:0] addr,
    output reg [31:0] instruction
    );
    reg [31:0] mem [0:1023]; // 4KB Instruction Memory (1024 words)
// TODO: load test program    
//    initial $readmemh("program.hex", mem);

    always @(posedge clk)
        // chop off last two bits to ensure word aligned
        instruction <= mem[addr[11:2]];
        
endmodule
```

## Data

Data memory is a little more complicated as we need to be able to operate on
bytes, halfwords, and words for stores. I'm just going to model this internally
as an array of 8-bit registers. The input and output will be in terms of words,
and a `byte_en` signal will determine how many bytes are actually going into memory.

```verilog
// word aligned accesses only from core's POV, internally byte addresable
module DMem(
    input clk,
    input we,
    input [3:0] byte_en,
    input [31:0] addr,
    input [31:0] din,
    output reg [31:0] dout,
    output ready
    );
    
    assign ready = 1'b1; // TODO: simulate delay
    
    reg [7:0] mem[0:4095]; // 4KB addressable
    
    always @(posedge clk) begin
        dout <= {mem[addr[11:0] + 3], 
                 mem[addr[11:0] + 2], 
                 mem[addr[11:0] + 1], 
                 mem[addr[11:0]]};
        if (we) begin
            if (byte_en[0]) mem[addr[11:0]] <= din[7:0];
            if (byte_en[1]) mem[addr[11:0] + 1] <= din[15:8];
            if (byte_en[2]) mem[addr[11:0] + 2] <= din[23:16];
            if (byte_en[3]) mem[addr[11:0] + 3] <= din[31:24];
        end
    end
    
endmodule
```

# What's Next?

Now we have the most basic components, we are ready to think about how we
will decode instructions and wire the datapath. That will involve creating
the control signals, logic relating to control signals, smaller intermediate
components depending on what instructions need, and the pipeline registers.
After we do that, all that should be left is hazard control, handling
branches, and testing.

For now, feel free to take a look at the
[source HDL code I have so far on my GitHub.](https://github.com/samienr/risc-v-toy)
Until then, take care!
