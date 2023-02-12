/**
 *	Oggetto Utente
 *	@memberof MyApp
 *	@class
 */
 if ("undefined" == typeof MyApp) {
	MyApp = {};
}

 MyApp.Utente = function() {
    this.nome = null;
    this.cognome = null;
    this.table = null;
}

MyApp.Utente.CLASS = "MyApp.Utente";

MyApp.Utente.prototype.getNome = function() {
	return this.nome;
};

 MyApp.Utente.prototype.setNome = function(nome) {
	return this.nome = nome;
};

 MyApp.Utente.prototype.getCognome = function() {
	return this.cogname;
};

 MyApp.Utente.prototype.setCognome = function(cogname) {
	return this.cogname = cogname;
};

 MyApp.Utente.prototype.avvio = function() {
	this.setNome("Daniele");
	this.setCognome("Mercuri");
    console.log(this.getNome() + this.getCognome());
};

 MyApp.Utente.prototype.getTable = function() {
	return this.table;
};

 MyApp.Utente.prototype.setTable = function(table) {
	return this.table = table;
};
/**
 *	Oggetto ConnectDb
 *  @memberof MyApp
 *	@class
 *  @extends  Utente
 */

 MyApp.ConnectDb = function() {
    MyApp.Utente.apply(this, arguments);
    this.HTTP = null;
} 

MyApp.ConnectDb.prototype = new MyApp.Utente();

MyApp.ConnectDb.CLASS = "MyApp.ConnectDb";
var $ = require( "jquery" );

MyApp.ConnectDb.prototype.init = function() {
    this.HTTP = new XMLHttpRequest();
}

MyApp.ConnectDb.prototype.getInsertInput = function() {
    this.init();
    let filter = {};
    this.setNome(document.querySelector("#name").value);
    this.setCognome(document.querySelector("#surname").value);
    filter.method = "insert";
    filter.nome = this.getNome();
    filter.cognome = this.getCognome();

    let obj = JSON.stringify(filter)
    let params = "in="+obj;

    const url = "/TestApp-server/Test";
    this.HTTP.open("POST", url, true);
    this.HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.HTTP.send(params);

    this.HTTP.onreadystatechange = (e) => {
        let dati = this.HTTP.response;
        if (dati) {
            console.log(dati);
        }
    }
}

MyApp.ConnectDb.prototype.getValueInput = function() {
    this.init();
    let filter = {};
    filter.method = "select";
    filter.table = document.querySelector("#table").value;

    let obj = JSON.stringify(filter)
    let params = "in="+obj;

    const url = "/TestApp-server/Test";
    this.HTTP.open("POST", url, true);
    this.HTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.HTTP.send(params);

    this.HTTP.onreadystatechange = (e) => {
        let dati = this.HTTP.response;
        if(dati){
            data = JSON.parse(dati);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var object = data[i];
                for (property in object) {
                    var value = object[property];
                    document.querySelector("#demo").innerHTML += property + " = " + value + "<br/>"; 
                }
            } 
        }
    }
    this._tag = self.document.createElement("div");
    $(this._tag).addClass("NMSP__WidgetNative");

    return this._tag;
}

MyApp.ConnectDb.prototype.getRoot = function() {
	return this._tplBuild();
};


