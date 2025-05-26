import TokenExclude from '../models/TokenExclude';

/**
 * Removes all stale tokens from the token exclusion table.
 *
 * Stale tokens are tokens who's expiration time has elapsed, thus cannot be used and are therefore redundant to have in the exclude table.
 *
 * Can be run anytime but is intended to be run on a CRON schedule, for example, once a day.
 */
export const clearExpiredRefreshTokens = async () => {
    await TokenExclude.query().where('expires', '<', new Date()).delete();
};
