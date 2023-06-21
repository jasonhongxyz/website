---
layout: post
title:  "Jekyll, Docker Compose, and CircleCI"
date:   2022-07-01 19:38:29 -0500
category: blog
---

I need an easier, faster, better way to maintain my site.

### The "Before"

This site was originally stood up November 2020 as just a HTML/CSS template on
a tiny VPS. It took the better part of a weekend to get the domain, nginx, and
LetsEncrypt configuration all set up (mostly because I had no idea what I was
doing). Aside from the occassional updates and reboots, the site remained
largely unchanged for the duration of its tenure.

I was pretty proud of it, sure, but as time went on, a few things started to
bother me. My lack of familiarity with HTML/CSS meant there was no good avenue
for me to write (which I wanted to do) without first learning some front-end.
The manual configuration meant that if, for whatever reason, my site were to
break, it could/would require quite a bit of time and effort to set up *all
over again*.

### The "Fix"

Some choices I made and why:
- [Jekyll][jekyll]: I wanted a site that was dead simple to edit, so a
  static-site generator was a natural choice. I also like Markdown and LaTeX.
- [Docker][docker]/[Compose][compose]: I wanted something that was easy to
  deploy, and was pretty portable.
- [Circle CI][circleci]: I wanted something that I can `git push`, and
  everything is deployed automatically. I initially set up a Jenkins container
  on the same VPS -- it worked, but I found Circle CI to be easier to use.
- [Updown.io][updownio]: Simple uptime monitoring. I want a status page for all
  my subdomains at `status.jasonhong.xyz`.

With these tools, I shouldn't ever have to start *completely* from scratch
again.

### The Workstream

The workflow can be summarized as follows -- create Docker containers for my
blog, reverse proxy, and any projects, and stand them up in a hot-swappable,
automated fashion using compose.

The Dockerfile for my blog:
```dockerfile
FROM nginx
COPY _site /usr/share/nginx/html
```
Straightforward. This pulls the nginx image and copies the generated HTML files
from Jekyll into the correct folder.

The compose entry:
```yaml
services:
  blog:
      image: jasonhongxyz/blog
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.blog.rule=Host(`jasonhong.xyz`) || Host(`www.jasonhong.xyz`)"
        - "traefik.http.routers.blog.entrypoints=websecure"
        - "traefik.http.routers.blog.tls.certresolver=myresolver"
      restart: always
```

I used a [Traefik Proxy][traefik-proxy] container as my reverse proxy service.
The configuration for Traefik can be done through its compose entry -- I used
the following to register the domains, and setup LetsEncrypt certs.
```yaml
services:
  reverse-proxy:
    image: traefik:latest
    # Enables the web UI and tells Traefik to listen to docker
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--certificatesresolvers.myresolver.acme.httpchallenge=true"
      - "--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web"
      # Comment to use production LetsEncrypt environment
      #- "--certificatesresolvers.myresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"
      - "--certificatesresolvers.myresolver.acme.email=jasonhong0810@gmail.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
      # The Web UI (enabled by --api.insecure=true)
      - "8080:8080"
    volumes:
      - "./letsencrypt:/letsencrypt"
      # So that Traefik can listen to the Docker events
      - /var/run/docker.sock:/var/run/docker.sock
```
Traefik [manages][traefik-renewal] the expiry date of ACME certificates -- the
default is 90 days with renewals at 30 days before expiry.

#### Deployment

Running `jekyll build` creates a `_site` directory with the generated HTML.
This component could be done automatically with CircleCI, but I don't mind
generating the HTML myself to keep a git tracked copy. Maybe one day when I
have a bit more time I can automate this part as well.

CircleCI is triggered on every `git push` to the repository. The pipeline first
clones into the directory, and rebuilds the Docker image using the `_site`
files and `Dockerfile-blog`. That image is pushed to my Docker Hub account.

Then, the pipeline SSH's into my Linode VPS, pulls the latest `blog` image from
Docker Hub, and reruns `docker compose up -d`.

And just like that... my site is updated. :)

<img src="/assets/nicolas_cage_party.gif" alt="nicolas_cage_party" width="32">

[jekyll]: https://jekyllrb.com/docs/home
[docker]: https://docs.docker.com/
[compose]: https://docs.docker.com/compose/
[circleci]: https://circleci.com/
[updownio]: https://updown.io/
[traefik-proxy]: https://doc.traefik.io/traefik/
[traefik-renewal]: https://doc.traefik.io/traefik/https/acme/#automatic-renewals
