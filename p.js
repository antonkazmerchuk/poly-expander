(function (context, undefined) {

	function minmax(arr1, arr2) {
		function pred() {
			return arr1.length > arr2.length;
		}
		var longer = pred() ? arr1 : arr2,
			shorter = pred() ? arr2 : arr1;

		return {longer : longer, shorter : shorter};
	}

	function plus(arr1, arr2) {
		var longer = minmax(arr1, arr2).longer,
			shorter = minmax(arr1, arr2).shorter,
			diff = Math.abs(arr1.length - arr2.length),
			result = [],
			i;

		while(diff--) {
			shorter.unshift(0);
		}

		for (i = 0; i < longer.length; i++) {
			result[i] = longer[i] + shorter[i];
		}

		return result;
	}
	function map(array, fn) {
		var result = [];
		for (var i = 0; i < array.length; i++) {
			result.push(fn(array[i]));
		}

		return result;
	}

	function mult(factor, array) {
		return map(array, function (a) {return a * factor;});
	}

	function reduce(array, fn, init) {
		var arr = init && array || array.slice(1),
			init = init || array[0];

		for (var i = 0; i < arr.length; i++) {
			init = fn(init, arr[i]);
		}

		return init;
	}

	// Here we get list of simplified polys, like: [[1, 3, 5] [4,5], [7, 8, whateva]]
	function distribute(polys) {
		function distributeInternal(poly1, poly2) {
			var sums = [],
				longer = minmax(poly1, poly2).longer,
				shorter = minmax(poly1, poly2).shorter,
				i, j;

			for (i = 0; i < shorter.length; i++) {
				var sum = [];

				for (j = 0; j < longer.length; j++) {
					sum.push(longer[j] * shorter[i]);
				}

				for (j = 0; j < shorter.length - i - 1; j++) {
					sum.push(0);
				}

				sums.push(sum);
			}

			sums = reduce(sums, plus);


			return sums;
		}

		return reduce(polys, distributeInternal);
	}

	function number(potentialNumber) {
		return typeof(potentialNumber) === 'number';
	}

	function incorrect(poly) {
		if (poly.length === 1) {
			return false;
		} else {
			var wereNumbers = false,
				wereArrays = false;

			if (!number(poly[0])) {
				wereArrays = !wereArrays;
			}

			for (var i = 1; i < poly.length; i++) {
				if (number(poly[i])) {
					wereNumbers = true;
				} else {
					wereArrays = true;
				}
			}

			return wereArrays && wereNumbers;
		}
	}

	function simplePolynomial(poly) {
		for (var i = 0; i < poly.length; i++) {
			if (!number(poly[i])) {
				return false;
			}
		}

		return true;
	}

	function expandPolynomial(poly) {
		var coefficient, polys;

		if (incorrect(poly)) {
			throw new Error('Incorrect polynomial specified !' + ' Couldn\'t understand: ' + poly);
		}

		if (simplePolynomial(poly)) {
			return poly;
		} else if (number(poly[0])) {
			coefficient = poly[0];
			poly = poly.slice(1);
		} else {
			coefficient = 1;
		}

		return mult(coefficient, distribute(map(poly, expandPolynomial)));
	}

	//context.expandPolynomial = expandPolynomial;

	// DO TESTS:!

	context.tests = {
		map : map,
		minmax: minmax,
		plus : plus,
		mult : mult,
		reduce : reduce,
		distribute : distribute,
		number : number,
		incorrect : incorrect,
		simplePolynomial : simplePolynomial,
		expandPolynomial : expandPolynomial
	};
}(window))