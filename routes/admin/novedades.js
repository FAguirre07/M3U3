var express = require('express');
var router = express.Router();

var novedadesModel = require ('../../models/novedadesModel');

router.get('/', async function(req,res,next){
    
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout:'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

router.get('/eliminar/:id_emp', async function(req,res,next){
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id_emp);
    res.redirect('/admin/novedades');
});

router.get('/agregar/:id_emp', function(req,res,next) {
    res.render('admin/agregar' , {
        layout: 'admin/layout' 
});
});

router.post('/agregar', async function(req,res,next){
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregar' , {
                layout: 'admin/layout',
                error: true, message: "Todos los campos son obligatorios"
            })
        }
        } catch (error) {
            console.log(error);
            res.render('admin/agregar' , {
                layout: 'admin/layout',
                error: true, message: 'No se cargo la novedad correctamente'
            });
        }
    });

    router.get('/modificar/:id', async function(req,res,next){
        var id_emp = req.params.id_emp;
        var novedad = await novedadesModel.getNovedadesById(id_emp);
        res.render('admin/modificar' , {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedad
        });
    });

    router.post('/modificar', async function(req,res,next){
        try {
            let obj = {
                titulo: req.body.titulo,
                subtitulo: req.body.subtitulo,
                cuerpo: req.body.cuerpo
            }
            await novedadesModel.modificarNovedadesById(req.body.id_emp, obj);
            res.redirect('/admin/novedades');
        } catch (error) {
            console.log(error);
            res.render('admin/modificar' , {
                layout: 'admin/layout',
                error: true, message: 'No se cargo la novedad correctamente'
            });
        }
    }); 

module.exports = router;