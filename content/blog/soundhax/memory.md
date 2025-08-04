+++
title = "How Computer Memory Works"
template = "article.html"
[extra]
disclaimer = "This is an ***extremely*** watered down summary of computer memory at a very high level. Memory is a complex subject and cannot be comprehensively explained in a blog post. Do not take everything you read here as fact."
+++

Understanding how computer memory works is crucial to grasping concepts like buffer overflows and heap exploitation. Let's break it down into byte-sized pieces!

---
# Types of Memory

1. RAM (Random Access Memory)
    - Like a workbench where the computer actively uses and manipulates data
    - Can be accessed and changed very quickly, but temporary (loses data when power is off) and low capacity
1. ROM (Read-Only Memory)
    - Permanent storage for essential instructions (like how to start up)
    - Can't be changed easily
1. Storage (Hard Drives, SSDs)
    - Long-term storage for files and programs
    - Slower than RAM, but retains data when powered off

We'll focus on RAM for this explanation, as that is what SoundHax abuses.

Think of computer memory as a giant bookshelf. Each shelf (or memory location) can hold a piece of information, and each has a unique address.

Memory is organized into:
1. **Bytes:** A basic unit (8 bits of information; <colorize>like a shelf</colorize>)
1. **Words:** A group of bytes <colorize>(A section of shelves)</colorize>

Each byte has a unique address, like a number on each shelf.

# Memory Allocation
Programs need to use memory. There are two main ways to do this: using a stack or a heap. Both are usually located in distinct memory regions.

## Stack
- Automatic and temporary storage
- Come and go like a stack of plates – the last one put on top is the first one to be taken out from the top
- Used for local variables and function calls

The stack grows downwards in memory (from higher addresses to lower addresses). Each function call creates a new frame on the stack:
```
Higher addresses
        ^
        |
0x2000  +------------------------+
        |     Main Function      |
        |------------------------|
        | Local Variable 1       |
        | Local Variable 2       |
        | Return Address         |
        |------------------------|-----
0x1F00  |   Function A Frame     |
        | Local Variable A1      | Function A's
        | Local Variable A2      | data lives here
        | Return Address         |
        |------------------------|-----
0x1E00  |   Function B Frame     |
        | Local Variable B1      | Function B's
        | Local Variable B2      | data lives here
        | Return Address         |
        +------------------------+-----
        |                        |
        |    (Stack grows        |
        |     downwards)         |
        v
Lower addresses
```
Notice how each function has its own little section out of memory for its variables and return address <small>(where in memory to go after finishing)</small>.

## Heap
- Dynamic storage that grows and shrinks
- Like a messy drawer where you can put and remove items anywhere
- Used for data that needs to persist longer or change in size

The heap grows upwards in memory (from lower addresses to higher addresses) and is composed of memory blocks. Memory blocks are allocated and freed dynamically as needed by the program.

```
Lower addresses
        ^
        |
0x3000  +------------------------+
        |   Allocated Block 1    |
        | (e.g., 128 bytes)      |
        |------------------------|
0x3080  |   Free Block           |
        | (e.g., 64 bytes)       |
        |------------------------|
0x30C0  |   Allocated Block 2    |
        | (e.g., 256 bytes)      |
        |------------------------|
0x31C0  |   Allocated Block 3    |
        | (e.g., 32 bytes)       |
        |------------------------|
0x31E0  |                        |
        |    (Heap grows         |
        |     upwards)           |
        |                        |
        +------------------------+
        |                        |
        v
Higher addresses
```
### Heap Chunks
Each block (either free or allocated) typically has a structure like the following:
```
+------------------------+ \
|   Previous chunk size  |  \                            
+------------------------+   \  Metadata                 
|     Size of chunk      |   /  (usually 8 or 16 bytes)  
| (including metadata)   |  /
+------------------------+ /
|                        |
|                        |
|   User data / Payload  |
|                        |
|                        |
+------------------------+
```

