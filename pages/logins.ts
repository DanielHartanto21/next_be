import { NextApiRequest,NextApiResponse } from "next";
export default function Hello(req:NextApiRequest,res:NextApiResponse){
    if (req.method=="GET"){
        res.status(500).json({message:"error if get"});
    }
    res.json({hello:"world",method:req.method});
}