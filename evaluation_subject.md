# Evaluation programmation parallèle
- Vous pouvez choisir parmis les technologies vues en cours :
    - Java
    - C# 
    - JS (typescript, node, ...) ==> Attention, si vous choisissez du js, vous devez réaliser des promises vous même et faire quelque chose de complet qui ne part pas du format proposé par les exercices réalisés en autonomie via le lien github.
- Cette évaluation est normalement trop longue intentionnellement, mais c'est normal
- Vous allez avoir 4 exercices proposés que j'ai essayé de trier par ordre de difficulté / temps (essayé...)
- L'exercice 4 semble long, mais il est extrêmement simple et rapide si vous avez compris l'asynchronisme et les promises
- Je conseille de faire les exercices dans l'ordre 1,2,4,3 (oui, c'est con mais j'ai eu la flemme d'inverser les exos)

## Rendu :
- **Sur Classroom !!**
- Soit un zip avec les exercices, un dossier par exercice (en retirant les dossier de build genre node_modules(js), bin, obj(C#),...)
- Soit un lien vers un repo github avec un .gitignore (public ou me rajouter en tant que collaborateur : cbrasseur)

## Exercice 1 : Graphe simple à implémenter
- Un peu à l'instar de ce qui est demandé dans les exercices typescript, vous devez implémenter un comportement asynchrone permettant de gérer le workflow demandé. 
- Celui-ci est extrêmement simple : ![Voir capture](<graph1.png>)
- La sortie attendue est donc : 
```
A démarre
A termine
B démarre
C démarre
B termine
C termine
D démarre
D termine
```
- A noter que peu importe si B ou C démarre en premier (ils se lancent en même temps et terminent en même temps)

## Exercice 2 : Mise en place de traitement asynchrones simple
- Créer un programme qui exécute trois tâches en parallèle, pour ensuite faire la somme des nombres de 3 ranges différentes :
    - 1-100 pour la tâche 1
    - 101-200 pour la tâche 2
    - 201-300 pour la tâche 3
- Récupérez le résultats des trois tâches
- Affichez les indépendamment dans le terminal
- Ensuite, faites en sorte de faire la somme des trois ranges et affichez le dans le terminal

## Exercice 3: Réalisation d'un graphe plus complexe avec gestion d'erreur
- Comme pour l'exercice 1, vous devez implémenter le graphe proposé.
- Attention, celui-ci nécessite de gérer une durée pour chaque tâche.
- Celui-ci est un peu plus complexe : ![Voir capture](<graph2.png>)
- Explication textuelle du workflow : 
    - A : Démarre en premier, prends 2 secondes
    - B : Dépends de A, démarre dès que A est terminé, prends 3 secondes.
    - C : Dépends de A, démarre dès que A est terminé (en même temps que B), prends 1 secondes.
    - D : Dépends de B et de C, démarre seulement lorsque les deux sont terminés, prends 4 secondes.
    - E : Dépends de D, démarre seulement lorsque D est terminé, prends 3 secondes
    - F : Depends de C, démarre dès que C est terminé et prends 8 secondes.
- **Si vous n'arrivez pas du tout à gérer l'erreur, faites le même workflow sans l'erreur, ça vous donnera des points !**
- Exemple de retour attendu 
```
A démarre
A termine
B démarre
C démarre
C termine
F démarre
B termine
D démarre
D a échoué avec l'erreur : One or more errors occurred. ([Erreur simulée])
E ne peut pas démarrer en raison de l'échec de D.
F termine
Exécution du workflow terminée avec des erreurs.
```
- A noter que peu importe si B ou C démarre en premier (ils se lancent en même temps et terminent en même temps)

## Exercice 4 : Exercice de pratique d'asynchronisme
- Vous devez simuler la récupération de plusieurs informations concernant un utilisateur.
- Chaque information est récupérée via une fonction asynchrone qui met un certain temps à répondre.
- Vous devez implémenter trois fonctions asynchrones simulant :
    - la récupération du profil utilisateur (2 secondes)
    - la récupération des commandes de l'utilisateur (3 secondes)
    - la récupération des messages de l'utilisateur (1 seconde)
- Chaque fonction doit :
    - afficher quand elle démarre
    - attendre la durée simulée
    - afficher quand elle termine
    - retourner une valeur simulée
- Ces trois opérations doivent être lancées en parallèle (sans worker).
- Une fois les trois résultats récupérés :
    - affichez le profil
    - affichez le nombre de commandes
    - affichez le nombre de messages
- Vous devez utiliser un mécanisme permettant d'attendre la fin de toutes les tâches avant d'afficher le résultat final.


### Code à adapter
- Voici le code (non asynchrone que vous pouvez exploiter et / ou adapter !)
- **ATTENTION LES FONCTIONS SONT A ADAPTER POUR FAIRE DE L'ASYNCHRONISME !!!**
```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

 function fetchUserProfile() {
  console.log("Récupération du profil utilisateur")
  delay(2000)

  console.log("Profil utilisateur récupéré")
  return { name: "Alice" }
}

 function fetchUserOrders() {
  console.log("Récupération des commandes")
  delay(3000)

  console.log("Commandes récupérées")
  return [1, 2, 3, 4]
}

 function fetchUserMessages() {
  console.log("Récupération des messages")
  delay(1000)

  console.log("Messages récupérés")
  return ["msg1", "msg2", "msg3", "msg4", "msg5", "msg6", "msg7", "msg8", "msg9", "msg10", "msg11", "msg12"]
}

async function main() {
    // A remplir ici (En fonction de si vous êtes en commonjs ou module, sinon pas besoin de cette fonction async function main() et vous pouvez directement faire votre code asynchrone dans le fichier directement)
}
```

### Exemple de sortie attendue
```
Récupération du profil utilisateur
Récupération des commandes
Récupération des messages

Messages récupérés
Profil utilisateur récupéré
Commandes récupérées

Résumé utilisateur :
Nom : Alice
Commandes : 4
Messages : 12
```
