/**
 * Created by maocg.
 * Date:2016/3/21 0021.
 * Time:上午 9:45.
 */
var main = require('../main');
var should = require('should');
/**
 * 当 n === 0 时，返回 0；n === 1时，返回 1;
 * n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;
 * n 不可大于10，否则抛错，因为 Node.js 的计算性能没那么强。
 * n 也不可小于 0，否则抛错，因为没意义。
 * n 不为数字时，抛错
 */
describe('test/main.test.js', function () {
    it('should equal 0 when n===0', function () {
        main.fibonacci(0).should.equal(0);
    });
    it('should equal 1 when n===1', function () {
        main.fibonacci(1).should.equal(1);
    });
    it('should equal 2 when n===3', function () {
        main.fibonacci(3).should.equal(2);
    });
    it('should throw when n is not num', function () {
        (function () {
            main.fibonacci('aaa');
        }).should.throw('n should be a Number');
    });
    it('should throw when n>10', function () {
        (function () {
            main.fibonacci(11);
        }).should.throw('n should <= 10');
    });
});