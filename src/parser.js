export const getAttributes = config => Object.keys(config);

export const stringifyCSS = (attr, value) => `${attr}: ${value};`;

export const parseValues = (config) => {
  const attributes = getAttributes(config);

  return attributes.map((attr) => {
    const values = Object.keys(config[attr]);

    return values.map(value => {
      const cssValue = stringifyCSS(attr, value);

      return { cssValue, selectors: config[attr][value] };
    });
  }).flat();
};

export const collectCSSBySelector = (config) => {
  const parsedValues = parseValues(config);

  let cssBySelectors = {};

  parsedValues.forEach(entry => {
    const {cssValue, selectors} = entry;

    selectors.forEach(selector => {
      cssBySelectors[selector] = cssBySelectors[selector] || [];
      cssBySelectors[selector].push(cssValue);
    });
  });

  return cssBySelectors;
};

export const stringifySelectorAttributes = attributes => {
  return attributes.reduce((cur, next) => (`${cur}\n${next}`), '');
};

export const stringifySelector = (selector, attributes) => {
  const formattedAttributes = stringifySelectorAttributes(attributes);
  return `${selector}: {${formattedAttributes}\n}`;
};

export const parseCSSBySelectors = (config) => {
  const cssBySelectors = collectCSSBySelector(config);

  const selectors = Object.keys(cssBySelectors);

  return selectors.reduce((cur, thisSelector) => {
    const formattedSelector = stringifySelector(thisSelector, cssBySelectors[thisSelector]);
    return `${cur}\n${formattedSelector}`;
  }, '');
};
