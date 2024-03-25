import mongoose, { Schema } from "mongoose";
const PembayaranSchema = new Schema({
    laundry: { type: mongoose.Schema.Types.ObjectId, ref: 'Laundry' },
    metode_pembayaran: String,
    total_pembayaran: Number,
    tanggal_pembayaran: { type: Date, default: Date.now } 
});
PembayaranSchema.pre('save', function(next) {
    if (!this.tanggal_pembayaran) {
      this.tanggal_pembayaran = new Date();
    }
    next();
  });
const Pembayaran = mongoose.models.Pembayaran ||mongoose.model('Pembayaran', PembayaranSchema);
export default Pembayaran;