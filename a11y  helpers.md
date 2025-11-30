# helpers to debug a11y issues

log focused element when focus changes
```
document.addEventListener('focusin', function() {
  console.log(document.activeElement)
}, false)
```

log focues element after tab is pressed
```
document.addEventListener('keyup', function(e) {
  9 != e.keyCode || e.metaKey || e.ctrlKey || console.log(document.activeElement)
}, false)
```
