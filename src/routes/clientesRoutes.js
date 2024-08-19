import { Router } from  "express"

//Import controllers
import {
 getClientes,
 postClientes,
 getClientesId,
 putClientes,
 deleteClientes
} from "../controllers/clientesController.js"

const router = Router()

router.get("/", getClientes)
router.post("/post", postClientes)
router.get("/:id", getClientesId)
router.put("/put/:id", putClientes)
router.delete("/delete/:id", deleteClientes)

export default router
