import { Request, Response } from 'express'

export interface IStandardResponse {
    message?: string    
    error?: string
    status: number
    payload?: any
}

/**
 * Standard response formatter for 200 band responses.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondOk(req, res, { myData: [1, 2, 3] })
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondOk = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'Request processed successfully.',
    statusCode = 200,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 201 responses.
 *
 * Indicates that a create operation was executed.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondCreated(req, res, { createdEntity: { name: 'Jean Luc' } })
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondCreated = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'Create request processed successfully.',
    statusCode = 201,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 300 band responses.
 *
 * The user agent or user should choose one of them.
 *
 * There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondMultipleChoices(req, res, { options: [1, 2] })
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondMultipleChoices = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'The request has more than one possible response.',
    statusCode = 300,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 400 band responses.
 *
 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondBadRequest(req, res, null, null, 'Something went wrong with your request.')
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondBadRequest = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'There was an issue in the format of your request. Please check and try again.',
    statusCode = 400,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 401 responses.
 *
 * The user is unauthenticated and requires login before proceeding.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondUnauthenticated(req, res, null, null, 'You are not logged in.')
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondUnauthenticated = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'You are not logged in.',
    statusCode = 401,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 400 band responses.
 *
 * The server cannot find the requested resource.
 *
 * In the browser, this means the URL is not recognized.
 *
 * In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondNotFound(req, res, null, null, 'The requested resource could not be found.')
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondNotFound = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'The requested resource could not be found.',
    statusCode = 404,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 409 responses.
 *
 * The request has a conflict and was rejected.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondConflict(req, res, null, null, 'The requested username is already taken.')
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondConflict = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'The requested resource is not available.',
    statusCode = 409,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}

/**
 * Standard response formatter for 500 band responses.
 *
 * The server has encountered a situation it does not know how to handle.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondServerError(req, res, { options: [1, 2] })
 * @param req Express request object. Unused, included for the purpose of interoperability.
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondServerError = (
    req: Request,
    res: Response,
    payload: any = null,
    message: string|null = 'There was an issue processing your request.',
    statusCode = 500,
    error: unknown = null,
): Response<IStandardResponse> => {
    return res
        .status(statusCode)
        .header('Content-Type', 'application/json')
        .json({
            status: statusCode,
            payload,
            message,
            error,
        })
}
