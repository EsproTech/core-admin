import app from "./config/express";
import { getPort } from "./utils/utils";

const PORT = getPort();

app.listen(PORT, () => console.log(`Express app started on port ${PORT}`));