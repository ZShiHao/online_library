import express, { Request, Response, NextFunction } from "express";
import svgCaptcha  from 'svg-captcha'

const router = express.Router();

router.get('/api/books/captcha',async (req: Request, res: Response)=>{
    const captcha=svgCaptcha.create({
        noise:2,
        height:32,
        fontSize:35
    })
    console.log(req.ip)
    console.log(captcha)
    res.status(200).send({
        status:200,
        data:captcha,
        message:'Success.'
    })
})

export { router as createCaptchaRouter };
