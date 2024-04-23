+++
title = "SORBORD 1.0 - The Making of My First Original Keyboard Design"
date = "2022-04-22"
+++
I've been obsessed with custom mechanical keyboards for quite some time now. If there's anything you know about the mechanical keyboard community, it's probably the *absurd* amount of money people burn away on hardware. 

The problem with this hobby is that it's just too darn expensive. Components are often produced by small companies that don't have the means of mass production, giving no choice but to sell at high prices to make any profit. Additionally, group buy culture results in a constant limited stock for pretty much all components, while demand is always on the rise. If you look for a "budget" prebuilt, you're probably looking at 150 USD for a very "entry-level" board. 

Ideally, I'd like be able to open [Geekhack](https://geekhack.org/index.php) or [Reddit](https://reddit.com/r/mechanicalkeyboards), find a group buy, and just order components for my next build. However, this way has two problems:
1. Price
Everything is ridiculously expensive.
2. Time:
When you enter a group buy, you're likely going to wait over a year for the item to arrive.

As a college student, I don't want to have to deal with either. I just want to build some keyboards *without breaking the bank*.  
So I came to an alternate decision: I was going to design and build everything myself. Now keep in mind, although I've done programming projects and little tools here and there, I haven't really taken on something this complete before. I had no idea where to begin.
***
# Step 1: The Design (A lot of yap)
I wanted to build a keyboard. Usually, it's quite a simple process. You check out what's trending in the community, pick what you like, and start ordering pieces.
I figured if I was going to make something from scratch, I might as well make it something just for myself. I decided to put an emphasis on ergonomics, meaning I would be fine with really weird results.

