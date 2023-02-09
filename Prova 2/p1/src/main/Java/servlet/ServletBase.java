package servlet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import servlet.ServiceData;

import java.io.IOException;
import java.nio.channels.ScatteringByteChannel;
import java.sql.SQLException;

@WebServlet("/Test")
public class ServletBase extends HttpServlet{
    public ServletBase(){
        super();
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            _dispatch(req, resp);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            _dispatch(req, resp);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    protected void _dispatch(HttpServletRequest req, HttpServletResponse resp) throws IOException, SQLException, ClassNotFoundException {
        ServiceData sql = new ServiceData();
        // recupero i parametri
        String params = req.getParameter("in");
      //  JSONObject param = (JSONObject) JSONValue.parse(params);
        //String nome = (String) param.get("nome");
       // String cognome = (String) param.get("cognome");
     //   String table = (String) param.get("table");
        sql.get(params, resp);
        //sql.insert(nome, cognome);
        //resp.getWriter().append("aggiunto correttamente");
    }
}
