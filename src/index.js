Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = function(fn, waitTime, opts) {
  var options = opts || {},
    leading = !!options.leading,
    trailing = typeof options.trailing != 'boolean' || options.trailing,
    maxWait = +options.maxWait,
    wait = waitTime > 0 ? waitTime : 0,
    isWaiting,
    hasDebounceWaiting,
    args,
    timerId,
    maxWaitTimerId;
  function stopWaiting() {
    if (trailing && (!leading || hasDebounceWaiting)) fn.apply(null, args);
    isWaiting = hasDebounceWaiting = false;
  }
  function clearWaitTimer() { clearTimeout(timerId); }
  function debounced() {
    args = arguments;
    hasDebounceWaiting = true;
    clearWaitTimer();
    timerId = setTimeout(stopWaiting, wait);
    if (isWaiting) return;
    isWaiting = true;
    if (!isNaN(maxWait)) {
      clearTimeout(maxWaitTimerId);
      maxWaitTimerId = setTimeout(() => {
        hasDebounceWaiting = false;
        fn.apply(null, args);
      }, maxWait);
    }
    if (leading) {
      hasDebounceWaiting = false;
      fn.apply(null, args);
    }
  };
  debounced.flush = function(){
    clearWaitTimer();
    if (hasDebounceWaiting) fn.apply(null, args);
  };
  debounced.cancel = clearWaitTimer

  return debounced;
};

