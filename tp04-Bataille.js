// ==========================================
// CONFIGURATION ET VARIABLES GLOBALES
// ==========================================
const NBR_JOCKERS = 2; 
const ARRET_URGENCE = 2000; // Limite de tours pour éviter les boucles infinies

let jeu = [];      // Tableau principal contenant toutes les cartes du paquet
let joueurA = [];
let joueurB = [];  // Main du joueur B
let famille = [];  // Les 4 familles de cartes
let valeurs = [];  // Les valeurs des cartes (de l'As au 2)

// Remplissage des familles et des valeurs de base
famille.push("Trèfles", "Carreaux", "Pique", "Coeur"); 
valeurs.push("A", "R", "D", "V", "10", "9", "8", "7", "6", "5", "4", "3", "2");

// ==========================================
// FONCTIONS DU JEU
// ==========================================

/**
 * Crée le jeu de cartes complet en combinant les familles, les valeurs et les jokers.
 */
function creeJeu(jeu, nbrJocker){
    jeu.length = 0; // Vide le tableau au cas où il contiendrait déjà des éléments
    
    // Double boucle pour associer chaque valeur à chaque famille
    for(let i = 0; i < famille.length; i++){
        for(let j = 0; j < valeurs.length; j++){
            jeu.push(valeurs[j] + " de " + famille[i]);
        }
    }
    // Ajout des jokers dans le jeu
    for(let k = 0; k < nbrJocker; k++){
        jeu.push("Joker");
    }
}

/**
 * Distribue alternativement les cartes du jeu principal entre les deux joueurs.
 */
function distribuerCartes(){
    while(jeu.length > 0){
        joueurA.push(jeu.pop()); // Retire et donne une carte au Joueur A
        if(jeu.length > 0){
            joueurB.push(jeu.pop()); // Retire et donne une carte au Joueur B
        }
    }
}

/**
 * Affiche dans la console l'état actuel et le nombre de cartes de chaque joueur.
 */
function afficherResultats(){
	console.log("Joueur A (" + joueurA.length + " cartes) :", joueurA);
	console.log("Joueur B (" + joueurB.length + " cartes) :", joueurB);
}

/**
 * Mélange aléatoirement les cartes du jeu en effectuant un nombre 'nbr' d'échanges (swaps).
 */
function melangeJeu(jeu, nbr){
	for(let l = 0; l < nbr; l++){
		let hasard1 = Math.floor(Math.random() * jeu.length);
		let hasard2 = Math.floor(Math.random() * jeu.length);
        
		// Échange (swap) des deux cartes choisies aléatoirement
		let tmp = jeu[hasard1];
		jeu[hasard1] = jeu[hasard2];
		jeu[hasard2] = tmp;
	}
}

/**
 * Permet au joueur de couper le jeu de manière aléatoire si souhaité.
 */
function coupeJeu(jeu) {
    let reponse = prompt("Voulez-vous couper le jeu ? (oui/non)");
    if (reponse && reponse.toLowerCase() === "oui") {
        let position = Math.floor(Math.random() * jeu.length);
        let cartesCoupees = jeu.splice(position); // Coupe le tableau à partir d'une position aléatoire
        jeu.unshift(...cartesCoupees);            // Place les cartes coupées au tout début
    }
}

/**
 * Gère la boucle principale du jeu de bataille tour par tour.
 */
function joueBataille(joueurA, joueurB) {
    let tours = 0;
    
    // La partie continue tant que les deux joueurs ont des cartes et qu'on n'atteint pas l'arrêt d'urgence
    while (joueurA.length > 0 && joueurB.length > 0 && tours < ARRET_URGENCE) {
        tours++;
        
        // Chaque joueur tire sa carte du dessus
        let carteA = joueurA.shift();
        let carteB = joueurB.shift();
        
        // Récupération de l'index de force de chaque carte dans le tableau 'valeurs'
        let indexA = valeurs.indexOf(carteA.split(" ")[0]);
        let indexB = valeurs.indexOf(carteB.split(" ")[0]);
        
        // Comparaison des cartes (plus l'index est petit, plus la carte est forte)
        if (indexA < indexB) {
            joueurA.push(carteA, carteB); // Le joueur A remporte les deux cartes
        } else if (indexA > indexB) {
            joueurB.push(carteA, carteB); // Le joueur B remporte les deux cartes
        } else {
            // Égalité (bataille simple) : chacun récupère sa carte
            joueurA.push(carteA);
            joueurB.push(carteB);
        }
    }
    
    // Affichage du résultat final de la partie
    if (tours >= ARRET_URGENCE) {
        console.log("Arrêt d'urgence atteint (2000 tours) ! Match nul.");
    } else if (joueurA.length === 0) {
        console.log("Le Joueur B a gagné la partie !");
    } else {
        console.log("Le Joueur A a gagné la partie !");
    }
}



creeJeu(jeu, NBR_JOCKERS);   // 1. Création des cartes
melangeJeu(jeu, 100);        // 2. Mélange du paquet
coupeJeu(jeu);               // 3. Coupe optionnelle du jeu
distribuerCartes();          // 4. Distribution des cartes aux joueurs
joueBataille(joueurA, joueurB); // 5. Lancement de la partie
afficherResultats();         // 6. Affichage final des mains