import { Router } from  "express"
import { Auth } from "../middlewares/auth.js"

//Import controllers
import {
 getClientes,
 postClientes,
 getClientesId,
 putClientes,
 deleteClientes
} from "../controllers/clientesController.js"

const router = Router()

router.get("/", Auth.private, getClientes)
router.post("/post", postClientes)
router.get("/:id", getClientesId)
router.put("/put/:id", putClientes)
router.delete("/delete/:id", deleteClientes)

export default router
