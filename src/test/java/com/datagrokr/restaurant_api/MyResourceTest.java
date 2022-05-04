package com.datagrokr.restaurant_api;

import com.datagrokr.restaurant_api.entity.Reservation;import com.datagrokr.restaurant_api.service.BookingService;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.Application;
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
    protected Application configure() {
        return new ResourceConfig(MyResource.class);
    }
    
    /**
     * Test of getReservations method, of class MyResource.
     */
    @Test
    public void testGetReservations() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(1));
        service.addReservation(reservation);
        Response response = target("/reservations").request().get();
        assertEquals("should return status 204", 200, response.getStatus());
    }

    /**
     * Test of getReservation method, of class MyResource.
     */
    @Test
    public void testGetReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusHours(1));
        service.addReservation(reservation);
        Response output = target("/reservations/"+reservation.getId()).request(MediaType.APPLICATION_JSON_TYPE).get();
        assertEquals("Should return status 200", 200, output.getStatus());
        assertNotNull("Should return user object as json", output.getEntity());
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
        System.out.println();
        assertEquals("Should return status 200", 200, output.getStatus());
    }

    /**
     * Test of updateReservation method, of class MyResource.
     */
    @Test
    public void testUpdateReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(1));
        service.addReservation(reservation);
        Reservation test = service.getReservation(reservation.getId());
        Reservation updatedReservation = new Reservation();
        updatedReservation.setTimeOfReservation(LocalDateTime.now().plusMinutes(5));
        updatedReservation.setNoOfPeople(4);
        Response output = target("/reservations/update/"+reservation.getId()).request().put(Entity.entity(updatedReservation, MediaType.APPLICATION_JSON));
        System.out.println(output);
        System.out.println();
        assertEquals("Should return status 200", 200, output.getStatus());
    }

    /**
     * Test of deleteReservation method, of class MyResource.
     */
    @Test
    public void testDeleteReservation() {
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(1));
        service.addReservation(reservation);
        Response output = target("/reservations/delete/"+reservation.getMobileNo()).request().delete();
        assertEquals("Should return status 200", 200, output.getStatus());
        output = target("/reservations/"+reservation.getId()).request(MediaType.APPLICATION_JSON_TYPE).get();
        assertEquals(204, output.getStatus());
    }
    
}
