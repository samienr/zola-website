+++
title = "How I Designed My First Custom Keyboard"
date = "2024-06-14"
+++

I've been into custom mechanical keyboards for a while, but the absurdly high costs and long wait times for parts pushed me towards a different solution: designing and building a keyboard myself. As a college student, affordability and quick access are key, and the custom keyboard is just the opposite of that, so I decided to take on this project myself.

I figured if I were going to design the keyboard entirely myself, I might as well make it as *custom* as possible. I was going to design this keyboard something *just for myself*.
***
# Step 1: The Design
Within a few weeks of [snooping around online](https://reddit.com/r/ErgoMechKeyboards), I discovered a whole world of bizarrely-shaped, split keyboards. I very quickly became inspired by the [Lily58](https://github.com/kata0510/Lily58) and the [Corne](https://github.com/foostan/crkbd). I learned that the  motivation behind these strange layouts came from two goals that I had myself:
1. Reducing finger movement
2. Enhanced typing comfort

Both of these goals are achieved by two design choices:
1. Less keys = less places for my fingers to go
2. Key placement matching the natural positioning of fingers— meaning a split layout

To start, I mapped out a rough layout by tracing my finger movements using a painting app on an iPad.
![Traced finger positions](finger_paint.png)  

That gave a basic idea of the where each finger naturally goes as I extend them.

As for hardware, I chose:
- **Seeed Studio XIAO nRF52840** microcontroller for its Bluetooth Low Energy capability, affordable price, and ARM architecture.
- **Kalih Choc Red switches** for their low profile and because I like linear switches

---
# Step 2: Ergogen
I needed a tool to design the layout and found [Ergogen](https://ergogen.cache.works/). , which uses a simple YAML format to create layouts. Thanks to [a helpful blog series by FlatFootFox](https://flatfootfox.com/ergogen-introduction/), I defined a 3x6 grid for keys on each hand, matching the finger positions I had determined on the iPad. The flexibility of YAML allowed me to easily tweak the layout until it felt and looked right. Here's a snippet of my Ergogen config:

```yaml
      columns:
        outer:
          key:
            splay: 10
        pinky:
          key:
            stagger: 3
        ring:
          key:
            stagger: 8
            splay: -4.1
            spread: 1.035kx
        middle:
          key:
            stagger: .25*ky
            splay: -5
            spread: 1.04kx
        index:
          key:
            stagger: -.65*ky
            splay: -1
        inner:
          key:
            stagger: -.5*ky
      rows:
        bottom:
        home:
        top:
    thumb:
      key:
        padding: ky
        spread: kx
      anchor:
        ref: matrix_index_bottom
        shift: [2,-28]
      columns:
        left:
          key:
            shift: [-1,0]
            splay: -15
        middle:
          key:
            splay: -7.5
        right:
          key:
            splay: -15
            shift: [2.6,-2]
      rows:
        cluster:
```

I used [Ceoloide's](https://github.com/ceoloide/ergogen-footprints/tree/main) footprint for the switch footprints, which are reversible, meaning that both halves

![Preview of layout in ergogen online tool](ergogen_preview.png)
Above is the preview image I got from Ergogen after designing my layout.

---
# Step 3: PCB Design

Ergogen generated a KiCad file with the board outline and switch footprints. I had to create and route the traces. Additionally, the footprint I used for the nRF52840 didn't account for its battery pads, so I had to modify the footprint by adding a small cutout to route battery wires through. I haven't messed around with PCBs before this besides some basic designs from school, so that was a nice learning experience. The supportive community on the [Absolem Club Discord server](https://discord.gg/kk4rXYkp4H) helped me through the process.

![](KiCad_before.png)
The PCB Ergogen generated
![](KiCad_after.png)
After adding traces and adjusting the microcontroller footprint

Once all the electronics were in place, I decided to add some decorative patterns to the pcb, as I decided not to use a plate on this keyboard.
![](final_pcb.png)
And with that, the PCB design was pretty much done. All that was left was ordering everything and putting it all together.
# Step 4: Assembly and Firmware
I ordered my PCB from [JLCPCB](https://jlcpcb.com/) in black and white for about 20 USD, the microcontroller from [SeeedStudio](https://www.seeedstudio.com/), and the other components from [Typeractive](https://typeractive.xyz/).

I used my university's makerspace for soldering, learning about reflow soldering for smaller components.

## Keymap
First, I defined the keymap. I opted for the Colemak-DH layout, as it was designed to be a more ergonomic layout that also allows for faster typing speeds. The other layers were designed by seeing various designs online and then just iterating.

0 - **Default Layer**  
![](default_layer.png)  
1 - **Symbol Layer**  
![](symbol_layer.png)
2 - **Number Layer**  
![](number_layer.png)
3 - **Function Layer**  
![](tri_layer.png)
4 - **Gaming Layer**  
![](gaming_layer.png)


I also decided to make another layer for gaming to keep the WASD layout, but I haven’t been able to test how effective this is.

## Firmware
I then opted for the ZMK Firmware, namely because QMK does not support wireless boards due to some licensing issues with Bluetooth, and because I do intend on learning Zephyr eventually, which ZMK is based on.

I began by mapping the pins on the microcontroller to the corresponding columns and rows of the keyboard matrix. I probably should’ve planned these before designing the PCB, but I chose these pins retroactively, as the PCB traces were already routed.

| Pin Number | Digital | Matrix mapping             |
| ---------- | ------- | -------------------------- |
| P0.02      | 0       | Outer Column               |
| P0.03      | 1       | Pinky Column               |
| P0.28      | 2       | Middle Column + outerthumb |
| P0.29      | 3       | Index Column + middlethumb |
| P0.04      | 4       | Inner Column + innerthumb  |
| P1.12      | 7       | Upper Row                  |
| P1.13      | 8       | Middle Row                 |
| P1.14      | 9       | Lower Row                  |
| P1.15      | 10      | Thumb Row                  |

### Creating the shield
Because this keyboard was completely original, there wasn’t a pre-existing shield, so I had to make my own. That wasn’t so bad. The [ZMK documentation](https://zmk.dev/docs/development/new-shield) is very well written and easy to follow.

All that was left was to compile and flash the firmware! *Not Really*

# Trouble in Paradise
Despite the careful planning and assembly, I ran into a significant issue: the left half of the keyboard worked perfectly and paired with my devices, but the right half was unresponsive.
### Initial Diagnosis
I tried resetting the firmware, suspecting an issue with the pairing process. This fixed the issue in that the right half now connected, but it also led me to find another problem: most keys on the right half were unresponsive, and pressing the top key in each column caused all keys in that column to ghost.
### Physical Troubleshooting
I grabbed a multimeter to test each diode, as my soldering job for the right half was particularly ugly, but each diode was functioning correctly. Next, I tested each diode-switch pair, where I did find an inconsistency in voltages. I then tried flipping all the diodes, as perhaps the direction needed to be flipped because the board was flipped, but this yielded no change. It was time to take a look at the PCB.
### PCB Analysis
I next decided to take a look at the PCB layout. This is where I found the culprit. I discovered that I had forgotten to route one of the pads on the backside (the front for the right side of the board). Fortunately, because the left and right halves of the board use the same PCB, I was able to simply resolder the microcontroller to the back side of the right half. I knew this would work because the left side worked flawlessly, and although the diode pads were on the other side, all the switch connections were through-holes, so the side on which they were installed would not matter. All that was left was to compensate with software by reversing the order of the pins. This finally worked.

# Conclusion
This project was a bit challenging but very rewarding, providing me with a custom mechanical keyboard tailored to my preferences. It was also my first truly original electronics project, and it taught me a lot about PCB design and soldering, all through practical hands-on experience. This project also helped in refining my independent problem-solving skills, as I am used to having either documentation or peers to take help from. I hope this inspires others to try their hand at DIY keyboard building!

![The completed product](keyboard.jpg)
