import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import { getAll, getById, getEventosCercanos, 
    createEvento, getUbicacion, deleteEvento, editEvento } from '../controllers/eventoController.js'

const fileUpload = multer();  // Indica el directorio donde multer debe almacenar los archivos temporales
cloudinary.config({
    cloud_name: 'dten77l85',
    api_key: '829615256525372',
    api_secret: 'Km6kFadj1HOmPf6mYYyyd6KIMeQ'
});

const routerEventos = express.Router()

routerEventos.get('/', getAll)
routerEventos.get('/:idEvento', getById)
routerEventos.post('/', createEvento)
routerEventos.put('/evento/cercano/', getEventosCercanos)
routerEventos.get('/ubicacion/getUbi/', getUbicacion)
routerEventos.delete('/:idEvento', deleteEvento)
routerEventos.put('/:id', editEvento)

routerEventos.post('/subirFoto', fileUpload.single('foto'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (result, error) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
  
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
  
    async function upload(req) {
      try {
        let result = await streamUpload(req);
        res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
      } catch (error) {
        console.log('Error al subir la imagen: ', error)
        res.status(500).json({ message: 'Error al subir la imagen:', error});
      }
    }
  
    upload(req);
  });

export default routerEventos