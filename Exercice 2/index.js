function sumRange(start, end) {
	let sum = 0;
	for (let value = start; value <= end; value += 1) {
		sum += value;
	}
	return sum;
}

function runTask(taskName, start, end, duration) {
	return new Promise((resolve, reject) => {
		try {
			console.log(`${taskName} démarre`);
			setTimeout(() => {
				const result = sumRange(start, end);
				console.log(`${taskName} termine`);
				resolve({ taskName, start, end, result });
			}, duration);
		} catch (error) {
			reject(error);
		}
	});
}

function runWorkflow() {
	return Promise.all([
		runTask("Tache 1", 1, 100, 300),
		runTask("Tzche 2", 101, 200, 300),
		runTask("Tache 3", 201, 300, 300),
	]).then((results) => {
		for (const item of results) {
			console.log(`${item.taskName} (${item.start}-${item.end}) = ${item.result}`);
		}

		const total = results.reduce((accumulator, item) => accumulator + item.result, 0);
		console.log(`Somme totale (1-300) = ${total}`);
	});
}

runWorkflow().catch((error) => {
	console.error("Erreur pendant l'exécution du workflow:", error);
});
