# cssapi

[![NPM Version](https://img.shields.io/npm/v/cssapi.svg)](https://www.npmjs.com/package/cssapi)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/cssapi.svg)](https://codecov.io/gh/Undistraction/cssapi)
[![Build Status](https://img.shields.io/travis/Undistraction/cssapi.svg)](https://travis-ci.org/Undistraction/cssapi)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)
[![Greenkeeper badge](https://badges.greenkeeper.io/Undistraction/cssapi.svg)](https://greenkeeper.io/)
[![Node Security](https://nodesecurity.io/orgs/undistraction/projects/XXX/badge)](https://nodesecurity.io/orgs/undistraction/projects/XXX)

CSSAPI is a collection of libraries to help write CSS-in-js using [styled-components](https://github.com/styled-components/styled-components). At present it comprises of four packages and this package which offers a simple way to access the others. The packages have designed with the following in mind:

* Keep focused and offer a well defined set of functionality.
* Clean and powerful api
* A single point of configuration for values used throughout your project.
* Provide a thin API between JS and CSS to enable useful and accurate error reporting.

Each package offers a specific set of functionaliy, and you can use them separately or together

## The packages

1.  [cssapi-mq](https://github.com/Undistraction/cssapi-mq) Configure and access named media queries.
2.  [cssapi-rhythm](https://github.com/Undistraction/cssapi-rhythm) Configure and access horizontal and vertical rhythm units.
3.  [cssapi-baseline](https://github.com/Undistraction/cssapi-baseline) Configure and render styles to make typography conform to a vertical baseline.
4.  [cssapi-fonts](https://github.com/Undistraction/cssapi-fonts) Configure and access fonts and font-styles.

For more information about each package please see the READMEs at the links above.

## Configuration and API

Each package follows a similar pattern. You configure the package by calling the function returned by its default export which returns an object exposing the api for you to use.

## This Package

There are two ways you can use these packages - either with or without theming. If you aren't using theming you can use the packages directly. However if you are using theming to centralise shared style config or to provide switchable themes, this package provides utilities to help you access the packages' apis via the `theme` object supplied to your styled components. It assumes that you have added each api object to the theme, using a key of the package name. It also provides convenience functions for accessing props provided by a theme and the theme itself.

* theme()
* themeProps('path.to.prop')
* mq()
* rhythm()
* baseline()
* fonts()

## Examples

There are two example projects in the `/examples` directory. One showing you how to use the packages without themeing and one without.
