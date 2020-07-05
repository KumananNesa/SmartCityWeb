package ServerMain;

import io.vertx.core.Vertx;

public class Smain {
	
	public static void main(String[] args) {
	    System.out.println("App...");
	    final Vertx vertx = Vertx.vertx();
	    vertx.deployVerticle(new Appvert());
	  }

}
