function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUserProfile() {
	return new Promise((resolve, reject) => {
		try {
			console.log("Récupération du profil utilisateur");
			setTimeout(() => {
				console.log("Profil utilisateur récupéré");
				resolve({ name: "Valentin" });
			}, 2000);
		} catch (error) {
			reject(error);
		}
	});
}

function fetchUserOrders() {
	return new Promise((resolve, reject) => {
		try {
			console.log("Récupération des commandes");
			setTimeout(() => {
				console.log("Commandes récupérées");
				resolve([1, 2, 3]);
			}, 3000);
		} catch (error) {
			reject(error);
		}
	});
}

function fetchUserMessages() {
	return new Promise((resolve, reject) => {
		try {
			console.log("Récupération des messages");
			setTimeout(() => {
				console.log("Messages récupérés");
				resolve([
					"msg1",
					"msg2",
					"msg3",
					"msg4",
					"msg5",
					"msg6",
					"msg7",
				]);
			}, 1000);
		} catch (error) {
			reject(error);
		}
	});
}

function main() {
	return Promise.all([
		fetchUserProfile(),
		fetchUserOrders(),
		fetchUserMessages(),
	]).then(([profile, orders, messages]) => {
		console.log("\nRésumé utilisateur :");
		console.log(`Nom : ${profile.name}`);
		console.log(`Commandes : ${orders.length}`);
		console.log(`Messages : ${messages.length}`);
	});
}

main().catch((error) => {
	console.error("Erreur pendant la récupération des données utilisateur:", error);
});
