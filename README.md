# tiny-debounce

[![source](https://badgen.net/npm/v/@ngard/tiny-debounce)](https://www.npmjs.com/package/@ngard/tiny-debounce)
[![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-debounce)](https://bundlephobia.com/result?p=@ngard/tiny-debounce)
[![build status](https://badgen.net/travis/NickGard/tiny-debounce)](https://travis-ci.org/NickGard/tiny-debounce)
[![license](https://badgen.net/badge/license/MIT/blue)](https://badgen.net/badge/license/MIT/blue)

A minimal utility similar to `lodash.debounce`. For when every byte counts!

<hr/>

lodash.debounce: [![bundle size](https://badgen.net/bundlephobia/minzip/lodash.debounce)](https://bundlephobia.com/result?p=lodash.debounce)
<br/>
tiny-debounce: [![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-debounce)](https://bundlephobia.com/result?p=@ngard/tiny-debounce)

<hr/>

## Install

```sh
npm install @ngard/tiny-debounce
```

## Syntax

```javascript
debounce(/* function, waitTime [, { leading, trailing, maxWait} ] */);
```

## Parameters

`function` - `[Function]` The function to be throttled.
`waitTime` - `[Number=0]` The amount of time, in milliseconds, to wait between the last invocation of the function and firing the passed function. The passed function will be invoked with the arguments from the most recent invocation of the debounced function.
`options.leading` - `[Boolean=false]` If true, the passed function will be fired on the leading edge of the debounce time period.
`options.trailing` - `[Boolean=true]` If true, the passed function will be fired on the trailing edge of the debounce time period.
`options.maxWait` - `[Number]` The maximum amount of time, in milliseconds, to allow the passed function to be debounced before invoking.

## Returns
A debounced function with the methods `flush` and `cancel`.
`debouncedFn.flush()` will immediately fire any debounced invocation and stop the debouncing timer.
`debouncedFn.cancel()` will cancel any debounced invocation and stop the debouncing timer.

## Note
If `leading` and `trailing` options are `true`, func is invoked on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout.

If wait is `0` and `leading` is `false`, func invocation is deferred until to the next tick, similar to `setTimeout` with a timeout of `0`.

## Example

```javascript
import { debounce } from '@ngard/tiny-debounce';

const debouncedAnimation = debounce(animateSomething, 16)
window.addListener('scroll', debouncedAnimation);
window.addListener('resize', debouncedAnimation.cancel);
```
