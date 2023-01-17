
// const e = React.createElement;

// class likeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }
// }

// let urll = '../json/utente.json';
// let request = new XMLHttpRequest();
// request.open('GET', urll);
// request.responseType = 'json';
// request.send();




// request.onload = function () {
//     const utente = request.response;
//     //console.log(utente.nome);
//     console.log(
//         'Nome: ', utente.nome, 
//         '\nCognome:', utente.cognome, 
//         '\nIndirizzo:', utente.indirizzo.via, 
//         '\nCittà::', utente.indirizzo.citta, 
//         '\nCAP:', utente.indirizzo.codPostale,
//         '\nProvincia:', utente.indirizzo.provincia,
//         '\nTelefono:', utente.recapiti.telefono[1].numero,
//         );
// }

let urll = '../json/utente.json';
fetch(urll).then(response => response.json()).then(utente => {
    // utente = json;
    console.log(utente);
    console.log(

        'Nome:', utente.nome, 
    
        '\nCognome:', utente.cognome, 
    
        '\nIndirizzo:', utente.indirizzo.via, 
    
        '\nCittà::', utente.indirizzo.citta, 
    
        '\nCAP:', utente.indirizzo.codPostale,
    
        '\nProvincia:', utente.indirizzo.provincia,
    
        '\nTelefono:', utente.recapiti.telefono[1].numero,
        );
    
});