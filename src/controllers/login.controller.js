const loginCtrl = {}


loginCtrl.loginAdmin = async (req,res) => {
    try{
        // console.log(req.body);
        if(req.body.user==="admin" && req.body.pass === "admin"){
            res.status(201).json({
                mensaje:"Credenciales Correctas"
            })
        } else {
            res.status(500).json({
                mensaje:"Credenciales Incorrectas"
            })
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"Error al realizar la consulta"
        })
    }

}






export default loginCtrl;