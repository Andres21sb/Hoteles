package com.am.hoteles_backend.logic;

public class Calificacion {
    String nombre;
    String comentario;
    int puntaje;

    public Calificacion(String nombre, String comentario, int puntaje) {
        this.nombre = nombre;
        this.comentario = comentario;
        this.puntaje = puntaje;
    }

    public Calificacion() {
        this("Anónimo","",0);
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(int puntaje) {
        this.puntaje = puntaje;
    }

}
