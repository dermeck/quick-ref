CSS Layout Debugger
=====================

Outlines every DOM element on your page a random (valid) CSS hex color.

**One-line version to paste in your DevTools**

Use `$$` if your browser aliases it:

~ 108 byte version

```javascript
[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
```

Using `document.querySelectorAll`:

~ 131 byte version

```javascript
[].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
```

~73 byte code-golfed version by @xem

```javascript
$$('*').map(A=>A.style.outline=`1px solid hsl(${(A+A).length*9},99%,50%`)
```

~66 byte code-golfed version by @daliborgogic

```javascript
$$('*').map((A,B)=>A.style.outline=`1px solid hsl(${B*B},99%,50%`)
```

source: https://gist.github.com/addyosmani/fd3999ea7fce242756b1
