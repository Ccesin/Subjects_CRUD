import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    uc:{
        type:Number,
        required:true
    },
    profesor:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    horario:{
        type:String,
        required:true
    },
    aula:{
        type:Number,
        required:true
    },
    prelacion:{
        type:String,
        required:true
    },
    cupomax:{
        type:Number,
        required:true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps:true // createdAt, updatedAt
});

const Materia = mongoose.model('Materia', materiaSchema);

export default Materia;