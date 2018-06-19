# cssapi

[![NPM Version](https://img.shields.io/npm/v/cssapi.svg)](https://www.npmjs.com/package/cssapi)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/cssapi.svg)](https://codecov.io/gh/Undistraction/cssapi)
[![Build Status](https://img.shields.io/travis/Undistraction/cssapi.svg)](https://travis-ci.org/Undistraction/cssapi)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)
[![Greenkeeper badge](https://badges.greenkeeper.io/Undistraction/cssapi.svg)](https://greenkeeper.io/)
[![Node Security](https://nodesecurity.io/orgs/undistraction/projects/XXX/badge)](https://nodesecurity.io/orgs/undistraction/projects/XXX)

CSSAPI provides you with a simple api to define and use values throughout your application when using JS-in-CSS.

In the last few years many of the problems with CSS have been mitigated by adding a layer in between the declaration of the styles and the rendering of the styles. In the early days it was through preprocessors and today it is through CSS-in-JS. This library is my attempt to build on the current CSS-in-JS landscape to build the API for writing CSS that I've always wanted. I can honestly say that I've got pretty close to my happy place and even if you don't think it's for you, hopefully you'll find the approach interesting.

## Who Is This For?

If you use a CSS-in-JS solution and want to write less and more consistent CSS, then this library might be for you. I think it's very useful if it is only you working on a project, but across a team it has the potential for greatly improving consistency and workflow. Apart from a variety of useful functionality it gives you a single location for a single source of truth, and that alone can be a great boon.

There are a couple of important factors which guided my in designing it.

* I don't believe that setting styles on a component via its props is the answer. In fact I think it is an anti-pattern.
* I believe that even if you are using an API things should be named as you expect, and not in the form of some esoteric language that you have to mentally map to the style it will effect.
* Not everyone wants the same features, so make sure it is easily extended and customisable.

## What Does It Look Like?

Here is an example using cssapi when defining a styled-component:

```javaScript
import { scope } from 'cssapi'
import api from '../../config/cssapi'

const Title = styled.h2`
  ${api({
    font: `font:title`,
    padding: scope`1ru`,
    baseline: `scale:medium 3`,
    background: `image:paperTexture gradient:gentleFade`,
  })}
`
```

## Installation

```bash
yarn add cssapi
```

## Overview

CSSAPI comprises of a configuration layer, an API layer, and some helpers to make working with themes easier.

### Configuration

The first thing you need to do is define the API and export it for use throughout your application. `cssapi` exports a default function, and calling it will return an api function.

```JavaScript
import configureCssApi from 'cssapi'

// Create your api function
const api = configureCssApi()

// Export the api function for use in your application
export default api
```

If you call `configureCssApi` with no arguments you will get the default configuration, which you can take a look in `src/config/defaultConfig.js`. This configuration enables lots of functionality out of the box, but doesn't define any breakpoints.

Lets take a look at a custom configuration:

```JavaScript
const breakpoints = [
  [`smallUp`, 400],
  [`mediumUp`, 1000],
  [`largeUp`, 1400],
]

const api = configureCssApi({
  breakpoints,
  data: {
    rhythm: 24,
    baseline: {
      lineHeight: 24,
    },
    color: {
      red: `#EE0`,
      danger: `color:red`,
    },
    font: {
      shrikhand: `shrikhand`,
      helvetica: `helvetica`,
      title: `font:shrikhand Sans-Serif`,
      body: `font:helvetica Sans-Serif`,
    },
    scale: {
      body: 14,
      primary: 22,
    },
    scopes: {
      resolve: [mediumUp],
      rhythm: 28,
      baseline: {
        lineHeight: 28
      },
      scale: {
        body: 18,
        primary: 26,
      },
    }
  }
})
```

In this configuration we define a series of breakpoints. Here we are using unitless numbers which will be interpreted as pixel values, but ultimately all breakpoints will be rendered using ems. This library handles the conversion for you.

Next we define a data object. This object describes values we will use in our application. As you can see, values can be a simple key-value pair or an object. `rhythm` is setting a unit to use throughout the application when defining things like padding or margin. Instead of using distance values, you can use rhythm units, for example `2ru` would map to `48`. This lets you think about your layout in a more abstracted and consistent way. It also allows you to change the layout of an entire application by tweaking a single value. `baseline` defines the baseline used for displaying text. Later you will see that you can define `text-size` and `line-height` using a helper. `baseline` has other properties that you can tweak so it is defined as an object. If we wanted to set other values we would add those key-value pairs. `color` declares a map of colour values. Although we define colours here, we can also define mapping by using tokens. For obvious reasons it isn't good referring to colours by such a direct naming, so we abstract it through the use of a token. You will see how to use tokens later, but this token tells the library to replace the token with a lookup to 'color.red`. We do the same with our fonts and as you can see we define a font-stack, and the tokens within the string will be replaced by the font names we have defined. We then define a font-scale, again insulating our actual values through the use of naming. 

Finally we define a `scopes` object. This allows us to change values at any of the breakpoints we have defined, so here we are saying 'From medium up, increase both `rhythm` and `baseline` values to 28. As you will see next, this allows the library to generate most media queries for you with minimum configuration. We also define a different font scale, scaling text up for larger screens. 

### Use 

Once we have created an api, we can use it anywhere in a component by calling the `api` function with an object of declarations. A declaration is effectively just a CSS declaration, but made via our api, allowing us to do lots of things that wouldn't be possible using pure CSS. Note: here we are just importing the api object, but the library also supports delivery of the api through a component's theme. 

```JavaScript
import { scope } from 'cssapi'
import api from '../../config/cssapi'

const Title = styled.h2`
  ${api({
    font: `font:title`,
    padding: {
      default: `1ru`,
      mediumUp: `2ru`,
    },
    baseline: scope`scale:primary`,
  })}
`
```

Here are the styles that will be rendered:

```css
font-family: shrikhand Sans-Serif;
padding: 1.5625rem;
font-size: 1.375rem;
line-height: 1.5rem;

@media (min-width: 62.5em) {
  padding: 3.5rem;
  font-size: 1.625rem;
  line-height: 1.75rem;
}
```

As you can see, all values have been converted to rems. Our font stack has been rendered. `baseline` has rendered both a `font-size` based on the scale we defined and a `line-height` based on the value we configured for `baseline`. 

Our padding has been rendered using the `rhythm` values we defined, and we wanted the amount of padding to double at our `mediumUp` breakpoint. However, because we defined a different value for `rhythm` in our scope for that breakpoint, it will double *that* value. 

`font-size` has been rendered using the scale we defined, however crucially, we tagged it using `scoped`. This tells the library that it should use the values you have supplied for scopes to automatically generate queries for each breakpoint. This means you can set a single value and be sure it will be rendered across all your breakpoints *using the value appropriate for that breakpoint*. 

This is just the tip of the iceberg. Please work through the following documentation to better understand what you can do.

## Docs

### API




Here are

## Roadmap

* Add more helpers: namely improve definition and use of fonts.
* Performance: look at improving performance through memoisation.

## Maintainance

### Tests

Tests are written with Jest:

```bash
yarn test
```

### Publish to NPM

```bash
yarn publish:patch
yarn publish:minor
yarn publish:major
```
