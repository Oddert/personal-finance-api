import { Request, Response } from 'express'

import { respondCreated, respondNotFound, respondOk, respondServerError } from '../utils/responses'

import Card from '../models/Card'

export const getCards = async (req: Request, res: Response) => {
    try {
        const cards = await Card.query()
        return respondOk(req, res, { cards })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const getSingleCard = async (req: Request, res: Response) => {
    try {
        const card = await Card.query().findById(req.params.id)
        return respondOk(req, res, { card })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const createSingleCard = async (req: Request, res: Response) => {
    try {
        const now = new Date().toISOString()
        const body = { ...req.body, isDefault: Boolean(req.body.isDefault), createdOn: now, updatedOn: now }
        delete body.id
        const card = await Card.query().insertAndFetch(body)
        return respondOk(req, res, { card })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const updateSingleCard = async (req: Request, res: Response) => {
    try {
        const stagedCard = await Card.query().findById(req.params.id)
    
        if (!stagedCard) {
            return respondNotFound(req, res, null, `No card with id "${req.params.id}" found.`)
        }
    
        const body = {
            ...stagedCard,
            updatedOn: new Date().toISOString(),
            createdOn: new Date(stagedCard.createdOn).toISOString(),
            isDefault: Boolean(req.body?.isDefault || stagedCard.isDefault),
            cardName: req.body?.cardName || stagedCard.cardName,
            cardType: req.body?.cardType || stagedCard.cardType,
            bankName: req.body?.bankName || stagedCard.bankName,
            sortCode: req.body?.sortCode || stagedCard.sortCode,
            cardNumber: req.body?.cardNumber || stagedCard.cardNumber,
            expires: req.body?.expires || stagedCard.expires,
            description: req.body?.description || stagedCard.description,
            icon: req.body?.icon || stagedCard.icon,
            coverImage: req.body?.coverImage || stagedCard.coverImage,
        }
    
        const card = await Card.query().patchAndFetchById(req.params.id, body)
            
        return respondOk(req, res, { card })
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const deleteSingleCard = async (req: Request, res: Response) => {
    try {
        await Card.query().deleteById(req.params.id)

        return respondCreated(req, res, null, 'Card deleted successfully')
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}

export const setActiveCard = async (req: Request, res: Response) => {
    try {
        const actives = await Card.query().where('is_default', true)

        for (const activeCard of actives) {
            activeCard.$query().patch({ isDefault: false })
        }

        await Card.query().patchAndFetchById(req.params.id, { isDefault: true })

        return respondCreated(req, res, null, 'Card set as default')
    } catch (error: any) {
        return respondServerError(req, res, null, 'Something went wrong processing your request', 500, error.message)
    }
}
