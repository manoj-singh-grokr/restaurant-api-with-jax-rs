package com.datagrokr.restaurant_api;

import com.datagrokr.restaurant_api.entity.Reservation;
import com.datagrokr.restaurant_api.service.BookingService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("reservations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MyResource {
    
    private final BookingService bookingService = new BookingService();

    @GET
    public List<Reservation> getReservations(){
        return bookingService.getAllReservations();
    }
    
//    @Path("/{id}")
//    @GET
//    public Reservation getReservation(@PathParam("id") Long id){
//        return bookingService.getReservation(id);
//    }
    
    @Path("/add")
    @POST
    public Response addReservation(Reservation reservation){
        return bookingService.addReservation(reservation);
    }
    
    @Path("/update/{id}")
    @PUT
    public Response updateReservation(@PathParam("id") Long id, Reservation reservation){
        reservation.setId(id);
        return bookingService.updateReservation(reservation);
    }
    
    @Path("/delete")
    @DELETE
    public Response deleteReservation(Reservation reservation){
        return bookingService.removeReservation(reservation.getMobileNo());
    }
    
    @Path("/delete/{mobileNo}")
    @DELETE
    public Response deleteReservationByMobileNo(@PathParam("mobileNo") String no){
        return bookingService.removeReservation(no);
    }
    
}
