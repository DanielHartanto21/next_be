import { NextApiRequest,NextApiResponse } from "next";
import { VerifyToken } from "../verify/verify";
import Pelanggan from "../models/pelanggan";
import Laundry from "../models/laundry";
import Pembayaran from "../models/pembayaran";
import ConnectMongoDB from "../db/db";
import cors from "cors"; 
const corsMiddleware = cors();
ConnectMongoDB();
export default async function Laundrys(req:NextApiRequest,res:NextApiResponse){
    await corsMiddleware(req, res,async()=>{
        VerifyToken(req, res, async () => {
            if (req.method == 'POST') {

                try{
                    const newPembayaran = new Pembayaran({
                        laundry: req.body.id,
                        metode_pembayaran: req.body.metode_pembayaran,
                        total_pembayaran: req.body.total_pembayaran
                      });
                      const savedPembayaran = await newPembayaran.save();
                    res.status(200).json({ admin: savedPembayaran });
                }catch (error) {
                    res.status(500).json({ message: 'Internal server error' });
                  }
            }
            if(req.method=='GET'){
                try{
                    const id = req.query.id;
                    const idlaundry = await Laundry.find({ pelanggan: id });
                    if (!idlaundry){
                        return res.status(200).json({  });
                    }else{
                        const list_laundry = await Promise.all(idlaundry.map(async (laundry) => {
                            return await Pembayaran.find({ laundry: laundry._id });
                        }));

                        // Flatten the array of arrays into a single array
                        const combinedList = list_laundry.flat();

                        res.status(200).json({ list_laundry: combinedList });
          
                    }
                  }catch (error) {
                    console.error("Error adding new pelanggan:", error);
                    res.status(500).json({ message: 'Internal server error' });
                  }
            }else{
                return res.status(405).json({ message: 'Method Not Allowed' });
            }
        });
    });
    
}