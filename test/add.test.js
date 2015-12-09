/**
 * Created by maocg.
 * Date:2015/12/9 0009.
 * Time:上午 10:29.
 */
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        expect(add(1, 1)).to.be.equal(2);
    });
});