const { json } = require('body-parser');
const Clarifai  = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'e78ffec3c7d84e22b159965a2680b742'
   });

  const handleApiCall  = (req,res)=>{
    app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
  }

const handleImage = (req ,res,db)=>{
    const { id }=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
        }) 
        .catch(err =>res.status(400).json('unable to get entries'))
    }

    module.exports = {
        handleImage,
        handleApiCall
    }