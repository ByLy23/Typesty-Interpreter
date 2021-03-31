const {Router}= require('express');
const router=Router();


router.get('/obtenerAlgo',async (req,res)=>{
    res.status(200).json(mostrarConsola());
});


function mostrarConsola(){
    var alerta="ESTO ES UN otro";
    return alerta;
}


module.exports= router;