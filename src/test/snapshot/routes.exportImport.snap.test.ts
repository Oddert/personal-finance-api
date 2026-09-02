/**
 * Snapshot tests for /bulk-data/export and /bulk-data/import endpoints.
 *
 * Export snapshots capture the full shape and stable field values of the
 * seeded dataset. Import snapshots verify the body returned after import
 * and, critically, that a subsequent re-export of the imported data
 * matches a known-good snapshot — confirming that the persisted data is
 * valid and structurally correct.
 *
 * Run with `--update` to regenerate snapshots after intentional changes.
 */
process.env.NODE_ENV = 'test';

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';

import knex from '../../db/knex';
import server from '../../';
import { IGNORE, snapshotBody } from './snapshotHelper';

const should = chai.should();

chai.use(chaiHttp);

const migrateOpts = { directory: path.join(__dirname, '../../db/migrations') };
const seedOpts = { directory: path.join(__dirname, '../../db/seeds') };

// ---------------------------------------------------------------------------
// Minimal import payload with fixed, deterministic IDs so the post-import
// re-export snapshot is stable across runs.
// ---------------------------------------------------------------------------
const IMPORT_PAYLOAD = {
    cards: [
        {
            id: 'aaaaaaaa-0000-0000-0000-000000000001',
            isDefault: true,
            cardName: 'Snapshot Import Card',
            cardType: 'CURRENT',
            bankName: 'Snapshot Bank',
            sortCode: 111111,
            cardNumber: 1111111111111111,
            expires: new Date('2030-01-01').toISOString(),
            description: 'Card created via bulk import snapshot test',
            icon: '',
            coverImage: '',
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
        },
    ],
    categories: [
        {
            id: 'bbbbbbbb-0000-0000-0000-000000000002',
            label: 'Snapshot Import Category',
            description: 'Category created by import snapshot test',
            colour: '#abcdef',
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            created_on: new Date('2024-01-01').toISOString(),
            updated_on: new Date('2024-01-01').toISOString(),
            matchers: [],
        },
    ],
    transactions: [
        {
            id: 'cccccccc-0000-0000-0000-000000000003',
            userId: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            cardId: 'aaaaaaaa-0000-0000-0000-000000000001',
            categoryId: null,
            description: 'SNAPSHOT IMPORT TRANSACTION',
            transactionType: 'DEB',
            debit: 19.99,
            credit: 0,
            ballance: 200.0,
            currency: 'GBP',
            date: new Date('2024-03-15').toISOString(),
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
        },
    ],
    budgets: [
        {
            id: 'dddddddd-0000-0000-0000-000000000004',
            userId: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            cardId: 'aaaaaaaa-0000-0000-0000-000000000001',
            name: 'Snapshot Import Budget',
            shortDescription: 'Short desc',
            longDescription: 'Long desc',
            isDefault: false,
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
            budgetRows: [],
        },
    ],
    scenarios: [
        {
            id: 'eeeeeeee-0000-0000-0000-000000000005',
            userId: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            cardId: 'aaaaaaaa-0000-0000-0000-000000000001',
            title: 'Snapshot Import Scenario',
            description: 'Scenario created by import snapshot test',
            startBallance: 750,
            startDate: new Date('2024-01-01').toISOString(),
            endDate: null,
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
            transactors: [],
        },
    ],
};

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('[SNAPSHOT] routes : bulk-data', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    // -----------------------------------------------------------------------
    // Export — seeded data
    // -----------------------------------------------------------------------

    it('GET /bulk-data/export - full export of seeded data', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/bulk-data/export')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.EXPORT_IMPORT);
                done();
            });
    });

    // -----------------------------------------------------------------------
    // Import — response body
    // -----------------------------------------------------------------------

    it('POST /bulk-data/import - response body after successful import', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/bulk-data/import')
            .set('Content-Type', 'application/json')
            .send(IMPORT_PAYLOAD)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    // -----------------------------------------------------------------------
    // Post-import re-export — data validity snapshot
    //
    // This is the key snapshot: after POSTing IMPORT_PAYLOAD, re-exporting
    // must yield data that exactly matches what was imported (aside from
    // volatile timestamps). This verifies that every model was persisted
    // correctly by the import controller.
    // -----------------------------------------------------------------------

    it('GET /bulk-data/export - re-export after import matches imported data', function (done) {
        const ctx = this;

        // Run the import first, then snapshot the re-export
        chai.request(server)
            .post('/bulk-data/import')
            .set('Content-Type', 'application/json')
            .send(IMPORT_PAYLOAD)
            .end((importErr, importRes) => {
                if (importErr) console.error(importErr);
                importRes.status.should.equal(
                    200,
                    `Import failed: ${JSON.stringify(importRes.body)}`,
                );

                chai.request(server)
                    .get('/bulk-data/export')
                    .end((exportErr, exportRes) => {
                        if (exportErr) console.error(exportErr);
                        // Snapshot the re-exported payload.
                        // Volatile timestamps are ignored; all other field
                        // values (IDs, names, amounts, etc.) must be stable.
                        snapshotBody(
                            exportRes.body,
                            ctx,
                            IGNORE.EXPORT_IMPORT,
                        );
                        done();
                    });
            });
    });
});
