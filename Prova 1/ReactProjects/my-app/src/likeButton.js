'use strict';

const e = React.createElement;

class likeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'Hai Cliccato!.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'CLICCA'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(likeButton));


$(document).ready(function(){
  //        $('#saluto').hide();

      });

     

      $('#btn1').click(function(){
          $('#saluto').toggle();

      });

      function sql(params) {
        var java = require("java");
        java.classpath.push("../server/mysql/src/mysql/CnMySql.java");
        let pack = "mysql.";
        let classe = "CnMySql";
        let metodo = "executeSql";
        let table = "utente";
        let colonne = "nome, cognome";
        let server = "com.mysql.cj.jdbc.Driver";
        let nome = "Vercingetorige";
        let cognome = "Callisto";
        
        java.callStaticMethodSync(pack + classe, metodo, table, colonne, server, nome, cognome);
        console.log("Finito");
        }

