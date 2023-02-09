package servlet;

import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.JSONException;

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

    public void get(String tables, HttpServletResponse resp) throws SQLException, ClassNotFoundException, IOException {
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
            String result = this.convert(rs).toString();


            while (rs.next() == true) {
                System.out.println(rs.getString("nome") + "\t" + rs.getString("cognome"));
                resp.getWriter().append(rs.getString("nome") + "\t" + rs.getString("cognome") + "\n");
                resp.getWriter().append(result);
            }
        } catch (SQLException e) {
            System.out.println("errore:" + e.getMessage());
        } // fine try-catch
        cn.close(); // chiusura connessione
    }
    public JSONArray convert( ResultSet rs )
            throws SQLException, JSONException
    {
        JSONArray json = new JSONArray();
        ResultSetMetaData rsmd = rs.getMetaData();

        while(rs.next()) {
            int numColumns = rsmd.getColumnCount();
            JSONObject obj = new JSONObject();

            for (int i=1; i<numColumns+1; i++) {
                String column_name = rsmd.getColumnName(i);

                if(rsmd.getColumnType(i)== Types.ARRAY){
                    obj.put(column_name, rs.getArray(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.BIGINT){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.BOOLEAN){
                    obj.put(column_name, rs.getBoolean(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.BLOB){
                    obj.put(column_name, rs.getBlob(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.DOUBLE){
                    obj.put(column_name, rs.getDouble(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.FLOAT){
                    obj.put(column_name, rs.getFloat(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.INTEGER){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.NVARCHAR){
                    obj.put(column_name, rs.getNString(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.VARCHAR){
                    obj.put(column_name, rs.getString(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.TINYINT){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.SMALLINT){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.DATE){
                    obj.put(column_name, rs.getDate(column_name));
                }
                else if(rsmd.getColumnType(i)== Types.TIMESTAMP){
                    obj.put(column_name, rs.getTimestamp(column_name));
                }
                else{
                    obj.put(column_name, rs.getObject(column_name));
                }
            }

            json.add(obj);
        }

        return json;
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
