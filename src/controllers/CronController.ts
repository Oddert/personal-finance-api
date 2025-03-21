import TokenExclude from '../models/TokenExclude'

export const clearExpiredRefreshTokens = async () => {
    await TokenExclude.query().where('expires', '<', new Date()).delete()
}