package com.datagrokr.restaurant_api.service;

import com.datagrokr.restaurant_api.entity.Reservation;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author DataGrokr
 */
public class BookingServiceTest {
    
    private BookingService instance;

    public BookingServiceTest() {
    }
    
    @Before
    public void setUp() {
        instance = new BookingService();
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of addReservation method, of class BookingService.
     */
    @Test
    public void testAddReservation() {
        System.out.println("addReservation");
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusDays(1));
        Response result = instance.addReservation(reservation);
        assertEquals(500, result.getStatus());
        
        reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusHours(4));
        result = instance.addReservation(reservation);
        assertEquals(200, result.getStatus());
    }

    /**
     * Test of updateReservation method, of class BookingService.
     */
    @Test
    public void testUpdateReservation() {
        System.out.println("updateReservation");
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(5));
        instance.addReservation(reservation);
        reservation.setNoOfPeople(4);
        reservation.setTimeOfReservation(LocalDateTime.now().plusHours(2));
        Response result = instance.updateReservation(reservation);
        assertEquals(reservation, result.getEntity());
    }

    /**
     * Test of removeReservation method, of class BookingService.
     */
    @Test
    public void testRemoveReservation() {
        System.out.println("removeReservation");
        Reservation reservation = new Reservation("man", "543215", 2, LocalDateTime.now().plusMinutes(5));
        instance.addReservation(reservation);
        String no = "543215";
        instance.removeReservation(no);
        Reservation deletedRes = instance.getReservation(reservation.getId());
        assertEquals(null, deletedRes);
    }
    
}
