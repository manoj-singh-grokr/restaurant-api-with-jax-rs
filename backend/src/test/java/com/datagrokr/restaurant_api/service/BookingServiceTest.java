package com.datagrokr.restaurant_api.service;

import com.datagrokr.restaurant_api.entity.Reservation;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author DataGrokr
 */
public class BookingServiceTest {
    
    private BookingService instance;

    public BookingServiceTest() {
        instance = new BookingService();
    }
    
    @Before
    public void setUp() {
    }
    
    @AfterEach
    public void tearDown(){
        instance.deleteAllReservations();
    }
    
    @Test
    public void testGetNoOfReservations(){
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusDays(1));
        instance.addReservation(reservation);        
        reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(4));
        instance.addReservation(reservation);
        String result = instance.getNoOfReservations();
        assertEquals("2", result);
    }
    
    @Test
    public void testGetNoOfTwoPeopleReservations(){
        Reservation reservation = new Reservation("man", "1234567890", 4, LocalDateTime.now().plusDays(1));
        instance.addReservation(reservation);        
        reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(4));
        instance.addReservation(reservation);
        String result = instance.getNoOfTwoPeopleReservations();
        assertEquals("1", result);
    }
    
     @Test
    public void testGetNoOfFourPeopleReservations(){
        Reservation reservation = new Reservation("man", "1234567890", 4, LocalDateTime.now().plusDays(1));
        instance.addReservation(reservation);        
        reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(4));
        instance.addReservation(reservation);
        reservation = new Reservation("another", "1234567891", 4, LocalDateTime.now().plusMinutes(6));
        instance.addReservation(reservation);
        String result = instance.getNoOfFourPeopleReservations();
        assertEquals("2", result);
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
        
        reservation = new Reservation("man", "1234567890", 2, LocalDateTime.now().plusMinutes(4));
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
