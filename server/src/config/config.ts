import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });


const portNumber = process.env.PORT_NUMBER as string;
const saltNumber= process.env.SALT_NUMBER as string;
const resendApiKey = process.env.RESEND_API_KEY as string;


export {
    portNumber,
    saltNumber,
    resendApiKey
}