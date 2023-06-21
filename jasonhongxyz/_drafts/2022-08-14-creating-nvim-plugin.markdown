---
layout: post
title: "Writing a Simple Neovim Plugin -- signal.nvim"
date:   2022-08-15 18:38:29 -0500
category: blog
---

I want to text people from my text editor. I also want to learn Neovim plugin
programming.

### The Motivation 
I spend something like 90% of my time on my computer rotating between three
applications -- my browser, the terminal (mostly Neovim), and my
messenger (Signal for the past 4 years or so). That got me thinking...

What if I could get Signal messages from my text editor?

💡

A minimal, "out-of-your-way" Lua plugin to send and receive Signal messages, to
minimize mental context-switching and keep my hands near my keyboard. It would
also be a great opportunity to learn Lua and Neovim plugin programming.

This post is intended to be my notes on Neovim's robust Lua interface -- my
journey through the good, the bad, and the ugly of plugin programming.

### Part 0: Things to Know
TJ Devries' video ["Neovim Lua Plugin From Scratch"][tjpluginvideo] and
[`nanotee/nvim-lua-guide`][nvim-lua-guide] were massively helpful in writing
this. I referenced them frequently, and I recommend you do as well.

Disclaimer:
* This plugin is not intended to be a production security product. My threat
  model doesn't disbar allowing third-party (but open-source) clients like
  `signal-cli` from connecting to my Signal account as a pseudo-device. If my
  code is installed on anyone's system, I always recommend they audit the code
  themselves before integrating into their Signal usage. That being said, I
  myself use this plugin daily. :)

### Part 1: Setting up...
You'll need a way to "self-install" a plugin from your local files in your
Neovim config. If you use Packer, you can point to your plugin directory the
same way you'd point to a plugin found on Github.

```lua
  use { "/Users/jasonhong/projects/signal.nvim" }
```

You'll also want a few commands to improve your debugging.
```lua
P = function(v)
  print(vim.inspect(v))
  return v
end
```

`vim.inspect` is great for tables -- it prints the contents of the Lua object
instead of the reference address. `P(table)` turns it into a method to print
`table` without writing `print(vim.inspect(table))`.

```
:lua print({1,2,3})
table: 0xabcd12345

:lua P({1,2,3})
{ 1 , 2 , 3 }
```

For this project, I also needed the [`signal-cli`][signal-cli] binary.

### Part 2: Project Structure
There are a few special directories to be aware of.
```

```

### Part 3: Writing the Business Logic

### Part 4: UI's with `nui.nvim`
Great! Now these methods work fine giving us the information we want, but
ideally we have a simple select, input, and display floating window that we can
toggle with a keybind. With `nui.nvim` we can create simple UI components with
the data from our business logic.

In `lua/signal/ui.lua`, call the functions we created to populate their
respective components. There are two separate UI elements we'll want.
1. A `select` menu to choose a person from the Signal contacts list. 
  ```lua

  ``` 
  This menu takes the input selected and calls the following UI component.
2. A `input` field to type the message to that person. 
  ```lua

  ```

Lastly, we just need to add the following keybind to our Neovim config, to
easily trigger the above methods.

```lua 
vim.keymap.set("n", "<leader>sw", '<cmd>lua require("signal").send_flow()<cr>') 
vim.keymap.set("n", "<leader>sr",) 
```

I chose `<leader>sr` for "signal read" and `<leader>sw` for "signal write", but
any keymap will do here.

### Part 5: Testing with `plenary`
Now for everyone's favorite part... writing tests. Thankfully `plenary.nvim`
includes a `test_harness` to make writing simple mocked tests painless.

### Part 6: Wrap-Up
That's all she wrote.

Those are the basic moving parts of `signal.nvim`.

<img src="/assets/nicolas_cage_party.gif" alt="nicolas_cage_party" width="32">

<!-- links -->
[tjpluginvideo]: https://www.youtube.com/watch?v=n4Lp4cV8YR0
[nvim-lua-guide]: https://github.com/nanotee/nvim-lua-guide
[signal-cli]: https://github.com/AsamK/signal-cli
