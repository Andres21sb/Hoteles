/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.am.hoteles_backend.resources;

import com.am.hoteles_backend.logic.Calificacion;
import com.am.hoteles_backend.logic.Hotel;
import com.am.hoteles_backend.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

/**
 *
 * @author Darkh
 */
@Path("/hoteles")
@PermitAll
public class Hoteles {

    @GET
    @Path("/all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Hotel> getHoteles() {
        try {
            System.out.println("Entro");
            return Service.instance().search("");
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("/top3")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Hotel> getTop3() {
        try {
            System.out.println("Entro");
            return Service.instance().top3();
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    @POST
    @Path("/newCalificacion/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addCalificacion(@PathParam("id") String id, Calificacion calificacion) {
        try {
            System.out.println("Entro");
            Service.instance().addCalificacion(id, calificacion);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    @GET
    @Path("{name}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Hotel> getByName(@PathParam("name") String name) {
        try {
            System.out.println("Entro");
            return Service.instance().search(name);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

}
