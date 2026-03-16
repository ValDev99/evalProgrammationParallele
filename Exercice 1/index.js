function runStep(step, duration) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`${step} démarre`);
      setTimeout(() => {
        console.log(`${step} termine`);
        resolve();
      }, duration);
    } catch (error) {
      reject(error);
    }
  });
}

function runWorkflow() {
  return (async () => {
    await runStep("A", 300);

    await Promise.all([
      runStep("B", 300),
      runStep("C", 300),
    ]);

    await runStep("D", 300);
  })();
}

runWorkflow().catch((error) => {
  console.error("Erreur pendant l'exécution du workflow:", error);
});
