/**
 * Basic approach
 * Time complexity: O(n)
 */
function sum_to_n_a(n: number): number {
	let result = 0;
    for(let i = 1; i <= n; i++) {
        result += i;
    }

    return result;
}

/**
 * Two pointers approach
 * Time complexity: O(n)
 */
function sum_to_n_b(n: number): number {
	let result = 0;
    let tail = n;
    const mid = Math.ceil(n/2);

    for (let i = 1; i <= mid; i++) {
        result += i;
        if (tail > mid) {
            result += tail;
            tail--;
        }
    }

    return result;
}

/**
 * Using a mathematical formula approach
 * Time complexity: O(1)
 */
function sum_to_n_c(n: number): number {
	const result = (n + (n + 1)) /2;
    return result;
}