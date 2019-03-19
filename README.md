#insideout-css

Declarative tools for generating CSS.

##About

This tool allows developers to configure CSS by attributes, specifying an array of selectors to receive them. 

###Example Input

```js
const config = {
  "font-family": {
    "'Montserrat', helvetica, sans-serif": {
      elements: [
        'html',
        'h3 a',
        'div.class'
      ],
    },
    "'Inconsolata', monospace": {
      elements: [
        'pre'
      ],
    },
  },
  "font-weight": {
    300: {
      elements: [
        'h3 a',
      ],
    },
    100: {
      elements: [
        'html',
        'div.class'
      ]
    }
  }
};
```

###Example Output

```css
html: {
  font-family: 'Montserrat', helvetica, sans-serif;
  font-weight: 100;
}

h3 a: {
  font-family: 'Montserrat', helvetica, sans-serif;
  font-weight: 300;
}

div.class: {
  font-family: 'Montserrat', helvetica, sans-serif;
  font-weight: 100;
}

pre {
  font-family: 'Inconsolata', monospace;
}
```
