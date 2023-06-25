package com.am.hoteles_backend.logic;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class Service {
    private static Service uniqueInstance;
    
    public static Service instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Service();
        }
        return uniqueInstance; 
    }

    HashMap<String,Hotel> hoteles;
    
    private Service(){
        hoteles = new HashMap();
        Hotel h;
        h=new Hotel("111","Las Hortencias");
        h.getCalificaciones().add(new Calificacion("Juan Bravo", "No me gustó la comida", 1));
        h.getCalificaciones().add(new Calificacion("Felix", "Todo excelente", 5));    
        hoteles.put(h.getId(), h);

        h=new Hotel("222","Cocles");
        h.getCalificaciones().add(new Calificacion("Curtis Douglas", "Clean and charm but expensive", 4));
        hoteles.put(h.getId(), h);
        
        h=new Hotel("333","El Encanto");
        h.getCalificaciones().add(new Calificacion("Anonimo", "Sucio y caro", 1));
        hoteles.put(h.getId(), h);
        
        h=new Hotel("444","Esmeralda Inn");
        h.getCalificaciones().add(new Calificacion("Karla Solis", "Limpio y buen trato", 5));
        h.getCalificaciones().add(new Calificacion("Mario Vargas", "Excelente trato", 5));    
        h.getCalificaciones().add(new Calificacion("Silvia Blanco", "Muy bueno pero un poco bullicioso", 4));
        hoteles.put(h.getId(), h);
    }

    public Hotel read(String id)throws Exception{
        Hotel hotel = hoteles.get(id);
        if (hotel!=null) return hotel;
        else throw new Exception("Hotel no existe");
    }
    
    public void addCalificacion(String id,Calificacion calificacion) throws Exception{
        hoteles.get(id).calificaciones.add(calificacion);
    }
  
    public List<Hotel> top3() throws Exception{
        return hoteles.values().stream().
                sorted( (h1,h2)->Double.compare(h2.calificacion(),h1.calificacion())).
                limit(3).collect(Collectors.toList());
    }

    public List<Hotel> search(String patron) throws Exception{
        return hoteles.values().stream().
                filter( h-> h.getNombre().contains(patron)).
                collect(Collectors.toList());
    }
}
