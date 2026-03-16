function runTask(taskName, duration, options = {}) {
	const { shouldFail = false, failureMessage = "Erreur simulée" } = options;

	return new Promise((resolve, reject) => {
		console.log(`${taskName} démarre`);

		setTimeout(() => {
			if (shouldFail) {
				reject(new Error(failureMessage));
				return;
			}

			console.log(`${taskName} termine`);
			resolve(taskName);
		}, duration);
	});
}

function runWorkflow() {
	let hasErrors = false;

	return runTask("A", 2000)
		.then(() => {
			const bPromise = runTask("B", 3000);
			const cPromise = runTask("C", 1000);

			const fPromise = cPromise.then(() => runTask("F", 8000));

			const dPromise = Promise.all([bPromise, cPromise]).then(() =>
				runTask("D", 4000, {
					shouldFail: true,
					failureMessage: "One or more errors occurred. ([Erreur simulée])",
				})
			);

			const ePromise = dPromise
				.then(() => runTask("E", 3000))
				.catch((error) => {
					hasErrors = true;
					const message = error instanceof Error ? error.message : String(error);
					console.log(`D a échoué avec l'erreur : ${message}`);
					console.log("E ne peut pas démarrer en raison de l'échec de D.");
				});

			return Promise.all([fPromise, ePromise]);
		})
		.then(() => {
			if (hasErrors) {
				console.log("Exécution du workflow terminée avec des erreurs.");
			} else {
				console.log("Exécution du workflow terminée avec succès.");
			}
		})
		.catch((error) => {
			console.error("Erreur inattendue pendant le workflow :", error);
		});
}

runWorkflow();
