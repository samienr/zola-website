+++
title = "How The Nintendo 3DS Was Hacked Using a Music File"
date = "2025-08-06"
description = "A deep dive into the SoundHax exploit"
[extra]
toc = true
+++

[SoundHax](https://soundhax.com) was one of the most accessible exploits to get unsigned code running on the Nintendo 3DS. It worked by abusing a bug found in the *Nintendo 3DS Sound* application with a specially-crafted `.m4a` file.

The exploit was special as it was the first exploit on the 3DS that was free, offline, and worked on every version of the firmware as of when it was discovered. 

To fully appreciate this brilliant symphony of hacks, a basic understanding of memory management is recommended. I wrote a quick and dirty explainer [over here](memory) if you want a fast refresher.

<small>Before proceeding, I'd also highly suggest reading the writeup on [Nedwill's GitHub page](https://github.com/nedwill/soundhax?tab=readme-ov-file#writeup)</small>

---

# The Vulnerability
For context, the M4A format uses the MP4 file formt. At its core, SoundHax exploits a bug in how the *Nintendo 3DS Sound* application handles MP4 atom tags.

That is, when loading in an M4A file, a 256-byte buffer is allocated on the heap for song names (the max size according to the MP4 spec). 
The song name is then copied from the file into the buffer using one of two functions:
- For ASCII strings, `strncpy(dst, src, 256)` is used, which is safe.
- For Unicode strings, `memcpy()` is used, which **takes a user-provided size** instead of 256 <small>(not safe!)</small>. 

Unicode strings likely didn't use `strncpy()` because it stops at the first null terminating byte <small>(which is used for marking the end of an ASCII string)</small>. Unicode can have null bytes as parts of characters, which means that `strncpy()` wouldn't work well.

Instead, song names are simply gathered by copying over as many bytes as the file specifies, **even if the number is greater than 256.** 

This means that the program code is vulnerable to a <colorize>**buffer overflow attack.**</colorize> 
By providing a carefully crafted Unicode title longer than 256 bytes, an attacker can write data **beyond the allocated buffer and into other parts of console memory.**

# The Exploit
Taking advantage of this bug, we can get arbitrary code execution on the 3DS using the following steps:
1. Creating an M4A file with an oversized Unicode title
1. Causing a Buffer Overflow in the Heap
1. Corrupting the Heap Metadata
1. Unlink Exploitation

Anyways, here's how it works.

## 1. Crafting the malicious File
The exploit begins with the construction of a M4A file containing a specially crafted Unicode title that's intentionally oversized. Nedwill used a Python script to do this:
```python
# Start with some text for the song title: "3 nedwill 2016"
title = "<\x003\x00 \x00n\x00e\x00d\x00w\x00i\x00l\x00l\x00"
# Add a bunch of zeros to make the title 772 bytes long
title += " \x00"*((772-len(title)) / 2) # Way bigger than 256 bytes!
```
This creates a 772 byte string for the title. But this alone isn't enough. 

The MP4 file format needs each piece of data to be labeled with its exact size. In other words, we also need the file metadata to tell the 3DS how long this title is. When the rest of this Python script builds the final M4A file, it calculates the length of our oversized title and embeds it as binary data into the file header, like any other MP4 file is structured.

The file isn't lying about anything, it genuinely contains 772 bytes of title data, properly labeled and all. It's just that 772 bytes is *way too many* bytes for a title, and it goes well over the allocated space of 256 bytes. This means that the rest of the 516 bytes end up writing over other regions of memory.

## 2. Triggering the Heap Overflow
When the *Nintendo 3DS Sound* application encounters our special file, it will read the size field in the file metadata, sees "772 bytes of title data," and trustingly pass this value to the `memcpy()` function without questioning whether 772 bytes is a reasonable length for a song title.

When this happens, the 3DS:
1. allocates the standard 256-byte buffer.
2. uses `memcpy` with our provided length.
3. copies our oversized title, writing beyond the buffer's boundaries

## 3. Heap Manipulation and Unlink Exploitation
### Heap Manipulation
The heap overflow allows us to manipulate the heap's metadata structures. Modern heap implementations maintain information about memory chunks, including:
- Chunk sizes
- Usage status
- Forward/backward pointers
- Boundary tags

By overflowing into these structures, we can override some of this metadata and fool the heap manager into operating using this fake data. If you're a little confused, [take a look at this](memory#heap-overflow)

### Unlink Exploitation
When the heap manager needs to free a chunk, it performs an "unlink" operation to remove the chunk from its internal data structures and possibly also merge it with adjacent free chunks.

Part of this operation involves updating the forward and backward pointers of a chunk. This process assumes that the chunk metadata is trustworthy. Our fake chunk exploits this trust to achieve arbitrary memory writes.

This typically looks something like this:  
```C
chunk->fd->bk = chunk->bk;
chunk->bk->fd = chunk->fd;
```
The allocator pretty much goes "if this chunk says its next chunk is at address X, then I'll update the chunk at address X to point back to the previous chunk." Except we are in control of those addresses. That is to say, we choose what address X is, and we control what the previous chunk's address is, so we can make the allocator write an arbitrary value to an arbitrary location, A.K.A. an arbitrary write primitive.

## 4. Stack Manipulation | "Heap Feng Shui"
With control over the unlink operation, we can write to any memory location. However, this power must be wielded strategically. The SoundHax exploit uses a technique known as *heap feng shui* to gain control over the program's execution stack.

The goal is to trick the heap allocator into returning a stack address when the program next requests a memory allocation. As for what this stack address is, Nedwill had to painstakingly find a particular address that's contents look like a valid heap chunk with seemingly proper heap chunk metadata values

We use our arbitrary write primitive to overwrite the heap's free list header with this stack address (via the unlick exploitation). At the same time, we manipulate the size field of the chunk being freed to make it appear very small, preventing it from being a viable option the next time the allocator looks for a free chunk. This sets up our fake stack "chunk" as the primary candidate for the next allocation.

When the program makes its next `malloc()` call, the heap allocator searches through the free list looking for a suitable block. It finds our fake chunk on the stack, validates that it has enough space and proper metadata, and then returns the stack address as if it were heap memory.

## 5. ROP Chain Construction and Execution
With step 4, the application writes data to what it thinks is allocated heap memory, but it's actually writing to the program's execution stack. Since the stack contains values such return addresses and the local variables of functions, we now have access to control the program's execution flow.

Unfortunately for us, however, we can't go ahead and just write in instructions (A.K.A. shellcode) just yet. Modern systems, such as the one on the 3DS, have some protections to prevent executing code on the stack or heap. However, we can work around this by using a technique known as Return-Oriented Programming (ROP), which chains together small pieces of existing code to perform our desired operations.

This of ROP as something like the cut-up technique, where an artist cuts scraps out of a book or magazine, then rearranges these scraps to create a new text the author never intended.
{{ image(url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cut_up_text.jpg/477px-Cut_up_text.jpg", hover=true, alt="An example of the cut-up technique", caption="Imagine each one of these scraps is a piece of code.") }}

Each piece of code, or "gadget," in our ROP chain is a small fragment of actual program code that performs a simple operation, like loading a register or calling a function, then returns control to the next gadget in the sequence.

The SoundHax ROP chain performs a handful of operations. First, it copies our second-stage payload from the stack to heap memory. Next, it sets up parameters for some GPU operations. Then it actually calls said GPU functions to perform memory copynig operations that would normally be forbidden (more in this in the next section). Finally, it transfers control to our newly-positioned code.

Each step of this process uses code that already exists in the application's memory space, making it extremely difficult for most prevention mechanisms to detect our attack.

## 6. GPU-Assisted Code Injection (gspwn)
I briefly mentioned GPU functions. Now let's actually talk about why we're using graphics calls and how genius this move is.

When gaining code execution through the ROP chain, we were still constrined by the system's memory protection mechanisms, meaning that we weren't yet able to overwrite any of the application's code segment from userland. This usually isn't allowed as that would violate a bunch of security boundaries-- user applications *should* be kept separate from system code.

Nedwill's solution to get around this was pretty creative: Abusing the 3DS's GPU. The GPU has special privileges to perform direct memory access (DMA) transfers between memory regions. This means that while almost nothing should be able to copy data from heap memory into the executable text segment of running applications, the GPU *can.*

This technique, known as 'gspwn' in the 3DS homebrew community, effectively bypasses the system's code signing and memory protection by using the GPU as an unwitting accomplice in our attack. The GPU doesn't know or care that we're abusing its power, it simply performs whatever operation is requested.

## 7. Full Code Execution
With our payload now residing in executable memory, the final step is to transfer control to it. Our ROP chain concludes by jumping to the newly-written code, which implements a second-stage loader that performs the final steps of the compromise.

The stage-2 payload handles some housekeeping tasks. It disables potentially problematic system threads that might interfere with homebrew eecution. It opens and reads the `otherapp.bin` file from the SD card, which contains the <colorize>homebrew launcher.</colorize> For the uninitiated, the homebrew launcher is the gateway to running homebrew applications, a.k.a. unsigned code that can be written by anyone without Nintendo's approval. Accessing the homebrew launcher is most often the first goal of modding any Nintendo console. The ROP chain uses the GPU one more time to copy this payload into memory and transfer control to it.

At this point, the system is fully compromised and running arbitrary unsigned code with the same privileges as the original Sound application. The user will now see the homebrew launcher appear on screen.

# Conclusion
Unlike many other exploits for various game consoles, SoundHax required no internet connection, specific games, hardware modifications, or any complex setup procedures. Users could simply download the appropriate M4A file for their region and firmware version, copy it to their SD card, and play it through tht built-in *Nintendo 3DS Sound* application.

SoundHax was patched as of firmware version 11.4 and no longer works on any Nintendo 3DS system running firmware 11.4 or higher.
