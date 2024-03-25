import { NextApiRequest,NextApiResponse } from "next";
import { VerifyToken } from "../verify/verify";
import AdminModel from "../models/admin";
import ConnectMongoDB from "../db/db";
import cors from "cors"; 
const corsMiddleware = cors();



// Apply CORS middleware
ConnectMongoDB();
export default async function Input(req:NextApiRequest,res:NextApiResponse){

    await corsMiddleware(req, res,async()=>{
      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
      try {
        VerifyToken(req, res, async () => {
          const newAdmin = new AdminModel({
            nama: req.body.nama,
            username: req.body.username,
            password: req.body.password,
          });
        // Temukan pelanggan berdasarkan email
        const savedAdmin = await newAdmin.save();
        res.status(200).json({ admin: savedAdmin });
        });
      } catch (error) {
        console.error("Error adding new admin:", error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
}