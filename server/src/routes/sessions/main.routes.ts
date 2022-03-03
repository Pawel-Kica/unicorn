import { Router } from "express";

import { deleteAllSessionHandler, deleteSingleSessionHandler } from "../../controllers/auth/auth.controllers";
import { requireUser } from "../../middleware/requireUser";

const sessionsMainRoutes = Router();

sessionsMainRoutes.use("/", requireUser);

// delete single session (log out)
sessionsMainRoutes.delete("/", deleteSingleSessionHandler);

// delete all sessions (log out from all sessions)
sessionsMainRoutes.delete("/all", deleteAllSessionHandler);

export default sessionsMainRoutes;
