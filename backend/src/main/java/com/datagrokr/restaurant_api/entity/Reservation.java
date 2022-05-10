package com.datagrokr.restaurant_api.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author DataGrokr
 */

@Entity
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String username;
    private String mobileNo;
    private int noOfPeople;
    private LocalDateTime timeOfReservation;

    public Reservation() {
    }

    public Reservation(Long id, String username, String mobileNo, int noOfPeople, LocalDateTime timeOfReservation) {
        this.id = id;
        this.username = username;
        this.mobileNo = mobileNo;
        this.noOfPeople = noOfPeople;
        this.timeOfReservation = timeOfReservation;
    }
    
    public Reservation(String username, String mobileNo, int noOfPeople, LocalDateTime timeOfReservation) {
        this.username = username;
        this.mobileNo = mobileNo;
        this.noOfPeople = noOfPeople;
        this.timeOfReservation = timeOfReservation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public int getNoOfPeople() {
        return noOfPeople;
    }

    public void setNoOfPeople(int noOfPeople) {
        this.noOfPeople = noOfPeople;
    }

    public LocalDateTime getTimeOfReservation() {
        return timeOfReservation;
    }

    public void setTimeOfReservation(LocalDateTime timeOfReservation) {
        this.timeOfReservation = timeOfReservation;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Reservation)) {
            return false;
        }
        Reservation other = (Reservation) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Reservation{" + "id=" + id + ", username=" + username + ", mobileNo=" + mobileNo + ", noOfPeople=" + noOfPeople + ", timeOfReservation=" + timeOfReservation + '}';
    }

}
