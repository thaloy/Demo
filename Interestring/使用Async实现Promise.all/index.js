// v1 PromiseAll
async function PromiseAll(promises) {
	let callBackCount = 0;
	const callBackValues = [];
	const promisesLen = promises.length;

	return await new Promise((resolve, reject) => {
		promises.forEach((promise, promiseIdx) => {
			promise.then(
				res => {
					callBackValues[promiseIdx] = res;
					callBackCount += 1;
					if (callBackCount = promisesLen - 1) resolve(callBackValues);
				},
				reason => reject(reason),
			);
		});
	});
}

// v2 PromiseAll
async function PromiseAll(promises) {
  let callBackValues = [];
  for (let i = 0; i < promises.length; i += 1) {
    callBackValues.push(await promises[i]);
  }
  return callBackValues;
}

// test code
function succ() {
	return new Promise(resolve => setTimeout(resolve.bind(null, 'success'), 2000))
}

function fail() {
	return new Promise((resolve, reject) => {
		setTimeout(reject.bind(null, 'fail'), 1000);
	});
}

console.time('Promise.all');
Promise.all([succ, fail].map(func => func()))
.then(res => {
	console.log(res);
	console.timeEnd('Promise.all');
})
.catch(res => {
	console.log(res);
	console.timeEnd('Promise.all');
});

console.time('PromiseAll');
PromiseAll([succ, fail].map(func => func()))
.then(res => {
	console.log(res);
	console.timeEnd('PromiseAll');
})
.catch(res => {
	console.log(res);
	console.timeEnd('PromiseAll');
});

