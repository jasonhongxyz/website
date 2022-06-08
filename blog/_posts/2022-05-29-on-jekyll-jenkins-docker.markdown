---
layout: post
title:  "On Jekyll, Jenkins, and Docker Compose"
date:   2022-06-01 19:38:29 -0500
category: blog
---

I needed an easier, faster, better way to maintain my site.

### The "Before"

This site was originally stood up November 2020 as just a HTML/CSS template on
a tiny VPS. It took the better part of a weekend to get the domain, nginx, and
LetsEncrypt configuration all set up (mostly because I had no idea what I was
doing), and aside from the occassional updates and reboots, the site remained
largely unchanged for the duration of its tenure.

I was pretty proud of it, sure, but as time went on, a few things started to
bother me. My lack of familiarity with HTML/CSS meant there was no good avenue
for me to write (which I wanted to do) without first learning some front-end,
and the manual configuration meant that if, for whatever reason, my site were
to break, it could/would require quite a bit of time and effort to set up
*all over again*.

I needed something better.

### The "Fix"

Automate everything.

Some software I chose and why:
- [Jekyll][jekyll]: I wanted a site that was dead simple to edit, so a
  static-site generator was a natural choice. I also like Markdown and LaTeX.
- [Docker][docker]/[Compose][compose]: I wanted something that was easy to
  deploy, and was relatively portable.
- [Jenkins][jenkins]: I want something that I can `git commit`, and everything
  else is done automatically. Also I want my own CI server.

It's getting close to midnight and I don't feel like writing up *every* single
step I took, so I'll just summarize the workflow, and document some of the more
troublesome steps in case I ever have to do it again. Skip to the end for that.

All goes well, I should never have to start *completely* from scratch ever
again.

### The Workflow
#### Deployment

#### Updating the Image

#### Add a blogpost / project

### The Troublesome Steps...

<!-- {% highlight python%} -->
<!-- def hello_world(int input): -->
<!--   left = "right" -->
<!--   input = len(left) + input -->
<!--   return input -->
<!-- {% endhighlight %} -->

[jekyll]: https://jekyllrb.com/docs/home
[docker]: https://docs.docker.com/
[compose]: https://docs.docker.com/compose/
[jenkins]: https://www.jenkins.io/doc/
