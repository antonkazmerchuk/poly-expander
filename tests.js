describe('map tests', function () {
	it('test 1', function () {
		var ar = [1, 2, 3],
			fn = function bytwo(a) {
				return a * 2;
			};

		expect([2,4,6]).toEqual(tests.map(ar, fn));
	});
});

describe('minmax tests', function () {
	it ('test 1', function () {
		var s = [1,2],
			l = [10,2,3];

		expect(tests.minmax(s, l).longer).toEqual(l);
		expect(tests.minmax(s, l).shorter).toEqual(s);
	});

	it ('test 2', function () {

		var s = [],
			l = [10,2,3];

		expect(tests.minmax(s, l).longer).toEqual(l);
		expect(tests.minmax(s, l).shorter).toEqual(s);
	});
});

describe('plus tests', function () {
	it('test 1', function () {
		var a1 = [1, 2, 3];
		var a2 = [10, 10, 10];

		expect(tests.plus(a1, a2)).toEqual([11, 12, 13]);
		expect(tests.plus(a2, a1)).toEqual([11, 12, 13]);
	});	

	it('test 2', function () {
		var a1 = [1, 2, 3];
		var a2 = [10, 10, 10, 10];

		expect(tests.plus(a1, a2)).toEqual([10, 11, 12, 13]);
		expect(tests.plus(a2, a1)).toEqual([10, 11, 12, 13]);
	});

	it('test 3', function () {
		var a1 = [];
		var a2 = [10, 10, 10, 10];

		expect(tests.plus(a1, a2)).toEqual([10, 10, 10, 10]);
		expect(tests.plus(a2, a1)).toEqual([10, 10, 10, 10]);
	});

	it('test 4', function () {
		var a1 = [1];
		var a2 = [10, 10, 10, 10];

		expect(tests.plus(a1, a2)).toEqual([10, 10, 10, 11]);
		expect(tests.plus(a2, a1)).toEqual([10, 10, 10, 11]);
	});
});

describe('mult tests', function () {
	it('test 1', function () {
		var n = 2;
		var a = [10, 20, 30];

		expect(tests.mult(n, a)).toEqual([20, 40, 60]);
	});
});

describe('reduce tests', function () {
	it('test 1', function () {
		var a = [0, 0, 0, 0],
			fn = function (accum, el) {
				return el / accum;
			};

		expect(isNaN(tests.reduce(a, fn, 1))).toBeTruthy();
		expect(isNaN(tests.reduce(a, fn))).toBeTruthy();
	});	

	it('test 2', function () {
		var a = [1, 2, 3, 4],
			fn = function (accum, el) {
				return el + accum;
			};

		expect(tests.reduce(a, fn)).toEqual(10);
		expect(tests.reduce(a, fn, 1)).toEqual(11);
	});

	it('test 3', function () {
		var a = [1, 2, 3, 4],
			fn = function (accum, el) {
				accum.push(el);

				return accum;
			};

		expect(tests.reduce(a, fn, [0])).toEqual([0, 1, 2, 3, 4]);
	});
});

describe('distribute tests', function () {
	it('test 1', function () {
		var p1 = [1, 0, 3],
			p2 = [1, 0, 0, 0, 0, 0, -7, -1, 21],
			expected = [1, 0, 3, 0, 0, 0, -7, -1, 0, -3, 63];

		expect(tests.distribute([p1, p2])).toEqual(expected);
		expect(tests.distribute([p2, p1])).toEqual(expected);
	});

	it('test 2', function () {
		var p1 = [1, 1, 1],
			p2 = [1, -1, -1],
			expected = [1, 0, -1, -2, -1];

		expect(tests.distribute([p1, p2])).toEqual(expected);
		expect(tests.distribute([p2, p1])).toEqual(expected);
	});

	it('test 3', function () {
		var p1 = [5, -1],
			p2 = [12, 0],
			expected = [60, -12, 0];

		expect(tests.distribute([p1, p2])).toEqual(expected);
		expect(tests.distribute([p2, p1])).toEqual(expected);
	});

	it('test 4', function () {
		var p1 = [1, -1],
			expected = [1, -2, 1];

		expect(tests.distribute([p1, p1])).toEqual(expected);
	});

	it('test 5', function () {
		var p1 = [1, -1],
			expected = [1, -3, 3, -1];

		expect(tests.distribute([p1, p1, p1])).toEqual(expected);
	});

	it('test 6', function () {
		var p1 = [1, -1],
			expected = [1, -4, 6, -4, 1];

		expect(tests.distribute([p1, p1, p1, p1])).toEqual(expected);
	});

	it('test 7', function () {
		var p1 = [1, -1],
			expected = [1, -5, 10, -10, 5, -1];

		expect(tests.distribute([p1, p1, p1, p1, p1])).toEqual(expected);
	});

	it('test 8', function () {
		var p1 = [1, -1],
			p2 = [1, 1, 1],
			p3 = [3, 5, 6],
			p4 = [8, 0, 0, 0, 0, 0],
			expected = [24, 40, 48, -24, -40, -48, 0, 0, 0, 0, 0];

		expect(tests.distribute([p1, p2, p3, p4])).toEqual(expected);
	});
});

describe('number tests', function () {
	it('test 1', function () {
		expect(tests.number(1)).toBeTruthy();
	});

	it('test 2', function () {
		expect(tests.number(Number(1))).toBeTruthy();
		expect(tests.number(new Number(1))).toBeTruthy();
	});

	it('test 3', function () {
		expect(tests.number(NaN)).toBeFalsy();
		expect(tests.number(NaN)).toBeFalsy();
	});

	it('test 4', function () {
		expect(tests.number(' ')).toBeFalsy();
		expect(tests.number('')).toBeFalsy();
	});

	it('test 5', function () {
		expect(tests.number(new Object())).toBeFalsy();
		expect(tests.number({})).toBeFalsy();
		expect(tests.number(true)).toBeFalsy();
		expect(tests.number(false)).toBeFalsy();
		expect(tests.number(Boolean(true))).toBeFalsy();
		expect(tests.number(new Boolean(true))).toBeFalsy();
		expect(tests.number(/\s+/)).toBeFalsy();
	});

	it('test 6', function () {
		expect(tests.number([])).toBeFalsy();
		expect(tests.number(new Array())).toBeFalsy();
	});

});

