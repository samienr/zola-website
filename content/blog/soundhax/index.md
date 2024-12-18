+++
title = "How The Nintendo 3DS Was Hacked Using a Music File"
date = "2024-09-17"
description = "A deep dive into the SoundHax exploit"
[extra]
toc = true
+++

[SoundHax](https://soundhax.com) was one of the most accessible exploits to get unsigned code running on the Nintendo 3DS. It worked by abusing a bug found in the *Nintendo 3DS Sound* application with a specially-crafted `.m4a` file.

The exploit is special as it was the first exploit on the 3DS that was free, offline, and worked on every version of the firmware as of when SoundHax was launched. 

To fully appreciate this brilliant symphony of hacks, a basic understanding of [memory management](memory) is recommended.

<small>Before proceeding, I'd also highly suggest reading the writeup on [Nedwill's GitHub page](https://github.com/nedwill/soundhax?tab=readme-ov-file#writeup)</small>

---

## The Vulnerability
At its core, SoundHax exploits a bug in how the 3DS Sound application handles MP4 atom tags:

1. A 256-byte buffer is allocated for song names (the maxsize according to the MP4 spec).
    - The song name is then copied from the file into the buffer using one of two functions.
1. For ASCII strings, `strncpy(dst, src, 256)` is used, which is safe.
1. For Unicode strings, `memcpy` is used, which **takes a user-provided size** instead of 256 <small>(not safe!)</small>. 

This was likely because `strncpy` stops at the first null terminating byte <small>(which works for ASCII strings)</small>. As Unicode can have null bytes as parts of characters, `strncpy` wouldn't work well.

Instead, song names are simply gathered by copying over as many bytes as the file specifies, even if the number is greater than 256. 

This means that the program code is vulnerable to a <colorize>**buffer overflow attack.**</colorize>
By providing a carefully crafted Unicode title longer than 256 bytes, an attacker can write data beyond the allocated buffer and into other parts of console memory.

### The Exploit Chain
Taking advantage of this bug, we can get arbitrary code execution on the 3DS using the following steps:
1. Crafted M4A file with oversized Unicode title
1. Buffer overflow in heap
1. Heap manipulation (fake chunk creation)
1. Unlink exploitation
1. Arbitrary write primitive
1. ROP chain setup
1. gspwn GPU exploit
1. Code execution

Anyways, here's how it works.

# 1. Attack Plan
The goal is to create a specially crafted `.m4a` "audio" file with an oversized Unicode title to overflow the heap.
