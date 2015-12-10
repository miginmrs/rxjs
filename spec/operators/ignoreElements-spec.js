/* globals describe, it, expect, hot, cold, expectObservable, expectSubscriptions */
var Rx = require('../../dist/cjs/Rx');
var Observable = Rx.Observable;

describe('Observable.prototype.ignoreElements', function () {
  it('should ignore all the elements of the source', function () {
    var source = hot('--a--b--c--d--|');
    var subs =       '^             !';
    var expected =   '--------------|';

    expectObservable(source.ignoreElements()).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });

  it('should allow unsubscribing early and explicitly', function () {
    var source = hot('--a--b--c--d--|');
    var subs =       '^      !       ';
    var expected =   '--------       ';
    var unsub =      '       !       ';

    var result = source.ignoreElements();

    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });

  it('should allow unsubscribing early and explicitly', function () {
    var source = hot('--a--b--c--d--|');
    var subs =       '^      !       ';
    var expected =   '--------       ';
    var unsub =      '       !       ';

    var result = source
      .mergeMap(function (x) { return Observable.of(x); })
      .ignoreElements()
      .mergeMap(function (x) { return Observable.of(x); });

    expectObservable(result, unsub).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });

  it('should propagate errors from the source', function () {
    var source = hot('--a--#');
    var subs =       '^    !';
    var expected =   '-----#';

    expectObservable(source.ignoreElements()).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });

  it('should support Observable.empty', function () {
    var source = cold('|');
    var subs =        '(^!)';
    var expected =    '|';

    expectObservable(source.ignoreElements()).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });

  it('should support Observable.never', function () {
    var source = cold('-');
    var subs =        '^';
    var expected =    '-';

    expectObservable(source.ignoreElements()).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });

  it('should support Observable.throw', function () {
    var source = cold('#');
    var subs =        '(^!)';
    var expected =    '#';

    expectObservable(source.ignoreElements()).toBe(expected);
    expectSubscriptions(source.subscriptions).toBe(subs);
  });
});
