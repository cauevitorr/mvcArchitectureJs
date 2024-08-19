import { Router } from  "express"

//Import controllers
import {
 getFuncionarios,
 postFuncionarios,
 getFuncionariosId,
 putFuncionarios,
 deleteFuncionarios
} from "../controllers/funcionariosController.js"

const router = Router()

router.get("/", getFuncionarios)
router.post("/post", postFuncionarios)
router.get("/:id", getFuncionariosId)
router.put("/put/:id", putFuncionarios)
router.delete("/delete/:id", deleteFuncionarios)

export default router
