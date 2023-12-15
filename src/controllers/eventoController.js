import Evento from "../models/EventoModel.js"
import axios from 'axios'

export const getAll = async (req, res) => {
    try {
        const paradas = await Evento.find()

        res.json(paradas)
    } catch (error) {
        console.log("Error getAll")
    }
};

export const getById = async (req, res) => {
    try {
        const { idEvento } = req.params
        
        const evento = await Evento.findById(idEvento)

        res.json(evento)
    } catch (error) {
        console.log("Error en getById " + error)
    }
}

export const deleteEvento = async (req, res) => {
    try {
        const { idEvento } = req.params


        const evento = await Evento.findByIdAndDelete(idEvento);

        if(!evento){
            return res.status(404).json({message : 'Evento no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log("Error al eliminar un evento " + error)
    }
}

export const editEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada
        
        //buscamos user y modificamos
        const updated = await Evento.findByIdAndUpdate(id, updateData, {new: true});

        if(!updated){
            return res.status(404).json({message : 'Evento no encontrado' });
        }
        res.json(updated);

    } catch (error) {
        console.log('Error en la consulta de edit evento a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un evento' });
    }
}

export const getUbicacion = async (req, res) => {
    try {
        const lugar = "Malaga"

        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lugar)}`;
            
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                const firstResult = data[0];
                const latitude = parseFloat(firstResult.lat);
                const longitude = parseFloat(firstResult.lon);
                res.json({latitude, longitude});
                } else {
                console.log("Ubicación de producto no encontrada");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud de geocodificación: " + error);
            });
    } catch (error) {
        console.log("Error al obtener la ubicacion")
        res.status(500).json({ message: 'Error al obtener la ubicacion' });
    }
}


//Obtengo una ubicacion dada por una direccion 
//busco todos los eventos cuya lat y lon son menos de 0.2 de diferencia respecto a la ubicacion dada
export const getEventosCercanos = async (req, res) => {
    try {
        const { lugar } = req.body

        const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
        const format = 'json'; 

        const response = await axios.get(`${nominatimEndpoint}?q=${lugar}&format=${format}`);

        // Extraer la información de la primera coincidencia (puedes ajustarlo según tus necesidades).
        const firstResult = response.data[0];
        if (!firstResult) {
            return res.status(404).json({ error: 'No se encontraron resultados.' });
        }

        const { lat, lon } = firstResult;
        

        const maxDifference = 0.2;

        
        const eventosCercanos = await Evento.find({
            lat: { $gte: parseFloat(lat) - maxDifference, $lte: parseFloat(lat) + maxDifference },
            lon: { $gte: parseFloat(lon) - maxDifference, $lte: parseFloat(lon) + maxDifference },
        }).sort({timestamp: -1})

        console.log("getEventosCercanos: " + eventosCercanos)
        res.json(eventosCercanos)
    } catch (error) {
        console.log("Error getEventosCercanos")
    }
}

export const createEvento = async(req, res) => {
    try {
        const { nombre, lugar, organizador, imagen } = req.body

        const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
        const format = 'json'; 

        const response = await axios.get(`${nominatimEndpoint}?q=${lugar}&format=${format}`);

        // Extraer la información de la primera coincidencia (puedes ajustarlo según tus necesidades).
        const firstResult = response.data[0];
        if (!firstResult) {
            return res.status(404).json({ error: 'No se encontraron resultados.' });
        }

        const { lat, lon } = firstResult;

        const timestamp = Date.now()

        console.log("ANtes del post")

        const newEvento = new Evento({
            nombre,
            timestamp,
            lugar,
            lat,
            lon,
            organizador,
            imagen
        })

        await newEvento.save()

        console.log("Despues del save")
    
        res.send(newEvento._id)

    } catch (error) {
        console.log('Error en la consulta de crear Evento:', error);
        res.status(500).json({ message: 'Error al crear un evento' });
    }
}