import express from 'express'
import {listProducts,addProduct,removeProducts,singleProducts} from '../controllers/productContoller.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter=express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRouter.post('/remove',adminAuth,removeProducts)
productRouter.post('/single',singleProducts)
productRouter.get('/list',listProducts)

export default productRouter




