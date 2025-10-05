import Router from "express" 
import { 
  createComment, 
  getAllComments, 
  getCommentById, 
  deleteComment, 
  toggleLike 
} from "../controllers/comment.controller.js"

const router = Router()

router.post('/comments', createComment)           
router.get('/comments', getAllComments)          
router.get('/comments/:id', getCommentById)      
router.delete('/comments/:id', deleteComment)   


router.post('/comments/:id/like', toggleLike)    

export default router    