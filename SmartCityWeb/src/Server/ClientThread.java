package Server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;

public class ClientThread extends Thread {
	private Socket clientSocket;
	private OutputStreamWriter out;
	private BufferedReader in;
	private Request request = new Request();
	private Response response = new Response();
	private Crud_Service service;
	sensorService = new SensorsService();
	pollutionService = new PollutionService();
	
	zoneService = new ZoneService();
	bollardService = new BollardService();
	vehiclesSensorService = new VehiclesSensorService();
	smartCityServices = new smartCityServices();
	
	
	
	private ObjectMapper mapper;
	private static int position = 1;
	private boolean shouldRun = true;
	
	
	public ClientThread(Socket socket) throws ClassNotFoundException {
		super("Client" + position);
		position++;
		this.clientSocket = socket;
		
	}
	
	
	public void GenerateObject() {

		try {

			vehicleSensorObject = vehiclesSensorService.GenerateAllVehicleSensors();
			bollardObject = bollardService.GenerateAllBollards();
			smartCityObject = smartCityServices.GenerateCity();

			/*System.out.println("Objets generés :");
			System.out.println("");
			System.out.println(vehicleSensorObject);
			System.out.println("");
			System.out.println(bollardObject);
			System.out.println("");
			System.out.println(smartCityObject);
			System.out.println("");
			System.out.println("Fin objets generés");*/

		} catch (Exception e) {

		}

	}
	
	private void CheckVehiclesThreshold() throws ClassNotFoundException {

		bollardObject = bollardService.GenerateAllBollards();



		int NbVehicleInCirculation = smartCityObject.VehicleInCirculation(vehicleSensorObject);
		smartCityServices.updateNumberinCirculation(NbVehicleInCirculation);
		// vehicleSensorObject.updatenull(0);
		smartCityObject = smartCityServices.GenerateCity();

		System.out.println("NbVehicleInCirculation = " + NbVehicleInCirculation);

		int Max = smartCityObject.getMaxNumberVehicles();
		int Maxminus20 = ((Max) - ((Max * 20) / 100)); // -20% of max

		if (smartCityObject.CheckThresholdNbMaxVehicles(NbVehicleInCirculation) == true) {

			bollardService.Updatetrue(bollardObject);
			bollardObject = bollardService.GenerateAllBollards();

			smartCityServices.updateTramFrequency(10);
			smartCityObject = smartCityServices.GenerateCity();



			System.out.println("Retractable bollards are raised");
			System.out.println("Tramfrequency =  10/10");

		} /*else if (smartCityObject.CheckThresholdNbMaxVehicles(NbVehicleInCirculation) == false
				&& bollardObject.get(0).getIsInstalled() == true) {*/
		else {

			if (NbVehicleInCirculation < Maxminus20) {

				bollardService.Updatefalse(bollardObject);
				bollardObject = bollardService.GenerateAllBollards();

				smartCityServices.updateTramFrequency(6);
				smartCityObject = smartCityServices.GenerateCity();

				System.out.println("Retractable bollards are lowered");
				System.out.println("Tramfrequency =  6/10");
			} else {

				if (bollardObject.get(1).getIsBollardState() == true) {

					smartCityServices.updateTramFrequency(8);
					smartCityObject = smartCityServices.GenerateCity();
					// Faire liste des bollard

					System.out.println("Number of vehicule is decreasing in town");
					System.out.println("Retractable bollards are raised");
					System.out.println("Tramfrequency =  8/10");
				} else {

					smartCityServices.updateTramFrequency(8);
					smartCityObject = smartCityServices.GenerateCity();
					// Faire liste des bollard

					System.out.println("Number of vehicule is increasing in town");
					System.out.println("Retractable bollards are lowered");
					System.out.println("Tramfrequency =  8/10");

				}

			}
		}

	}
	
}