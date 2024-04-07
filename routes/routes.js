import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const __dirname = import.meta.dirname;


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
  
router.get("/agregar", (req, res) => {
    let { nombre, precio } = req.query;
    let deporte = {
      nombre: nombre,
      precio: precio,
    };
  
    let { deportes } = JSON.parse(fs.readFileSync("deportes.json"));
    deportes.push(deporte);
    fs.writeFileSync("deportes.json", JSON.stringify({ deportes }));
    res.json(deporte);
  });

router.get("/deportes", (req,res)=>{
    const deportes= JSON.parse(fs.readFileSync("deportes.json"))
    res.json(deportes);
})

router.get("/editar", (req,res)=>{
    const {nombre, precio} = req.query;
    let deporte = {
        nombre: nombre,
        precio: precio,
      };
      
      let  {deportes}  = JSON.parse(fs.readFileSync("deportes.json"));
     
      for (let d of deportes){
        
        if (deporte.nombre === d.nombre){
          d.precio = deporte.precio
          fs.writeFileSync("deportes.json", JSON.stringify({ deportes }));
        }
      }
      
})

router.get('/eliminar', (req,res)=>{
  const {nombre} = req.query;
    let deporte = {
        nombre: nombre,
      };
      console.log(deporte.nombre)
      let  {deportes}  = JSON.parse(fs.readFileSync("deportes.json"));
      let borrar = deportes.map(dep => dep.nombre).indexOf(deporte.nombre)
      for (let d of deportes){
      
        if (deporte.nombre === d.nombre){
          deportes.splice(borrar,1)
          fs.writeFileSync("deportes.json", JSON.stringify({ deportes }));
        }
      }
      
})
  export {router};