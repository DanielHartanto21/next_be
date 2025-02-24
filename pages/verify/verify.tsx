import { NextApiRequest,NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import AdminModel from "../models/admin";
// import ConnectMongoDB from "../db/db";

// ConnectMongoDB();
interface DecodedToken {
    id: string;
    username: string;
  }
export const VerifyToken = async (req:NextApiRequest, res:NextApiResponse, next:()=> void) => {
  const token = req.headers.authorization; // Assuming token is sent in the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {

    const decoded = jwt.verify(token, 'rahasia')as DecodedToken; // Verify token using your secret key
    const userId = decoded.id;
    const username = decoded.username;
    const admin = await AdminModel.findOne({ username });
    const userValid = await userId== admin._id ;
    if (userValid==true){
        next();
    }else{
        return res.status(401).json({ message: 'Unauthorized: No token wrong' });
    }

  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
