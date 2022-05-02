package com.datagrokr.restaurant_api.service;

import com.datagrokr.restaurant_api.entity.Reservation;
import com.datagrokr.restaurant_api.repository.ReservationRepository;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class BookingService {
    
    private final ReservationRepository reservationRepo;
    
    public BookingService(){
        this.reservationRepo = new ReservationRepository();
    }
    
    public List<Reservation> getAllReservations(){
        return reservationRepo.findAll();
    }
    
    public String getNoOfReservations(){
        return reservationRepo.count();
    }
    
    public String getNoOfTwoPeopleReservations(){
        return reservationRepo.countTwos();
    }
    
    public String getNoOfFourPeopleReservations(){
        return reservationRepo.countFours();
    }
    
    public Reservation getReservation(Long id){
        return reservationRepo.findReservationById(id);
    }
    
    public Response addReservation(Reservation reservation){
        if(LocalDateTime.now().getHour() > 20){
            return Response.serverError().entity("You can't book after 8 PM!").build();
        }
        if(reservationRepo.count().equals("10")){
            return Response.serverError().entity("Oops! All the tables are already booked").build();
        } else if(reservation.getNoOfPeople() == 2 && reservationRepo.countTwos().equals("5")){
            return Response.serverError().entity("Oops! All the 2 people tables are already booked").build();
        } else if(reservation.getNoOfPeople() == 4 && reservationRepo.countFours().equals("5")){
            return Response.serverError().entity("Oops! All the 4 people tables are already booked").build();
        } else if(reservation.getNoOfPeople != 0 && reservation.getNoOfPeople() != 2 && reservation.getNoOfPeople() != 4){
            return Response.serverError().entity("You can book the table for 2 people or 4 people only").build();
        } else if(!reservation.getTimeOfReservation().toLocalDate().isEqual(LocalDate.now()) || reservation.getTimeOfReservation().toLocalTime().isBefore(LocalTime.now())){
            return Response.serverError().entity("Booking is allowed only for the current day!").build();
        } else {
            reservationRepo.addReservation(reservation);
            return Response.ok(reservation, MediaType.APPLICATION_JSON).build();
        }
    }
    
    public Response updateReservation(Reservation reservation){
        if(reservationRepo.count().equals("10")){
            return Response.serverError().entity("Oops! All the tables are already booked").build();
        }
        else if(reservation.getNoOfPeople() == 2 && reservationRepo.countTwos().equals("5")){
            return Response.serverError().entity("Oops! All the 2 people tables are already booked").build();
        } else if(reservation.getNoOfPeople() == 4 && reservationRepo.countFours().equals("5")){
            return Response.serverError().entity("Oops! All the 4 people tables are already booked").build();
        } else if(reservation.getNoOfPeople() != 2 && reservation.getNoOfPeople() != 4){
            return Response.serverError().entity("You can book the table for 2 people or 4 people only").build();
        } else if(!reservation.getTimeOfReservation().toLocalDate().isEqual(LocalDate.now()) || reservation.getTimeOfReservation().toLocalTime().isBefore(LocalTime.now())){
            return Response.serverError().entity("Booking is allowed only for the current day!").build();
        } else {
            reservationRepo.updateReservation(reservation);
            return Response.ok(reservation, MediaType.APPLICATION_JSON).build();
        }
    }
    
    public Response removeReservation(String no){
            reservationRepo.deleteByMobileNo(no);
            return Response.ok().entity("Reservation deleted successfully!").build();
    }
}
