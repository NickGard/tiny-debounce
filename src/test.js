const { debounce } = require("./index");
const { expect } = require("chai");
const sinon = require("sinon");

describe("tiny-debounce", () => {
  var clock;
  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it("should debounce multiple invocations", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 100);
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(99);
    debouncedFn();
    clock.tick(1);
    expect(fn.callCount).to.equal(0);
    clock.tick(100);
    expect(fn.callCount).to.equal(1);
  });

  it("should fire on next tick (like setTimeout) if the wait time is 0 and leading is false", () => {
    const fn = sinon.spy(() => {});
    const debouncedFn = debounce(fn, 0, { leading: false });
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(0);
    expect(fn.callCount).to.equal(1);
  });
  it("should fire immediately if leading is true", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 0, { leading: true });
    debouncedFn();
    expect(fn.callCount).to.equal(1);
  });
  it("should fire after the wait time has elapsed since the last invocation if leading is false", () => {
    const WAIT_TIME = 400;
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, WAIT_TIME, { leading: false });
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(WAIT_TIME);
    expect(fn.callCount).to.equal(1);
  });
  it("should fire with the most recent arguments after the wait time has elapsed since the last invocation if leading is false", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 100, { leading: false });
    debouncedFn(1);
    debouncedFn(2);
    debouncedFn(3);
    expect(fn.callCount).to.equal(0);
    clock.tick(100);
    expect(fn.callCount).to.equal(1);
    expect(fn.lastCall.calledWithExactly(3)).to.be.true;
  });

  it("should fire on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout, if leading and trailing options are true.", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 100, { leading: true, trailing: true });
    debouncedFn();
    expect(fn.callCount).to.equal(1);
    clock.tick(100);
    expect(fn.callCount, 'it double fired').to.equal(1);

    const fn2 = sinon.spy(() => { });
    const debouncedFn2 = debounce(fn2, 100, { leading: true, trailing: true });
    debouncedFn2();
    expect(fn2.callCount).to.equal(1);
    debouncedFn2();
    expect(fn2.callCount).to.equal(1);
    clock.tick(100);
    expect(fn2.callCount).to.equal(2);
  });

  it("should fire after the maxWait time has elapsed", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 50, { maxWait: 100 });
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(49);
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(49);
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(2);
    expect(fn.callCount).to.equal(1);
  });

  it("should not fire after the wait time has elapsed if the cancel method is called before then", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 100);
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    debouncedFn.cancel();
    clock.tick(100);
    expect(fn.callCount).to.equal(0);
  });

  it("should fire the debounced invocation when the flush method is called", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 100);
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    debouncedFn.flush();
    expect(fn.callCount).to.equal(1);
  });
  it("should not fire when the flush method is called if there is no debounced invocation", () => {
    const fn = sinon.spy(() => { });
    const debouncedFn = debounce(fn, 100);
    debouncedFn();
    expect(fn.callCount).to.equal(0);
    clock.tick(100);
    expect(fn.callCount).to.equal(1);
    debouncedFn.flush();
    expect(fn.callCount).to.equal(1);
  })
});
