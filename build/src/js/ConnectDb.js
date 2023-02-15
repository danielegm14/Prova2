/**
 *	Oggetto ConnectDb
 *  @memberof _APP_NAME_SPACE__
 *	@class
 *  @extends  Utente
 */
 _APP_NAME_SPACE__.ConnectDb = function() {
    _APP_NAME_SPACE__.Utente.apply(this, arguments);
    this.HTTP = null;
    this._nativeTag = null;
    this._tag = null;
} 

_APP_NAME_SPACE__.ConnectDb.prototype = new _APP_NAME_SPACE__.Utente();

_APP_NAME_SPACE__.ConnectDb.CLASS = "_APP_NAME_SPACE__.ConnectDb";

_APP_NAME_SPACE__.ConnectDb.CSS_CLASS = "_APP_NAME_SPACE__ConnectDb"
_APP_NAME_SPACE__.ConnectDb.CSS_CLASS_UTENTE = "_APP_NAME_SPACE__Utente"

_APP_NAME_SPACE__.ConnectDb.prototype.init = function() {
    this.HTTP = new XMLHttpRequest();
}

_APP_NAME_SPACE__.ConnectDb.prototype.getInsertInput = function() {
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

_APP_NAME_SPACE__.ConnectDb.prototype.getValueInput = function() {
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
    this.inserimento();
}

_APP_NAME_SPACE__.ConnectDb.prototype.getRoot = function() {
	return this._tplBuild();
};

_APP_NAME_SPACE__.ConnectDb.prototype._tplBuild = function() {
	if (null != this._tag) {
		return this._tag;
	}

	if (!this._isNative()) {
		this._tag = this._tplCreateRoot();
	} else {
		// sono in modalita nativa
		this._tag  = this._nativeTag;
		$(this._tag).addClass("_APP_NAME_SPACE__WidgetNative");
	}
	$(this._tag).addClass(_APP_NAME_SPACE__.ConnectDb.CSS_CLASS);
	this._tplBuildBody();
	return this._tag;
};

_APP_NAME_SPACE__.ConnectDb.prototype._tplBuildBody = function() {
	// metodo virtuale di costruzione HTML
};

_APP_NAME_SPACE__.ConnectDb.prototype.addClass = function(val) {
	var trg = this.getRoot();
	$(trg).addClass(val);
};

_APP_NAME_SPACE__.ConnectDb.prototype._tplCreateRoot = function() {
	return self.document.createElement("div");
};

_APP_NAME_SPACE__.ConnectDb.prototype._isNative = function() {
	if (this._nativeTag) {
		return true;
	}
	return false;
};

// _APP_NAME_SPACE__.ConnectDb.prototype.inserimento = function () {
//     var div = this.createElement("div"); // creo contenitore
//     var body  = this.querySelector("body"); // seleziono l'attributo
//     div.setAttribute("id", "container");
//     let text = this.createTextNode("Ciao"); // creo testo da inserire
//     this.className(div, _APP_NAME_SPACE__.ConnectDb.CSS_CLASS); //  inserisco la classe css
//     this.className(div, _APP_NAME_SPACE__.ConnectDb.CSS_CLASS_UTENTE); //  inserisco la classe css

//     div.appendChild(text); // inserisco il testo
//     body.appendChild(div); // inserisco il contenitore
    
//   }

_APP_NAME_SPACE__.ConnectDb.prototype.inserimento = function () {
    var body  = this.querySelector("body"); // seleziono l'attributo
    var div = this.createElement("div"); // creo contenitore
    var input  = this.createElement("input"); // creo input
    var button  = this.createElement("button"); // button
    var p  = this.createElement("p"); // creo paragrafo
    let text = this.createTextNode("PREMI QUI");
    div.setAttribute("id", "container");// creo id = container
    input.setAttribute("id", "textIn"); // creo id = textIn
    button.setAttribute("id", "bottone"); // creo id = bottone
    button.setAttribute("onclick", "_APP_NAME_SPACE__.ConnectDb.prototype.saluta()"); // creo id = container + evento click
    p.setAttribute("id", "risultato"); // creo id = container
    this.className(div, _APP_NAME_SPACE__.ConnectDb.CSS_CLASS); //  inserisco la classe css
    this.className(p, "_APP_NAME_SPACE__Paragrafo"); //  inserisco la classe css
    this.className(button, "_APP_NAME_SPACE__Bottone"); //  inserisco la classe css
    // this.className(div, _APP_NAME_SPACE__.ConnectDb.CSS_CLASS_UTENTE); //  inserisco la classe css

    button.appendChild(text); // inserisco il contenitore
    div.append(input, button, p); // appendo tutto
    body.appendChild(div); // inserisco il contenitore
    
  }
  
_APP_NAME_SPACE__.ConnectDb.prototype.querySelector = function (param) {
    return document.querySelector(param);
  }

_APP_NAME_SPACE__.ConnectDb.prototype.createElement = function (create) {
    return document.createElement(create);
  }

_APP_NAME_SPACE__.ConnectDb.prototype.createTextNode = function (text) {
    return document.createTextNode(text)
  }

_APP_NAME_SPACE__.ConnectDb.prototype.className = function (addClass, cssName) {
    addClass.className += " " + cssName;
  }

_APP_NAME_SPACE__.ConnectDb.prototype.saluta = function () {
    let p = document.querySelector("#risultato")
    let text = this.createTextNode("BRAVO!"); // creo testo da inserire
    p.appendChild(text);
  }

  
