package ServerMain;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

@SuppressWarnings("deprecation") // A changer avec un import recent
public class Appvert extends AbstractVerticle {

	private static final Logger LOGGER = LoggerFactory.getLogger(Appvert.class); //
	// Quand le verticle se lance

	@Override
	public void start() throws Exception {

		LOGGER.info("Dans le start...");
		vertx.createHttpServer().requestHandler(routingContext -> routingContext.response().end("Hello World!"))
				.listen(8080);
	}

	// Quand le verticle s'arrête
	@Override
	public void stop() throws Exception {
		LOGGER.info("Dans le stop...");
	}
}