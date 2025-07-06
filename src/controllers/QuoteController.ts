import { Controller, Route, Validate } from "ndro-express-utils";
import { Request, Response } from "express";
import { IQuote } from "../entities/Quote";
import { QuotesCreationValidationSchem } from "../validation/QuotesValidationSchemas";
import { QuotesService } from "../services/QuotesService";

@Controller("/quotes")
export class QuotesController{

    @Route("post", "/")
    @Validate(QuotesCreationValidationSchem)
    async createQuote(req: Request<object, object, IQuote>, res: Response){
        const newQuoteData = req.body
        const newQuote = await QuotesService.createQuote(newQuoteData)
        return res.status(201).json(newQuote)
    }
    
}
