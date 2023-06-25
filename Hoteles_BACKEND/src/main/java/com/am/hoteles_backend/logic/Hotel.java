package com.am.hoteles_backend.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Hotel {
    String id;
    String nombre;
    List<Calificacion> calificaciones;

    public Hotel(String id, String nombre) {
        this.id = id;
        this.nombre = nombre;
        this.calificaciones= new ArrayList<>();
    }

    public Hotel() {
        this("","");
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double calificacion(){
        int puntos=0;
        for(Calificacion c: calificaciones) puntos+=c.getPuntaje();
        return (double) puntos / (calificaciones.size());
    }

    public List<Calificacion> getCalificaciones() {
        return calificaciones;
    }

    public void setCalificaciones(List<Calificacion> calificaciones) {
        this.calificaciones = calificaciones;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Hotel other = (Hotel) obj;
        return Objects.equals(this.id, other.id);
    }

}
