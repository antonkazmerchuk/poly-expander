jasmine.Matchers.prototype.toApproxBeEqual = function (expected, precision) {
	var delta = Math.pow(10, precision && -precision || -2);

	for (var i = 0; i < this.actual.length; i++) {
		if(Math.abs(this.actual[i] - expected[i]) > delta) {
			return false;
		}
	}

	return true;
}

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

// Incorrect only tests the 'surface' level of polynomial
// It doesn't test deeper levels, they are intended to be tested as the recursion goes
describe('incorrect tests', function () {
	it('test 1', function () {
		// Correct one
		var poly = [[[[[[[[[[[[[[[[[1]]]]]]]]]]]]]]]]];

		expect(tests.incorrect(poly)).toBeFalsy();
	});

	it('test 2', function () {
		// Correct one
		var poly = [[], [1,2],[[], [1,2]]];

		expect(tests.incorrect(poly)).toBeFalsy();
	});

	it('test 3', function () {
		// Incorrect one
		var poly = [[], [1,2],[[], [1,2]], 1, [1]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});	

	it('test 4', function () {
		// Incorrect one
		var poly = [[], [1, 2], [], [1,2]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 5', function () {
		// Correct one
		var poly = [1, [2, 3], [2,3]];

		expect(tests.incorrect(poly)).toBeFalsy();
	});

	it('test 6', function () {

		var poly = [1, [2,3], 1, [2]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 7', function () {

		var poly = [1, [2,3], [], [2]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 8', function () {

		var poly = [1, [2,3], [[]], [2]];

		expect(tests.incorrect(poly)).toBeFalsy();
	});

	it('test 9', function () {

		var poly = [1, 1, 2, 3, 2];

		expect(tests.incorrect(poly)).toBeFalsy();
	});

	it('test 10', function () {

		var poly = [1, 1, 2, [3], 2];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 11', function () {

		var poly = [['you'], [1,2],[[], [1,2]]];

		expect(tests.incorrect(poly)).toBeFalsy();
	});	

	it('test 12', function () {

		var poly = ['you', [2, 3], [2,3]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 13', function () {

		var poly = [1, /you/, 2, 3, 2];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 14', function () {

		var poly = [];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 15', function () {

		var poly = [[1, 2], [3, 5], [5, 3,1 ,1, 2, 2]];

		expect(tests.incorrect(poly)).toBeFalsy();
	});

	it('test 16', function () {

		var poly = [[1, 2], [3, 5], [], [5, 3,1 ,1, 2, 2]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 17', function () {

		var poly = [[1, 2], [3, 5], 0, [5, 3,1 ,1, 2, 2]];

		expect(tests.incorrect(poly)).toBeTruthy();
	});

	it('test 18', function () {

		var poly = ['you'];

		expect(tests.incorrect(poly)).toBeTruthy();
	});
});

describe('simplePolynomial tests', function () {
	it('test 1', function () {
		var poly = [1, 2, 3];

		expect(tests.simplePolynomial(poly)).toBeTruthy();
	});

	it('test 2', function () {
		var poly = [];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 3', function () {
		var poly = [1, []];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 4', function () {
		var poly = [1, [2]];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 5', function () {
		var poly = [1, [2], 1];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 6', function () {
		var poly = [[]];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 7', function () {
		var poly = [[], 1];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 8', function () {
		var poly = [[], 1, [1]];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 9', function () {
		var poly = [[], [1, 2], [1]];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});

	it('test 10', function () {
		var poly = [1, [], 'str'];

		expect(tests.simplePolynomial(poly)).toBeFalsy();
	});
});

describe('expandPolynomial for multiplicative forms', function () {
	// Some random good polynomials (from distribute tests)
	it('test 1', function () {
		var p1 = [1, 0, 3],
			p2 = [1, 0, 0, 0, 0, 0, -7, -1, 21],
			expected = [1, 0, 3, 0, 0, 0, -7, -1, 0, -3, 63];

		expect(tests.expandPolynomial([p1, p2])).toEqual(expected);
		expect(tests.expandPolynomial([p2, p1])).toEqual(expected);
	});

	it('test 2', function () {
		var p1 = [1, 1, 1],
			p2 = [1, -1, -1],
			expected = [1, 0, -1, -2, -1];

		expect(tests.expandPolynomial([p1, p2])).toEqual(expected);
		expect(tests.expandPolynomial([p2, p1])).toEqual(expected);
	});

	it('test 3', function () {
		var p1 = [5, -1],
			p2 = [12, 0],
			expected = [60, -12, 0];

		expect(tests.expandPolynomial([p1, p2])).toEqual(expected);
		expect(tests.expandPolynomial([p2, p1])).toEqual(expected);
	});

	it('test 4', function () {
		var p1 = [1, -1],
			expected = [1, -2, 1];

		expect(tests.expandPolynomial([p1, p1])).toEqual(expected);
	});

	it('test 5', function () {
		var p1 = [1, -1],
			expected = [1, -3, 3, -1];

		expect(tests.expandPolynomial([p1, p1, p1])).toEqual(expected);
	});

	it('test 6', function () {
		var p1 = [1, -1],
			expected = [1, -4, 6, -4, 1];

		expect(tests.expandPolynomial([p1, p1, p1, p1])).toEqual(expected);
	});

	it('test 7', function () {
		var p1 = [1, -1],
			expected = [1, -5, 10, -10, 5, -1];

		expect(tests.expandPolynomial([p1, p1, p1, p1, p1])).toEqual(expected);
	});

	it('test 8', function () {
		var p1 = [1, -1],
			p2 = [1, 1, 1],
			p3 = [3, 5, 6],
			p4 = [8, 0, 0, 0, 0, 0],
			expected = [24, 40, 48, -24, -40, -48, 0, 0, 0, 0, 0];

		expect(tests.expandPolynomial([p1, p2, p3, p4])).toEqual(expected);
	});

	// Some more tests, pretty random too

	it('test 9', function () {
		var poly = [8, [3,-5], [8, [1, -6], [1, 5, 3]], [15, [1, 0, 0]], [1, 4]],
			expected = [2880, 3840, -103680, -214080, 397440, 345600, 0, 0];

		expect(tests.expandPolynomial(poly)).toEqual(expected);	
	});

	it('test 10', function () {

		var poly = [[3, -5], [1, -6]],
			expected = [3, -23, 30];

		expect(tests.expandPolynomial(poly)).toEqual(expected);
	});

	it('test 11', function () {

		var poly = [[3, 0, 0, 0, 0, -6], [1, -6]],
			expected = [3, -18, 0, 0, 0, -6, 36];

		expect(tests.expandPolynomial(poly)).toEqual(expected);
	});

	it('test 12', function () {

		var poly = [8, [1, -1], [1, -2], [1, -3], [8, [16, 0, 1], [1, 0, 0, 1]]],
			expected = [1024, -6144, 11328, -5504, -5440, 10944, -6528, 704, -384];

		expect(tests.expandPolynomial(poly)).toEqual(expected);
	});

	it('test 13', function () {

		var poly = [8, [7, [6, [5, [4, [3, [2, [1, [1, 0, -1], [1, 0, 0, 3, 0, 0, 0, 0, 1]]]]]]]]],
			expected = [40320, 0, -40320, 120960, 0, -120960, 0, 0, 40320, 0, -40320];

		expect(tests.expandPolynomial(poly)).toEqual(expected);
	});
});

describe('expandPolynomial non-classified tests', function () {
	it('test 1', function () {
		var poly = [0],
			expected = [0];

		expect(tests.expandPolynomial(poly)).toEqual(expected);
	});

	it('test 2', function () {
		var poly = [1, 2, 3, 4, 5, 6, 7 ,8, 9 , 10],
			expected = [1, 2, 3, 4, 5, 6, 7 ,8, 9 , 10];

		expect(tests.expandPolynomial(poly)).toEqual(expected);	
	})
});

describe('expandPolynomial additive forms', function () {
	// Rather random tests too

	it('test 1', function () {
		var poly = [[], [[1, -1], [1, -1]], [2, [1, -1]], [1]],
			expected = [1, 0, 0];

		expect(tests.expandPolynomial(poly)).toEqual(expected);
	});

	it('test 2', function () {
		var poly = [[], [0.236, [1, -1], [1, -2], [1, -3]], [0.5, [1, -1], [1, -2]], [-1.538, [1, -1]], [18.1]],
			expected = [59/250, -229/250, -221/500, 9611/500];

		expect(tests.expandPolynomial(poly)).toApproxBeEqual(expected);
	});
});