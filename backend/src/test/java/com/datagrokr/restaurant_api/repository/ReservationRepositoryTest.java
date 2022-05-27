/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit4TestClass.java to edit this template
 */
package com.datagrokr.restaurant_api.repository;

import com.datagrokr.restaurant_api.entity.Reservation;
import java.time.LocalDateTime;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;

/**
 *
 * @author DataGrokr
 */
public class ReservationRepositoryTest {
    
    ReservationRepository instance;

    public ReservationRepositoryTest() {  
    }
    
    @Before
    public void setUp(){
        instance = new ReservationRepository();
    }
    
    @After
    public void tearDown(){
        instance.close();
    }
    
    @AfterEach
    public void deleteAll(){
        instance.deleteAllReservations();
    }

    /**
     * Test of addReservation method, of class ReservationRepository.
     */
    @Test
    public void testAddReservation() {
        System.out.println("addReservation");
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.of(2022, 04, 29, 14, 44, 48, 640000));
        Reservation result = instance.addReservation(reservation);
        assertEquals(reservation, result);
    }

    /**
     * Test of findAll method, of class ReservationRepository.
     */
    @Test
    public void testFindAll() {
        instance.addReservation(new Reservation("man", "1234567890", 2, LocalDateTime.of(2022, 04, 29, 14, 44, 48, 640000)));
        instance.addReservation(new Reservation("aHAHA", "1234567845", 2, LocalDateTime.of(2022, 04, 29, 15, 30, 48, 640000)));
        System.out.println("findAll");
        assertNotNull(instance.findAll());
    }
    
    @Test
    public void testUpdateReservation() {
        System.out.println("updateReservation");
        Reservation reservation = new Reservation("man", "1234567890", 2, LocalDateTime.of(2022, 04, 29, 14, 44, 48, 640000));
        instance.addReservation(reservation);
        Reservation updatedReservation = new Reservation();
        updatedReservation.setId(reservation.getId());
        updatedReservation.setNoOfPeople(4);
        updatedReservation.setTimeOfReservation(LocalDateTime.now().plusHours(8));
        Reservation result = instance.updateReservation(updatedReservation);
        Reservation expResult = instance.findReservationById(reservation.getId());
        assertEquals(expResult, result);
    }

    @Test
    public void testDeleteByMobileNo() {
        System.out.println("deleteByMobileNo");
        Reservation reservation = instance.addReservation(new Reservation("man", "1234567890", 2, LocalDateTime.of(2022, 04, 29, 14, 44, 48, 640000)));
        String no = "1234567890";
        instance.deleteByMobileNo(no);
        System.out.println(instance.findReservationById(1L));
        assertEquals(null, instance.findReservationById(reservation.getId()));
    }
    
}
