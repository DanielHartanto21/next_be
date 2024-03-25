import { NextApiRequest,NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import AdminModel from "../models/admin";
import ConnectMongoDB from "../db/db";
import cors from "cors"; 
const corsMiddleware = cors();
ConnectMongoDB();
export default async function Login(req:NextApiRequest,res:NextApiResponse){
  await corsMiddleware(req, res,async()=>{
    if (req.method !== 'POST') {
      const admin = await AdminModel.find({});
      return res.status(200).json({ admin });
      // return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { username, password } = req.body;
    console.log(username,password)
    try {
      // Temukan pelanggan berdasarkan email
      const admin = await AdminModel.findOne({ username });
  
      if (!admin) {
        return res.status(404).json({ message: 'admin tidak ditemukan' });
      }
  
      // Periksa kata sandi
      const isPasswordValid = await password== admin.password;
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Kata sandi salah' });
      }
  
      // Buat token JWT
      const token = jwt.sign({ id: admin._id ,username:admin.username}, 'rahasia');
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat proses login' });
    }
  });
    
}