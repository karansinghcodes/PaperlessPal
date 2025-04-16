import { Request, Response } from "express";

export const createInvoice = async (req: Request, res: Response) => {
  try {

    


  } catch (error:any) {
    console.error("Error creating invoice",error.message);
    res.status(500).json({message:"Internal server error",success:false});
  }
};
