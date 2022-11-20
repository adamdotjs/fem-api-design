import * as dotenv from "dotenv";
import { app } from "./server";
const PORT = 3001;

dotenv.config();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
