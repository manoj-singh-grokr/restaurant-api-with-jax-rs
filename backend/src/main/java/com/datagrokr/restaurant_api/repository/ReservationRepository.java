package com.datagrokr.restaurant_api.repository;

import com.datagrokr.restaurant_api.entity.Reservation;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

public class ReservationRepository {
    
    private final EntityManager entityManager;
    private final EntityManagerFactory emf;
    
    public ReservationRepository(){
        emf = Persistence.createEntityManagerFactory("reservation_pu");
        entityManager = emf.createEntityManager();
    }
    
    public Reservation addReservation(Reservation reservation){
        entityManager.getTransaction().begin();
        entityManager.persist(reservation);
        entityManager.getTransaction().commit();
        return reservation;
    }
    
    public void deleteAllReservations(){
        entityManager.getTransaction().begin();
        Query q = entityManager.createQuery("DELETE FROM Reservation");
        q.executeUpdate();
        entityManager.getTransaction().commit();
    }
    
    public List<Reservation> findAll(){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Reservation> cq = cb.createQuery(Reservation.class);
        Root<Reservation> rootEntry = cq.from(Reservation.class);
        CriteriaQuery<Reservation> all = cq.select(rootEntry);
        TypedQuery<Reservation> allQuery = entityManager.createQuery(all);
        List<Reservation> result = allQuery.getResultList();
        if(result.isEmpty()){
            return null;
        }
        return result;
    }

    public Reservation findReservationById(Long id){
        return entityManager.find(Reservation.class, id);
    }
    
    public List<Reservation> findByMobileNo(String no){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Reservation> cq = cb.createQuery(Reservation.class);
        Root<Reservation> rootEntry = cq.from(Reservation.class);
        CriteriaQuery<Reservation> all = cq.select(rootEntry).where(cb.equal(rootEntry.get("mobileNo"), no));
        TypedQuery<Reservation> allQuery = entityManager.createQuery(all);
        List<Reservation> result = allQuery.getResultList();
        if(result.isEmpty()){
            return null;
        }
        return result;
    }
    
    public Reservation updateReservation(Reservation reservation){
        Reservation reservationToUpdate = entityManager.find(Reservation.class, reservation.getId());
        entityManager.getTransaction().begin();
        if(reservation.getNoOfPeople() != 0){
            reservationToUpdate.setNoOfPeople(reservation.getNoOfPeople());
        }
        if(reservation.getTimeOfReservation() != null){
            reservationToUpdate.setTimeOfReservation(reservation.getTimeOfReservation());
        }
        entityManager.persist(reservationToUpdate);
        entityManager.getTransaction().commit();
        return reservationToUpdate;
    }
    
    public void deleteById(Long id){
        entityManager.getTransaction().begin();
        Query query = entityManager.createQuery("DELETE FROM Reservation where id="+id);
        query.executeUpdate();
        entityManager.getTransaction().commit();
    }
    
    public void deleteByMobileNo(String no){
        entityManager.getTransaction().begin();
        List<Reservation> list = findByMobileNo(no);
        list.forEach((item) -> entityManager.remove(item));
        entityManager.getTransaction().commit();
    }
    
    public String count(){
        Query query = entityManager.createQuery("select count(s) from Reservation s");
        return query.getSingleResult().toString();
    }
    
    public String countFours(){
        Query query = entityManager.createQuery("select count(s) from Reservation s where noOfPeople=4");
        return query.getSingleResult().toString();
    }
    
    public String countTwos(){
        Query query = entityManager.createQuery("select count(s) from Reservation s where noOfPeople=2");
        return query.getSingleResult().toString();
    }
    
    public void close(){
        entityManager.close();
        emf.close();
    }
}


