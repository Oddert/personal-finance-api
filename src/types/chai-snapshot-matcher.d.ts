declare module 'chai-snapshot-matcher' {
    interface SnapshotConfig {
        hint?: string;
        name?: string;
        folder?: string;
        snapshotPath?: string;
        ignore?: string[];
    }

    global {
        namespace Chai {
            interface Assertion {
                /**
                 * Compare the current value against a snapshot file.
                 * @param ctx - The Mocha test context (use `this` from the test function)
                 * @param config - Optional configuration for snapshot matching
                 */
                matchSnapshot(
                    ctx: Mocha.Context,
                    config?: SnapshotConfig,
                ): void;
            }
        }
    }

    const chaiSnapshotMatcher: () => void;
    export = chaiSnapshotMatcher;
}
