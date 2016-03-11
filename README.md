TexPad
======

TexPad is a website which offer temporary LaTeX pads for shading work.

[Link to the actual site](http://texpad.herokuapp.com)

[![Stories in Ready](https://badge.waffle.io/Focus/texpad.png?label=ready&title=Ready)](https://waffle.io/Focus/texpad)

How is it done?
-------

The website is written in JavaScript (ES6) and runs on [Meteor](https://www.meteor.com/). This means that both the front and the backend are written in JS.

It uses [MathJax](https://www.mathjax.org/) to render the mathematics on the page.

How to contribute?
--------

First, you need to [install Meteor](https://www.meteor.com/install) and [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Next clone this repository and run meteor inside of the folder you just grabbed:
```
git clone https://github.com/Focus/texpad.git
cd texpad
meteor
```
Once meteor has loaded you can view your local website at by visiting http://localhost:3000 on a browser.

You can access your local database by typing
```
meteor mongo
```
into terminal.

Here are some useful references:
- [Meteor API](http://docs.meteor.com/#/full/)
- [MongoDB manual](https://docs.mongodb.org/manual/)
- [MathJax API](http://mathjax.readthedocs.org/en/latest/api/hub.html)
- [Meteor tutorials](https://www.meteor.com/tutorials/blaze/creating-an-app)
- [Your first Meteor application](http://meteortips.com/first-meteor-tutorial/)
