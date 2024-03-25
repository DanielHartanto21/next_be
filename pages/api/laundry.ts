import { NextApiRequest,NextApiResponse } from "next";
import { VerifyToken } from "../verify/verify";
import Pelanggan from "../models/pelanggan";
import Laundry from "../models/laundry";
import ConnectMongoDB from "../db/db";
import cors from "cors"; 
const corsMiddleware = cors();
ConnectMongoDB();
export default async function Laundrys(req:NextApiRequest,res:NextApiResponse){
  await corsMiddleware(req, res,async()=>{
    VerifyToken(req, res, async () => {    
      if (req.method == 'POST') {
            try {
              
                  try{
                      const newInputLaundry = new Laundry({
                          pelanggan: req.body.pelanggan,
                          jenis_layanan:req.body.jenis_layanan,
                          deskripsi_item:req.body.deskripsi_item,
                          jumlah:req.body.jumlah,
                          harga_per_item:req.body.harga_per_item,
                          status:req.body.status
                        });
                      const savedLaundry = await newInputLaundry.save();
                      res.status(200).json({ savedLaundry });
                  }catch (error) {
                          res.status(500).json({ error: "Internal server error" });
                      }
                
              
            } catch (error) {
              console.error("Error adding new pelanggan:", error);
              res.status(500).json({ message: 'Internal server error' });
            }
          }
          if(req.method == 'GET'){
            try{
              const id = req.query.id;
              // const pelanggan = await Pelanggan.findOne({ nama });
              
              const list_laundry=await Laundry.find({pelanggan:id});
    
              res.status(200).json({ list_laundry });
    
            }catch (error) {
              console.error("Error adding new pelanggan:", error);
              res.status(500).json({ message: 'Internal server error' });
            }
            
    
          }
          if (req.method == 'PUT'){
            try{
              const _id=req.body.id;
              const status=req.body.status;
              const updatedLaundry = await Laundry.findByIdAndUpdate(_id, { status }, { new: true });
              if (!updatedLaundry) {
                return res.status(404).json({ message: 'Laundry not found' });
              }
              return res.status(200).json({ updatedLaundry });
            }catch (error) {
              console.error("Error adding new pelanggan:", error);
              res.status(500).json({ message: 'Internal server error' });
            }
    
          }
          else{
            return res.status(405).json({ message: 'Method Not Allowed' });
          }
          
        });
  });
       
      
      
      
}