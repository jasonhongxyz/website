---
layout: post
title: "Machine Art: Stable Diffusion (on Apple Silicon)"
date:   2022-09-03 18:38:29 -0500
category: blog
---

Testing Stable Diffusion on Apple Silicon.

### Background
Stable Diffusion is a text-to-image diffusion model that can create an AI image
from a given prompt. I wanted to test it on my M1 Macbook.

### Setup
Setup was fairly simple. I followed the instructions on Lincoln Stein's
[fork](https://github.com/lstein/stable-diffusion) of Stable Diffusion for M1
Macs, and despite all the disclaimers, the process worked like a charm. There
is rapid development across Stable Diffusion and pytorch nightly, so my
experience could be attributed to lucky timing, YMMV.

I do experience some of the bugs already reported as issues -- occasionally my
generated output is an black square.

Getting any output image was slow since I couldn't take advantage of CUDA
cores, and was running everything off CPU. I am lucky enough to have a friend
with a beefy Nvidia GPU though -- I've attached some of the interesting images
generated at the end.

### Photos
"ocean". First photo was created with only one pass.

<img src="/assets/2022-09-03/00000.png" alt="ocean1">

<img src="/assets/2022-09-03/00001.png" alt="ocean2">

<img src="/assets/2022-09-03/00002.png" alt="ocean3">

"game of thrones anime"

<img src="/assets/2022-09-03/00021.png" alt="game-of-throne">

"thanos eating popcorn"

<img src="/assets/2022-09-03/00032.png" alt="thanos-popcorn">

"dog king"

<img src="/assets/2022-09-03/00029.png" alt="dog-king">

"cat in armor high def"

<img src="/assets/2022-09-03/00025.png" alt="cat-knight">

I also tried out the `img2img` command, turning the last photo into a "drawing".

<img src="/assets/2022-09-03/00003.png" alt="cat-knight-drawing">

And, a profile photo for myself.

<img src="/assets/2022-09-03/grid-0069.png" alt="me">

### More Photos
These photos were generated with my friend's desktop -- he has an AMD 5950x,
RTX 3080 FE. *Super* fast -- much easier to iterate on good prompts and search
for better seeds.

<img src="/assets/2022-09-03/0004.png" alt="cityscape">

The first is the original generated from `txt2img`, the following were
alternatives/improvements from `img2img`.

<img src="/assets/2022-09-03/grid-0001.png" alt="cyborg">

<img src="/assets/2022-09-03/0012.png" alt="cyborg1">

<img src="/assets/2022-09-03/grid-0004.png" alt="cyborg2">

<img src="/assets/nicolas_cage_party.gif" alt="nicolas_cage_party" width="32">
