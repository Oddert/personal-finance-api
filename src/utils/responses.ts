import { Response } from 'express'

export interface IStandardResponse {
    message?: string    
    error?: string
    status: number
    payload?: any
}

export interface IResponseFormatterArgs {
    res: Response;
    payload?: any;
    message?: string|null;
    statusCode?: number;
    error?: unknown;
}

/**
 * Standard response formatter for 200 band responses.
 * @category Utils
 * @subcategory Response Utils
 * @example
 *  return respondOk(req, res, { myData: [1, 2, 3] })
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondOk = ({
    res,
    payload = null,
    message = 'Request processed successfully.',
    statusCode = 200,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondCreated = ({
    res,
    payload = null,
    message = 'Create request processed successfully.',
    statusCode = 201,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondMultipleChoices = ({
    res,
    payload = null,
    message = 'The request has more than one possible response.',
    statusCode = 300,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondBadRequest = ({
    res,
    payload = null,
    message = 'There was an issue in the format of your request. Please check and try again.',
    statusCode = 400,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondUnauthenticated = ({
    res,
    payload = null,
    message = 'You are not logged in.',
    statusCode = 401,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondNotFound = ({
    res,
    payload = null,
    message = 'The requested resource could not be found.',
    statusCode = 404,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondConflict = ({
    res,
    payload = null,
    message = 'The requested resource is not available.',
    statusCode = 409,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
 * @param res Express response object.
 * @param payload The response content.
 * @param message Description of the response.
 * @param statusCode The HTTP status code for the response (default: 200).
 * @param error Description of any errors encountered.
 */
export const respondServerError = ({
    res,
    payload = null,
    message = 'There was an issue processing your request.',
    statusCode = 500,
    error = null,
}: IResponseFormatterArgs): Response<IStandardResponse> => {
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
