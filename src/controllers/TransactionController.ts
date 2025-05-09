import { Response } from 'express'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { IUserRequest } from '../types/Auth.types'

import { respondBadRequest, respondCreated, respondNotFound, respondOk } from '../utils/responses'

import Transaction from '../models/Transaction'

dayjs.extend(customParseFormat)

export const getTransactions = async (req: IUserRequest, res: Response) => {
    try {
        const startDate = typeof req.query?.from === 'string'
            ? dayjs(req.query.from).valueOf()
            : dayjs(0).valueOf()

        const endDate = typeof req.query?.to === 'string'
            ? dayjs(req.query.to).valueOf()
            : dayjs(undefined).valueOf()

        if (req.query.includeCategory) {
            if (req.query.cardId && typeof req.query.cardId === 'string') {
                const transactions = await Transaction.query()
                    .where('user_id', '=', req.user.id)
                    .where('card_id', '=', req.query.cardId)
                    .whereBetween('date', [startDate, endDate])
                    .withGraphFetched('assignedCategory')
                    .orderBy('date', 'DESC')
                return respondOk({ res, payload: { transactions } })
            }

            const transactions = await Transaction.query()
                .where('user_id', '=', req.user.id)
                .whereBetween('date', [startDate, endDate])
                .withGraphFetched('assignedCategory')
                .orderBy('date', 'DESC')

            return respondOk({ res, payload: { transactions } })
        }

        if (req.query.cardId && typeof req.query.cardId === 'string') {
            const transactions = await Transaction.query()
                .where('user_id', '=', req.user.id)
                .whereBetween('date', [startDate, endDate])
                .where('card_id', '=', req.query.cardId)
                .orderBy('date', 'DESC')

            return respondOk({ res, payload: { transactions } })
        }

        const transactions = await Transaction.query()
            .where('user_id', '=', req.user.id)
            .whereBetween('date', [startDate, endDate])
            .orderBy('date', 'DESC')
        return respondOk({ res, payload: { transactions } })

    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const getSingleTransactions = async (req: IUserRequest, res: Response) => {
    try {
        const transaction = req.query.includeCategory
            ? await Transaction.query().findById(req.params.id).where('user_id', '=', req.user.id).withGraphFetched('assignedCategory')
            : await Transaction.query().findById(req.params.id).where('user_id', '=', req.user.id)

        if (!transaction) {
            return respondNotFound({ res, payload: { id: req.params.id } })
        }
        return respondOk({ res, payload: { transaction } })
    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const createSingleTransaction = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const body = { ...req.body, created_on: date, updated_on: date, userId: req.user.id, id: uuid() }
        
        // TODO: Research why the beforeInsert hooks are not working and replace: 
        if (req.body.assignedCategory) {
            body.assignedCategory.created_on = date
            body.assignedCategory.updated_on = date
            if (req.body.assignedCategory.matchers) {
                body.assignedCategory.matchers = req.body.assignedCategory.matchers.map(
                    (matcher: any) => ({
                        ...matcher,
                        created_on: date,
                        updated_on: date,
                    })
                )
            }
        }

        const transaction = req.body.assignedCategory
            ? await Transaction.query().insertGraphAndFetch(body)
            : await Transaction.query().insertAndFetch(body)
        
        return respondCreated({ res, payload: { transaction }, message: 'Transaction created successfully' })
    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const updateSingleTransaction = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const body = { ...req.body, updated_on: date }

        const transaction = await Transaction.query().where('user_id', '=', req.user.id).patchAndFetchById(req.params.id, body)

        return respondCreated({ res, payload: { transaction }, message: 'Transaction updated successfully' })
    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const deleteSingleTransaction = async (req: IUserRequest, res: Response) => {
    try {
        await Transaction.query()
            .where('user_id', '=', req.user.id)
            .deleteById(req.params.id)

        return respondOk({ res, message: 'Delete operation successful.', statusCode: 204 })
    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const createManyTransactions = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const createdTransactions = []

        for (const transaction of req.body.transactions) {
            const body = { ...transaction, created_on: date, updated_on: date, userId: req.user.id, id: uuid() }
            if (typeof transaction.date === 'string') {
                body.date = dayjs(transaction.date, 'DD/MM/YYYY').valueOf()
            }
    
            const createdTransaction = await Transaction.query().insertAndFetch(body)
            createdTransactions.push(createdTransaction)
        }

        return respondCreated({ res, payload: { createdTransactions }, message: 'Transactions created successfully' })
    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const updateManyTransactions = async (req: IUserRequest, res: Response) => {
    try {
        const date = new Date().toISOString()
        const updatedTransactions = []
        
        for (const transaction of req.body.transactions) {
            const body = { ...transaction, created_on: date, updated_on: date }
            if (typeof transaction.date === 'string') {
                body.date = dayjs(transaction.date, 'DD/MM/YYYY').valueOf()
            }
            
            const updatedTransaction = await Transaction.query().where('user_id', '=', req.user.id).patchAndFetchById(transaction.id, body)
            updatedTransactions.push(updatedTransaction)
        }
        
        return respondCreated({ res, payload: { updatedTransactions }, message: 'Transactions updated successfully' })
    } catch(error: any) {
        return respondBadRequest({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}