Little did I know that there was an entire [online sub-community of like-minded individuals.](https://reddit.com/r/ErgoMechKeyboards) Naturally, I lurked their forums. The boards I saw were unlike any other. Bizarrely-shaped, split keyboards with only about 30% of the keys of a normal keyboard seemed to be the norm here. I quickly grew an affinity for boards such as the [Lily58](https://github.com/kata0510/Lily58) and the [Corne](https://github.com/foostan/crkbd). Something about these designs intrigued me. The main motivation behind these layouts boil down to two goals:
1. Reducing finger movement for faster typing
2. More comfortable typing
The former is achieved through having less keys. Less keys = less movement. We'll discuss how that works later on. The latter is achieved by placing keys to follow the motion of our fingers. The fun part is figuring the balance between less keys for less finger movement and more keys for more convenience. I figured that part could wait.

---
**Minor tangent on hardware**
With the design decisions I also had to decide which microcontroller and firmware to use. I wasn't brave enough to just use a chip and do everything myself, so I opted for the [Seeed Studio XIAO nRF52840](https://www.seeedstudio.com/Seeed-XIAO-BLE-nRF52840-p-5201.html), mostly for three reasons:
1. Bluetooth Low Energy: Being a split keyboard, I figured going wireless would be wise, especially seeing as how this would allow me to freely move the halves in whatever arrangement is most comfortable without eating up any extra desk space. Another thing is portability and the fact that it is supposed to be a low profile board.
2. Price: 10 USD a pop isn't cheap, but it surely isn't nearly as much as the [nice!nanos](https://nicekeyboards.com/nice-nano/) or other wireless alternatives.
3. ARM Architecture. I'm not quite ready to write my own firmware just yet, but I do want to do something *a little more special* with this particular keyboard once I have a little more knowledge in embedded programming. I'm most familiar with ARM, and running something like the [Zephyr RTOS](https://www.zephyrproject.org/) or just Rust should be easier for me, unless if I have absolutely no clue on what I'm, talking about, which is also very probable.
---
The first step I took was figuring out what all this meant: I wanted a keyboard whose keys are placed in an arrangement that naturally aligns with the stagger and splay of my fingers. So I grabbed my iPad and installed the first painting app I saw online. I opened it and then just  opened and closed my fingers while keeping them on the screen several times. ***PUTTHEPICTUREHERE***  That gave a basic idea of the where each finger naturally goes as I extend them. This was enough to work with. I now had to figure out how to use this to actually make a layout for *keys* that I can use for designing the actual board.

I also determined by this point that I wanted my keyboard to be *extremely* low profile. We're talking as thin and light as possible. I figured I could forgo a chassis, and use a thin sheet of laser-cut acrylic to prevent shorts on the bottom side. I also learned about Kalih Choc switches, low-profile alternative keyboard switches, as opposed to traditional MX style switches. I opted to go for the linear choc red switches. Now that I had an idea, all I had to do was execute.

A lot of people use vector drawing tools like Illustrator for the key layout. I didn't want to spend time on getting everything aligned just right, so I started looking for a tool. The first thing I thought of was [Keyboard Layout Editor](http://www.keyboard-layout-editor.com/) (KLE),  but I quickly came to realize that KLE was perfect for mostly "normal," more rectangular boards. I needed something that would work nicely with all sorts of angles.
# Step 2: Ergogen (Actual stuff starts here)
After looking around online for a KLE alternative, I came across [Ergogen](https://ergogen.cache.works/). I'm not going to lie, at first, this tool scared me. Ergogen serves a purpose similar to that of KLE, except the layout is generated from code (a very simple YAML format). Fortunately, I found [a wonderful blog series explaining how to use Ergogen.](https://flatfootfox.com/ergogen-introduction/) written by someone who goes by FlatFootFox.
I began by defining a 3x6 grid of keys. Three rows per each finger (like normal keyboards, excluding the number row) and one column of keys for each finger, plus an inner and outer column for the index and pinky fingers to extend into. I decided to figure out what to do about the thumb later. I figure there isn't really any point writing up a whole guide on Ergogen (yet) so I highly suggest reading FlatFootFox's guide (linked earlier) if you do want to learn more about the specific details on using Ergogen.
## Ergogen `config.yaml`
```yaml
units:
  kx: cx
  ky: cy
  px: kx+4
  py: ky+4
points:
  zones:
    matrix:
      anchor.shift: [100,-100]
      key:
        padding: 1ky
        spread: 1kx
      columns:
        outer:
          key:
            splay: 10
            column_net: "P0"
        pinky:
          key:
            stagger: 3
            column_net: "P1"
        ring:
          key:
            stagger: 8
            splay: -4.1
            spread: 1.035kx
            column_net: "P2"
        middle:
          key:
            stagger: .25*ky
            splay: -5
            spread: 1.04kx
            column_net: "P3"
        index:
          key:
            stagger: -.65*ky
            splay: -1
            column_net: "P4"
        inner:
          key:
            stagger: -.5*ky
            column_net: "P5"
      rows:
        bottom:
            row_net: "P9"
        home:
            row_net: "P8"
        top:
            row_net: "P7"
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
            column_net: "P3"
        middle:
          key:
            splay: -7.5
            column_net: "P4"
        right:
          key:
            splay: -15
            shift: [2.6,-2]
            column_net: "P5"
      rows:
        cluster:
            row_net: "P10"
outlines:
  raw:
    - what: rectangle
      where: true
      size: [px,ky+2.69987980894130]
  keys:
    - what: rectangle
      where: true
      size: [kx-.5,ky-.5]
  board:
    - what: polygon
      operation: stack
      points:
        - ref: matrix_outer_top
          shift: [-.5px,.5py]
        - ref: matrix_outer_top
          shift: [.2px,.5py]
        - ref: matrix_pinky_top
          shift: [-.4px,.5py]
        - ref: matrix_pinky_top
          shift: [.5px,.5py]
        - ref: matrix_ring_top
          shift: [-.5px,.5py]
        - ref: matrix_ring_top
          shift: [.5px,.5py]
        - ref: matrix_middle_top
          shift: [-.44px,.5py]
        - ref: matrix_middle_top
          shift: [.5px,.5py]
        - ref: matrix_index_top
          shift: [-.35px,.5py]
        - ref: matrix_index_top
          shift: [.5px,.5py]
        - ref: matrix_inner_top
          shift: [-.33px,.5py]
        - ref: matrix_inner_top
          shift: [1.45px,.5py]
        - ref: matrix_inner_bottom
          shift: [1.45px,-.5py]
        - ref: thumb_right_cluster
          shift: [.5px,.5py]
        - ref: thumb_right_cluster
          shift: [.5px,-.5py]
        - ref: thumb_middle_cluster
          shift: [.5px,-.5py]
        - ref: thumb_left_cluster
          shift: [.5px,-.5py]
        - ref: thumb_left_cluster
          shift: [-.5px,-.5py]
        - ref: matrix_pinky_bottom
          shift: [.5px,-.5py]
        - ref: matrix_pinky_bottom
          shift: [-.25px,-.5py]
        - ref: matrix_outer_bottom
          shift: [.4px,-.5py]
        - ref: matrix_outer_bottom
          shift: [-.5px,-.5py]
      fillet: 3
  combo:
    - name: board
    - operation: subtract
      name: keys
pcbs:
  main:
    outlines:
      main:
        outline: board
    footprints:
      switches:
        what: choc_v2_hotswap
        where: true
        params:
          reverse: true
          hotswap: true
          from: "{{column_net}}"
          to: "{{colrow}}"
          outer_pad_width_front: 1.6
          outer_pad_width_back: 1.6
          keycaps_x: kx-.5
          keycaps_y: ky-.5
          show_keycaps: true
        adjust:
          rotate: 180
      diodes_b:
        what: combo_diode
        where: true
        params:
          from: "{{colrow}}"
          to: "{{row_net}}"
          include_tht: false
          reversible: false
          side: B
        adjust:
          shift: [-7.75,1.5]
          rotate: -90
      diodes_f:
        what: combo_diode
        where: true
        params:
          from: "{{colrow}}"
          to: "{{row_net}}"
          include_tht: false
          reversible: false
          side: F
        adjust:
          shift: [7.75,1.5]
          rotate: -90
      MCU:
        what: xiao-ble
        where:
            ref: matrix_inner_top
            shift: [.925px,-.06py]
```

I used [Ceoloide's](https://github.com/ceoloide/ergogen-footprints/tree/main) footprint for the switch footprints, and 
Again, read the guide if you really want to know how I came up with all this. It's worthy of an entire article on its own.

# Step 3: PCB Design in KiCad
So Ergogen spits out a KiCad PCB file, but there are no traces. Additionally, the footprint I used for the Xiao microcontroller didn't account for its battery pads, so I had to modify that a bit. I haven't messed around with PCBs before this besides for some basic designs from school, so that was a nice learning experience. I was a little confused on how to get things working in terms of the reversibility, but the friendly people of the [Absolem Club](https://discord.gg/kk4rXYkp4H) Discord server (which is where I also found the footprints) were very kind and helpful.

**INSERT PICTURES OF FRESH PCB DESIGN, PCB DESIGN WITH TRACES, AND XIAO FOOTPRINT**

Once all the electronics were in place, I decided to add some decorative patterns to the pcb, as I decided not to use a plate on this keyboard.

**INSERT PICTURE OF FINAL DESIGN**

And with that, the PCB design was pretty much done. All that was left was ordering everything and putting it all together.

# Step 4: The Build
I ordered my PCB from [JLCPCB](https://jlcpcb.com/) in black and white for about 20 USD, and got the diodes from [Mouser](https://www.mouser.com/). I bought the Seeed Xiao BLE microcontroller from [SeeedStudio](https://www.seeedstudio.com/)'s official website. Lastly, I ordered the keyboard specific components (i.e. hotswap sockets, switches, keycaps) from [Typeractive](https://typeractive.xyz/). I was a bit hesitant to order from Typeractive, as I've never ordered anything from a keyboard specific website before, but I was very happy with my experience, and impressed with the quick shipping time and nice packaging.
### Soldering
Now came the part I was most scared of. In hindsight, I really don't know what I was scared of (I do, it was SMD. I just said that so it sounds like I developed from the experience). I guess that's why people write build logs as they are in the process of making something rather than after the fact. 
Now is my time to boast. My school has [one of the coolest university makerspaces for electrical engineering](https://inventionworks.engr.utexas.edu/). So I didn't have to worry about the actual soldering equipment or anything like that. I just had to sign up for some training for access to the soldering labs. This was very important because I know that while I might've put everything together successfully on my own, without the training, I almost definitely would've violated every safety precaution.

I learned about reflow soldering with solder paste (actually magic), which is game changing if you're doing any SMD soldering with small components, so I took advantage of that when installing the diodes on the PCB.

**INSERT PICTURE OF PUTTING DIODES ON PCB**

Aaand I found out why reflow soldering without a stencil is a bad idea. It worked, it was just really messy because I ended up using too much solder paste on half of the pads. Not really enough to cause a problem, but it did seem a little wasteful. So I resorted to hand soldering for the hotswap sockets. This went by pretty smoothly, and then I discovered flux, which made it go even more smoothly.

With this process repeated for each diode and socket for each half of the keyboard, the assembly was complete. All that remained was programming.
# Step 5: Programming the Firmware
## Layout

| Pin Number | Digital | Matrix mapping |
| ---- | ---- | ---- |
| P0.02 | 0 | Outer Column |
| P0.03 | 1 | Pinky Column |
| P0.28 | 2 | Middle Column + outerthumb |
| P0.29 | 3 | Index Column + middlethumb |
| P0.04 | 4 | Inner Column + innerthumb |
| P0.05 | 5 | - |
| P1.11 | 6 | - |
| P1.12 | 7 | Upper Row |
| P1.13 | 8 | Middle Row |
| P1.14 | 9 | Lower Row |
| P1.15 | 10 | Thumb Row |

## Keymap
```
tab  Q    W    F    P    B      J    L    U    Y    ;
esc  A    R    S    T    G      M    N    E    I    O
alt  Z    X    C    D    V      K    H    ,    .    /
              gui  ctrl spc    ret  shf  bksp
                        lwr    rse
```
