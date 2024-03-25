import { NextApiRequest,NextApiResponse } from "next";
import { VerifyToken } from "../verify/verify";
import Pelanggan from "../models/pelanggan";
import ConnectMongoDB from "../db/db";
import cors from "cors"; 
const corsMiddleware = cors();
ConnectMongoDB();
export default async function InputPelanggan(req:NextApiRequest,res:NextApiResponse){
  await corsMiddleware(req, res,async()=>{
    VerifyToken(req, res, async () => {
      if (req.method == 'POST') {
          try {
          
              try{
                  const newPelanggan = new Pelanggan({
                      nama: req.body.nama,
                      alamat: req.body.alamat,
                      nomor_telepon: req.body.nomor_telepon,
                      email:req.body.email,
                    });
                  const savedPelanggan = await newPelanggan.save();
                  res.status(200).json({ admin: savedPelanggan });
              }catch (error) {
                      res.status(500).json({ error: "input not full/email error" });
                  }
            
          
        } catch (error) {
          console.error("Error adding new pelanggan:", error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
      if (req.method == 'GET'){
          const pelanggan = await Pelanggan.find({});
          return res.status(200).json({ pelanggan });
      }
      else{return res.status(405).json({ message: 'Method Not Allowed' });}
        
        
        
      });
  });
    
}