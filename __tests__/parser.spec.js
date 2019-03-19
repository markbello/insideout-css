import config from './config.json';
import {
  collectCSSBySelector,
  getAttributes,
  parseCSSBySelectors,
  parseValues,
  stringifyCSS,
  stringifySelector,
  stringifySelectorAttributes,
} from '../src/parser';

describe('getAttributes', () => {
  it('returns an array of attributes from the config object', () => {
    const result = getAttributes(config);
    expect(result).toEqual(["font-family", "font-weight"]);
  });
});

describe('stringifyCSS', () => {
  it('combines an attribute with a value', () => {
    const result = stringifyCSS('font-family', '"Montserrat", helvetica, sans-serif');
    expect(result).toEqual('font-family: "Montserrat", helvetica, sans-serif;');
  });
});

describe('parseValues', () => {
  it('does a thing', () => {
    const result = parseValues(config);
    expect(result).toEqual(
      [
        {
          "cssValue": "font-family: 'Montserrat', helvetica, sans-serif;",
          "selectors": ["html", "h3 a", "div.class"]
        },
        {
          "cssValue": "font-family: 'Inconsolata', monospace;",
          "selectors": ["pre"]
        },
        {
          "cssValue": "font-weight: 100;",
          "selectors": ["html", "div.class"]
        },
        {
          "cssValue": "font-weight: 300;",
          "selectors": [
            "h3 a"
          ]
        }
      ]
    );
  });
});

describe('collectCSSBySelector', () => {
  it('organizes parsed values by selector', () => {
    const result = collectCSSBySelector(config);
    expect(result).toEqual(
      {
        "div.class": [
          "font-family: 'Montserrat', helvetica, sans-serif;",
          "font-weight: 100;"
        ],
        "h3 a": [
          "font-family: 'Montserrat', helvetica, sans-serif;",
          "font-weight: 300;"
        ],
        "html": [
          "font-family: 'Montserrat', helvetica, sans-serif;",
          "font-weight: 100;"
        ],
        "pre": [
          "font-family: 'Inconsolata', monospace;"
        ]
      }
    );
  });
});

describe('stringifySelectorAttributes', () => {
  it('reduces attributes for the selector down to a string', () => {
    const testValue = [
      "font-family: 'Montserrat', helvetica, sans-serif;",
      "font-weight: 100;"
    ];

    const result = stringifySelectorAttributes(testValue);

    expect(result).toEqual(`font-family: 'Montserrat', helvetica, sans-serif;\nfont-weight: 100;`);
  });
});

describe('stringifySelector', () => {
  it('formats the selector by name and adds in the CSS attributes', () => {
    const testAttributes = [
      "font-family: 'Montserrat', helvetica, sans-serif;",
      "font-weight: 100;"
    ];

    const result = stringifySelector('div', testAttributes);

    expect(result).toEqual(`div: {
    font-family: 'Montserrat', helvetica, sans-serif;
    font-weight: 100;
    }`);
  });
});

describe('parseCSSBySelectors', () => {
  it('formats a CSS string from a config object', () => {
    const result = parseCSSBySelectors(config);

    expect(result).toContain(
    `html: {
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
    pre: {
    font-family: 'Inconsolata', monospace;
    }`);
  });
});
