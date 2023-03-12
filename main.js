var taille = document.querySelector('#fNumber');
var showResultat = document.querySelector('#resultat');
var result = document.querySelector('#resultat');
var bouttonEnvoi = document.querySelector('#sendForm');
var checkMinuscules = document.querySelector('#fMinuscules');
var checkMajuscules = document.querySelector('#fMajuscules');
var checkChiffres = document.querySelector('#fChiffres');
var checkSpeciaux = document.querySelector('#fSpeciaux');

var copy = document.querySelector('#copy');

var listeMinuscules = 'abcdefghijklmnopqrstuvwxyz';             // 97 -> 122 = minuscules (UNICODE)
var listeMajuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';             // 65 -> 90 = mauscules
var listeChiffres = '0123456789';                               // 48 -> 57 = chiffres
var listeSpeciaux = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';     // 32 -> 47 + 58 -> 64 + 91 -> 96 + 123 -> 126 = spéciaux

// Fonction simple de génération de mot de passe avec la table UNICODE
function passWord(length) {
    let result = "";
    for (let i=0; i<length; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * (127-33) + 32));
    }
    return result;
}

// Ce qu'il se passe lorsque le bouton Générer est cliqué
bouttonEnvoi.addEventListener('click', function(){
    // On vérifie pour chaque checkbox si elle est cochée ou non
    var minuscules = checkMinuscules.checked;
    var majuscules = checkMajuscules.checked;
    var chiffres = checkChiffres.checked;
    var speciaux = checkSpeciaux.checked;

    // Initialisation du mot de passe et de la liste des caractères qui vont être choisis
    var mdp = '';
    var listePossibilités = '';

    if (minuscules) {
        listePossibilités += listeMinuscules;
    }
    if (majuscules) {
        listePossibilités += listeMajuscules;
    }
    if (chiffres) {
        listePossibilités += listeChiffres;
    }
    if (speciaux) {
        listePossibilités += listeSpeciaux;
    } else if (!minuscules && !majuscules && !chiffres && !speciaux) {
        alert("Vous devez cocher au moins une caractéristique! \n Je considère tout comme coché avec une taille de 8.");
        listePossibilités = listeMinuscules + listeMajuscules + listeChiffres + listeSpeciaux;
        taille.value = 8;
    }

    // Création du mot de passe en fonction des caractéristiques choisies
    for (let i=0; i<taille.value; i++) {
        mdp += listePossibilités[Math.floor(Math.random() * listePossibilités.length)];
    }

    // Affichage en bulle pop du mot de passe
    //alert(mdp);

    // Affichage sur la page du mot de passe
    showResultat.classList.remove('invisible');
    result.innerText = mdp;
    copy.style.display = 'block';
});

copy.addEventListener('click', function() {
    // Copie le texte entre () dans le presse-papier
    navigator.clipboard.writeText(result.innerText);
});