/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package mysql;
import java.sql.*;
public class ConnessioneMysql {
	public static void main(String[] args) throws SQLException {
		Connection cn; //connessione al database
		Statement st; //permette di costruire le query
		ResultSet rs; //consente di avere il risultato della query
		String sql; //stringa contenente il codice
		// ________________________________connessione
		try {
			Class.forName("com.mysql.jdbc.Driver"); //verifica che ci sia la libreria che permette la connessione
		} catch (ClassNotFoundException e) {
			System.out.println("ClassNotFoundException: ");
			System.err.println(e.getMessage());
		} // fine try-catch
		// Creo la connessione al database
		cn = DriverManager.getConnection("jdbc:mysql://localhost:3306/new_user?user=root&password="); //per aprire la connessione: jdbc:mysql: --> tipo di driver; new_user --> nome del database; user=root&password= --> nome utente e password
		// peer � il nome del database
                String nome = "Francesco";
                String cognome = "Gentili";
		sql = "SELECT * FROM utente;";
                String insertSql = "INSERT INTO utente (nome, cognome) VALUES (" + "'" + nome + "'" + ", " + "'" + cognome + "'" +")";
                System.out.println(insertSql);
		// ________________________________query
		try {
			st = cn.createStatement(); // creo sempre uno statement sulla
//			st.execute(insertSql);				// connessione
			rs = st.executeQuery(sql); // faccio la query su uno statement
			while (rs.next() == true) {
				System.out.println(rs.getString("id_utente") + " ---> " + rs.getString("nome") + " " + rs.getString("cognome"));
			}
		} catch (SQLException e) {
			System.out.println("errore:" + e.getMessage());
		} // fine try-catch
		cn.close(); // chiusura connessione
	}// fine main
}// fine classe     
         

   
