import mongoose, { Schema } from "mongoose";
const LaundrySchema = new Schema({
    pelanggan: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelanggan' },
    tanggal_laundry: { type: Date, default: Date.now } ,
    jenis_layanan: { type:String,  required: true},
    deskripsi_item: String,
    jumlah: Number,
    harga_per_item: Number,
    status: String
});
// Model untuk koleksi Pesanan
const Laundry = mongoose.models.Laundry || mongoose.model('Laundry', LaundrySchema);
export default Laundry;