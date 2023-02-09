package servlet;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.JSONException;
import org.json.simple.JSONValue;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


/**
 * Servlet implementation class Test
 */
public class ServiceData {

    private String _nome, _cognome;

    public ServiceData() {}

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
       // String insertSql = "INSERT INTO " + table + " (" + colonne + ") VALUES (" + "'" + getNome() + "');";
        return insertSql;
    }

    //Statement st; permette di costruire le query
    //ResultSet rs; consente di avere il risultato della query
    public void insert(String nome, String cognome) throws SQLException, ClassNotFoundException {
        String table = "utente";
        String colonne = "nome, cognome";
        setNome(nome);
        setCognome(cognome);
        String sql = _insertSql(table, colonne);
        Statement st;
        ResultSet rs = null;
        Connection cn = this._cn("com.mysql.cj.jdbc.Driver");
        try {

            System.out.println("Secondo step!");
            st = cn.createStatement(); // creo sempre uno statement sulla connessione
            st.execute(sql); // faccio la query su uno statement // per eseguire la query insert into
            //rs = st.executeQuery(sql);

        } catch (SQLException e) {
            System.out.println("errore: " + e.getMessage());

        }
        cn.close(); // chiusura connessione
    }

    private String _selectSql(String table, String colonne) {
        String selectSql = "SELECT " + colonne + " FROM " +  table;
        return selectSql;
    }

    public void get(String tables, HttpServletRequest req, HttpServletResponse resp) throws SQLException, ClassNotFoundException, IOException {
        String table = tables;
        String colonne = "*";
        String sql = _selectSql(table, colonne);
        Statement st;
        ResultSet rs = null;
        Connection cn = this._cn("com.mysql.cj.jdbc.Driver");
        try {
            st = cn.createStatement(); // creo sempre uno statement sulla
            // connessione
            rs = st.executeQuery(sql); // faccio la query su uno statement

      //      ArrayList arr = new ArrayList<>();
      //      arr = (ArrayList) rs.getArray("nome");
      //      String a = (String) arr.get(0);

            while (rs.next() == true) {
                System.out.println(rs.getString("nome") + "\t" + rs.getString("cognome"));
              //  resp.getWriter().append(rs.getString("nome") + "\t" + rs.getString("cognome") + "\n");
                resp.getWriter().append(this.convert(rs));
            }
        } catch (Exception e) {
            System.out.println("errore:" + e.getMessage());
        } // fine try-catch
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

    public String convert(ResultSet resultSet) throws Exception {

        JSONArray jsonArray = new JSONArray();


        while (resultSet.next()) {

            int columns = resultSet.getMetaData().getColumnCount();
            JSONObject obj = new JSONObject();

            for (int i = 0; i < columns; i++)
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));

            jsonArray.add(obj);
        }
        String array = jsonArray.toString();
        System.out.println(array);
        return array;
    }

	/*
	public static void main(String[] args) throws SQLException, ClassNotFoundException {
		System.out.println("Inizio");
		MySql avvio = new MySql();
		String nome = "Angelo";
		String cognome = "Rosso";
		String server = "com.mysql.cj.jdbc.Driver";
		String table = "utente";
		String colonne = "nome, cognome";

		avvio.executeSql(table, colonne, server, nome, cognome);

		System.out.println("Ho finito!");
















		}// fine main*/
}// fine classe