# The Buffer
A buffer is a temporary storage area in memory, like a box on our shelf. It has a fixed size.  
```
[ some data ][   Buffer (256 bytes)   ][  other data  ]
```
## Buffer Overflow
When we try to put more data into a buffer than it can hold, we get a buffer overflow. It's like trying to pour 5 cups of water into a 4-cup container. The water will spill onto other surfaces, ruining the adjacent surfaces. Likewise, the data spills into the next section(s) of information, corrupting them.
```
[Buffer (256 bytes)][Adjacent Data]
                   ↑
          Data overflows here
```
### Overflow on the Stack
Here's what the memory region of the program looks like before and after a program writes data beyond the bounds of an allocated buffer on the stack:
**Memory Layout Before Overflow:**
```
+------------------------+ <- Higher memory address
|     Other Data         |
+------------------------+
|     Return Address     |
+------------------------+
|  Saved Frame Pointer   |
+------------------------+
|   Local Variable 2     |
+------------------------+
|   Local Variable 1     |
+------------------------+
|                        |
|                        |
|   Buffer (64 bytes)    |
|                        |
|                        |
+------------------------+ <- Lower memory address
```
Let's say the program takes text input, and we fill and overflows the buffer with the letter A.

**Memory Layout After Buffer Overflow:**
```
+------------------------+ <- Higher memory address
|     Other Data         |
+- - - - - - - - - - - - +
|AAAAAAAAAAAAAAAAAAAAAAAA| <- Overwritten!
+- - - - - - - - - - - - +
|AAAAAAAAAAAAAAAAAAAAAAAA| <- Overwritten!
+- - - - - - - - - - - - +
|AAAAAAAAAAAAAAAAAAAAAAAA| <- Overwritten!
+- - - - - - - - - - - - +
|AAAAAAAAAAAAAAAAAAAAAAAA| <- Overwritten!
+- - - - - - - - - - - - +
|AAAAAAAAAAAAAAAAAAAAAAAA|
|AAAAAAAAAAAAAAAAAAAAAAAA|
|AAAAAAAAAAAAAAAAAAAAAAAA|
|AAAAAAAAAAAAAAAAAAAAAAAA|
|AAAAAAAAAAAAAAAAAAAAAAAA|
+------------------------+ <- Lower memory address
```

### Overflow on the Heap {#heap-overflow}
We can do something similar on the heap. If we're smart about it, we can trick the computer into executing code in locations it originally was not meant to. 

**Heap before overflow**
```
+------------------------+
|    Chunk A (in use)    |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |                  |  |
|  |    User Data     |  |
|  |                  |  |
+------------------------+
|    Chunk B (free)      |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |      next        |  |
|  +------------------+  |
|  |      prev        |  |
+------------------------+
|    Chunk C (in use)    |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |                  |  |
|  |    User Data     |  |
|  |                  |  |
+------------------------+
```

**Heap after overflow**
```
+------------------------+
|    Chunk A (in use)    |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |                  |  |
|  |    User Data     |  |
|  |                  |  |
|  |------------------|  |
|  | Overflow Data    |  |
+------------------------+
|    Chunk B (free)      |
|  +------------------+  |
|  | Corrupted Metadata| <-- Overwritten by overflow
|  +------------------+  |
|  | Corrupted next   |  |
|  +------------------+  |
|  | Corrupted prev   |  |
+------------------------+
|    Chunk C (in use)    |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |                  |  |
|  |    User Data     |  |
|  |                  |  |
+------------------------+
```

Since we know how the heap is structured, we can abuse this by creating a fake chunk header after overflowing Chunk A to trick the computer into reading our made up data as the metadata for another chunk.
```
+------------------------+
|    Chunk A (in use)    |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |                  |  |
|  |    User Data     |  |
|  |                  |  |
|  |------------------|  |
|  |   Overflow Data  |  |
+------------------------+
|    Chunk B (free)      |
|  +------------------+  |
|  | Fake Metadata    | <-- Controlled by attacker
|  +------------------+  |
|  | Controlled next  |  |
|  +------------------+  |
|  | Controlled prev  |  |
+------------------------+
|    Chunk C (in use)    |
|  +------------------+  |
|  |     Metadata     |  |
|  +------------------+  |
|  |                  |  |
|  |    User Data     |  |
|  |                  |  |
+------------------------+
```
