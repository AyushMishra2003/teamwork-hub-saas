// routes/productRoutes.js

import { Router } from 'express';
import { addProduct, getProduct } from '../controllers/productController.js';

const productRouter = Router()


productRouter.post("/",addProduct)
productRouter.get('/', getProduct);

export default productRouter;
