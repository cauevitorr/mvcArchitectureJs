import { Router } from "express";

//import controllers
import { 
 getLivros, 
 postLivros, 
 getLivrosId, 
 putLivros, 
 deleteLivros 
} from "../controllers/livrosController.js";

const router = Router()

router.get("/", getLivros )
router.post("/post", postLivros)
router.get("/:id", getLivrosId)
router.put("/put/:id", putLivros)
router.delete("/delete/:id", deleteLivros)

export default router
