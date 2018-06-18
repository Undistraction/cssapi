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

```JavaScript
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
  ['smallUp', 400],
  ['mediumUp', 1000],
  ['largeUp', 1400],
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
    }
  }
})
```

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
