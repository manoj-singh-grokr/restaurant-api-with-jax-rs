package com.datagrokr.restaurant_api;

import com.datagrokr.restaurant_api.entity.Reservation;import com.datagrokr.restaurant_api.service.BookingService;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.Response;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.Test;
import org.glassfish.jersey.test.JerseyTest;
import static org.junit.Assert.*;

/**
 *
 * @author DataGrokr
 */
public class MyResourceTest extends JerseyTest {
    
    private BookingService service = new BookingService();
    public MyResourceTest() {
    }
    
    @Override
    protected ResourceConfig configure() {
        return new ResourceConfig(MyResource.class);
    }
    
    /**
     * Test of getReservations method, of class MyResource.
     */
    @Test
    public void testGetReservations() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusDays(1));
        service.addReservation(reservation);
        Response response = target("/reservations").request().get();
        assertEquals("should return status 200", 200, response.getStatus());
        System.out.println(response.getStatus());
        System.out.println(response.readEntity(String.class));
    }

    /**
     * Test of getReservation method, of class MyResource.
     */
    @Test
    public void testGetReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusDays(1));
        service.addReservation(reservation);
        Response output = target("/reservations/"+reservation.getId()).request().get();
        assertEquals("Should return status 200", 200, output.getStatus());
        assertNotNull("Should return user object as json", output.getEntity());
        System.out.println(output.getStatus());
        System.out.println(output.readEntity(String.class));
    }

    /**
     * Test of addReservation method, of class MyResource.
     */
    @Test
    public void testAddReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusDays(1));
        Response output = target("/reservations/add").request().post(Entity.entity(reservation, MediaType.APPLICATION_JSON));
        System.out.println(output.getStatus());
        assertEquals("Should return status 500", 500, output.getStatus());
        reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusHours(1));
        output = target("/reservations/add").request().post(Entity.entity(reservation, MediaType.APPLICATION_JSON));
        System.out.println(output);
        assertEquals("Should return status 200", 200, output.getStatus());
    }

    /**
     * Test of updateReservation method, of class MyResource.
     */
    @Test
    public void testUpdateReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(1));
        service.addReservation(reservation);
        Reservation updatedReservation = new Reservation();
        updatedReservation.setTimeOfReservation(LocalDateTime.now().plusMinutes(5));
        updatedReservation.setNoOfPeople(4);
        Response output = target("/reservations/update/"+reservation.getId()).request().put(Entity.entity(updatedReservation, MediaType.APPLICATION_JSON));
        System.out.println(output.toString());
        assertEquals("Should return status 200", 200, output.getStatus());
    }

    /**
     * Test of deleteReservation method, of class MyResource.
     */
    @Test
    public void testDeleteReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(1));
        service.addReservation(reservation);
        Response output = target("/reservations/delete/1234567890").request().delete();
        assertEquals("Should return status 200", 200, output.getStatus());
    }
    
}
