/**
 *	Oggetto Utente
 *	@memberof _APP_NAME_SPACE__
 *	@class
 */
 if ("undefined" == typeof _APP_NAME_SPACE__) {
	_APP_NAME_SPACE__ = {};
}

 _APP_NAME_SPACE__.Utente = function() {
    this.nome = null;
    this.cognome = null;
    this.table = null;
}

_APP_NAME_SPACE__.Utente.CLASS = "_APP_NAME_SPACE__.Utente";

_APP_NAME_SPACE__.Utente.prototype.getNome = function() {
	return this.nome;
};

 _APP_NAME_SPACE__.Utente.prototype.setNome = function(nome) {
	return this.nome = nome;
};

 _APP_NAME_SPACE__.Utente.prototype.getCognome = function() {
	return this.cogname;
};

 _APP_NAME_SPACE__.Utente.prototype.setCognome = function(cogname) {
	return this.cogname = cogname;
};

 _APP_NAME_SPACE__.Utente.prototype.avvio = function() {
	this.setNome("Daniele");
	this.setCognome("Mercuri");
    console.log(this.getNome() + this.getCognome());
};

 _APP_NAME_SPACE__.Utente.prototype.getTable = function() {
	return this.table;
};

 _APP_NAME_SPACE__.Utente.prototype.setTable = function(table) {
	return this.table = table;
};