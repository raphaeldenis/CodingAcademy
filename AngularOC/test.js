// fonction qui retourne un message de bienvenue
function direBonjour(personne) {
    return "Bonjour, " + personne;
}
// création d'une variable "Jean"
var Jean = "Jean";
// on ajoute dans notre la page HTML un message
// pour affiche "Bonjour, Jean".
document.body.innerHTML = direBonjour(Jean);
