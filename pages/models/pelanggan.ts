import mongoose, { Schema } from "mongoose";
const PelangganSchema = new Schema({
    nama: { type: String, required: true },
    alamat: {type:String,  required: true},
    nomor_telepon: {type:String,  required: true},
    email: { type: String, required: true, unique: true ,match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'] } 
});
  
const Pelanggan =mongoose.models.Pelanggan||mongoose.model('Pelanggan', PelangganSchema);


export default Pelanggan;