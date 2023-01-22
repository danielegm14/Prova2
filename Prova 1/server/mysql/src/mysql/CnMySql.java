/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package mysql;
import java.sql.*;

public class CnMySql {
	public CnMySql() {}
	private String _nome, _cognome;
	
	private boolean _checkOk(String server) throws ClassNotFoundException{
		try {
			Class.forName(server); //verifica che ci sia la libreria che permette la connessione
		} catch (ClassNotFoundException e) {
			System.out.println("ClassNotFoundException:");
			System.err.println("ERRORE -->" + e.getMessage());
		//	if(e != null) return false;
		} // fine try-catch
		return true;
	}
	
	// creo connessione al database
	private Connection _cn(String server) throws SQLException, ClassNotFoundException {
		if (_checkOk(server)) {
			 //per aprire la connessione: jdbc:mysql: --> tipo di driver; new_user --> nome del database; user=root&password= --> nome utente e password
			Connection cn = DriverManager.getConnection("jdbc:mysql://localhost:3306/new_user?user=root&password=");
			return cn;}
		else return null;
	}
	
	// query INSERT INTO 
	private String _insertSql(String table, String colonne) {
		String insertSql = "INSERT INTO " + table + " (" + colonne + ") VALUES (" + "'" + getNome() + "'" + ", " + "'" + getCognome() + "'" +");";
		return insertSql;
	}
	
	//Statement st; permette di costruire le query
	//ResultSet rs; consente di avere il risultato della query
	public void executeSql(String table, String colonne, String server, String nome, String cognome) throws SQLException, ClassNotFoundException {
		setNome(nome);
		setCognome(cognome);
		String sql = _insertSql(table, colonne);
		Statement st;
		ResultSet rs = null;
		Connection cn = this._cn(server);
		try {
		
		System.out.println("Secondo step!");
		st = cn.createStatement(); // creo sempre uno statement sulla connessione
		st.execute(sql); // faccio la query su uno statement // per eseguire la query insert into
		//rs = st.executeQuery(sql);
		
		} catch (SQLException e) {
			System.out.println("errore: " + e.getMessage());
			
		} // fine try-catch
		/*
		while (rs.next()== true) {
			System.out.println(rs.getString("nome") + " " + rs.getString("cognome"));
		}
		*/
		cn.close(); // chiusura connessione
	}
	
	public String setNome(String nome) {
		return this._nome = nome;
	}
	
	public String getNome() {
		return this._nome;
	}
	
	public String setCognome(String cognome) {
		return this._cognome = cognome;
	}
	
	public String getCognome() {
		return this._cognome;
	}
	
	
	public static void main(String[] args) throws SQLException, ClassNotFoundException {
		System.out.println("Inizio");
		CnMySql avvio = new CnMySql();
		String nome = "Angelo";
		String cognome = "Rosso";
		String server = "com.mysql.cj.jdbc.Driver";
		String table = "utente";
		String colonne = "nome, cognome";
		
		avvio.executeSql(table, colonne, server, nome, cognome);
		
		System.out.println("Ho finito!");
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}// fine main
}// fine classe     