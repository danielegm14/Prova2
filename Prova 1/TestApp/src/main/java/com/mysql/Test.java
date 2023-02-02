package com.mysql;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class Test
 */
public class Test extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private int _contatore;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Test() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("***METODO DOGET***");
		response.getWriter().append("<h1>Funziona!</h1>");//.append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	//primo metodo
	@Override
	public void init(ServletConfig config) throws ServletException{
		this._contatore = 0;
		System.out.println("***METODO INIT*** - Inizializzazione della servlet...");
		super.init(config);
	}
	
	// service prende come argomeni la request (richiesta) e la response (risposta) relativa al protocollo http
	// service smista la richiesta ad altri metodi: doGet doPost ecc 
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
		this._contatore++;
		System.out.println("***METODOSERVICE*** - Metodo invocato: " + request.getMethod());
		super.service(request, response);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
