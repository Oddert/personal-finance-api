import { Response } from 'express'
import { v4 as uuid } from 'uuid'

import { IUserRequest } from '../types/Auth.types'

import { respondCreated, respondNotFound, respondOk, respondServerError } from '../utils/responses'

import Budget from '../models/Budget'
import BudgetRow from '../models/BudgetRow'

export const getBudgets = async (req: IUserRequest, res: Response) => {
    try {
        const budgets = await Budget.query().where('budget.user_id', '=', req.user.id).withGraphJoined('budgetRows')
        return respondOk({ res, payload: { budgets } })
    } catch (error: any) {
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const getSingleBudget = async (req: IUserRequest, res: Response) => {
    try {
        const budget = await Budget.query()
            .findById(req.params.id)
            .where('budget.user_id', '=', req.user.id)
            .withGraphJoined('budgetRows')
        return respondOk({ res, payload: { budget } })
    } catch (error: any) {
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const getBudgetRows = async (req: IUserRequest, res: Response) => {
    try {
        const budgetRows = await BudgetRow.query().where('user_id', '=', req.user.id).withGraphJoined('budget')
        return respondOk({ res, payload: { budgetRows } })
    } catch (error: any) {
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const createSingleBudget = async (req: IUserRequest, res: Response) => {
    try {
        const now = new Date().toISOString()
        const body = {
            ...req.body,
            isDefault: Boolean(req.body.isDefault),
            createdOn: now,
            updatedOn: now,
            id: uuid(),
            userId: req.user.id,
        }
        console.log(body)
        const stagedBudget = await Budget.query().insertAndFetch(body)
        console.log({stagedBudget})
        for (const row of req.body.budgetRows) {
            const rowWithId = { ...row, budgetId: stagedBudget.id, id: uuid(), userId: req.user.id }
            await BudgetRow.query().insertAndFetch(rowWithId)
        }

        if (stagedBudget.id) {
            const budget = await Budget.query().findById(stagedBudget.id).withGraphJoined('budgetRows')
            return respondCreated({ res, payload: { budget } })
        }

        return respondServerError({ res, message: 'Something went wrong processing your request' })
    } catch (error: any) {
        console.log(error)
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const updateSingleBudget = async (req: IUserRequest, res: Response) => {
    try {
        const stagedBudget = await Budget.query()
            .findById(req.params.id)
            .where('user_id', '=', req.user.id)
            .withGraphFetched('budgetRows')

        if (!stagedBudget) {
            return respondNotFound({ res, message: `No budget with id "${req.params.id}" found.` })
        }

        const body = {
            name: req.body?.name || stagedBudget.name,
            shortDescription: req.body?.shortDescription || stagedBudget.shortDescription,
            longDescription: req.body?.longDescription || stagedBudget.longDescription,
            isDefault: Boolean(req.body?.isDefault || false),
            createdOn: req.body?.createdOn || stagedBudget.createdOn,
            updatedOn: req.body?.updatedOn || stagedBudget.updatedOn,
        }

        const budget = await Budget.query().patchAndFetchById(req.params.id, body)
        return respondCreated({ res, payload: { budget }, message: 'Budget updated successfully' })
    } catch (error: any) {
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const deleteSingleBudget = async (req: IUserRequest, res: Response) => {
    try {
        await Budget.query().deleteById(req.params.id).where('user_id', '=', req.user.id)

        return respondOk({ res, message: 'Budget deleted successfully', statusCode: 204 })
    } catch (error: any) {
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}

export const setActiveBudget = async (req: IUserRequest, res: Response) => {
    try {
        const actives = await Budget.query().where('is_default', true).where('user_id', '=', req.user.id)

        for (const activeBudget of actives) {
            activeBudget.$query().patch({ isDefault: false })
        }

        await Budget.query().patchAndFetchById(req.params.id, { isDefault: true })

        return respondCreated({ res, message: 'Budget set as default' })
    } catch (error: any) {
        return respondServerError({ res, message: 'Something went wrong processing your request', error: error.message })
    }
}
