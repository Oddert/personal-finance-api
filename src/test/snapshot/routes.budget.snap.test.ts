/**
 * Snapshot tests for /budget endpoints.
 *
 * Budget IDs are dynamically generated at seed time (uuid()), so 'id' is
 * always in the ignore list alongside timestamps.
 * Run with `--update` to regenerate snapshots after intentional changes.
 *
 * Note: uses before/after (shared DB state per suite). Mutating tests run last.
 * The /budget/rows and /budget/:id 404 routes call req.t() which triggers an
 * i18next file-read. These are tested in the unit test suite instead.
 */
process.env.NODE_ENV = 'test';

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';

import knex from '../../db/knex';
import server from '../../';
import { IGNORE, snapshotBody } from './snapshotHelper';

chai.use(chaiHttp);

const migrateOpts = { directory: path.join(__dirname, '../../db/migrations') };
const seedOpts = { directory: path.join(__dirname, '../../db/seeds') };

const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
const foodCategoryId = '486f9685-cc57-45f4-a2e7-fc505840de6a';
const supportCategoryId = '4b8614e2-4f8d-41e2-8d62-7163eefa6812';

describe('[SNAPSHOT] routes : budget', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    // -------------------------------------------------------------------------
    // Read-only tests first (stable DB state)
    // -------------------------------------------------------------------------
    it('GET /budget - list all budgets', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/budget')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.BUDGET);
                done();
            });
    });

    it('GET /budget/:id - single budget', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/budget')
            .end((_e, r) => {
                const budgetId = r.body.payload.budgets[0].id as string;
                chai.request(server)
                    .get(`/budget/${budgetId}`)
                    .end((err, res) => {
                        if (err) console.error(err);
                        snapshotBody(res.body, ctx, IGNORE.BUDGET);
                        done();
                    });
            });
    });

    // -------------------------------------------------------------------------
    // Write tests (mutate DB state — run after reads)
    // -------------------------------------------------------------------------
    it('POST /budget - create budget', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/budget')
            .set('Content-Type', 'application/json')
            .send({
                name: 'Snapshot Test Budget',
                shortDescription: 'Short description',
                longDescription: 'Long description for snapshot test budget',
                cardId,
                budgetRows: [
                    {
                        categoryId: foodCategoryId,
                        colour: '#509af3',
                        label: 'Food',
                        value: 400,
                        varLowPc: 5,
                        varHighPc: 10,
                    },
                    {
                        categoryId: supportCategoryId,
                        colour: '#4c9a2a',
                        label: 'Support',
                        value: 50,
                        varLowPc: 5,
                        varHighPc: 5,
                    },
                ],
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.BUDGET);
                done();
            });
    });

    it('PUT /budget/:id - update budget', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/budget')
            .end((_e, r) => {
                const budgetId = r.body.payload.budgets[0].id as string;
                chai.request(server)
                    .put(`/budget/${budgetId}`)
                    .set('Content-Type', 'application/json')
                    .send({
                        id: budgetId,
                        name: 'Updated Snapshot Budget',
                        shortDescription: 'Updated short desc',
                        longDescription:
                            'Updated long description for snapshot',
                    })
                    .end((err, res) => {
                        if (err) console.error(err);
                        snapshotBody(res.body, ctx, IGNORE.BUDGET);
                        done();
                    });
            });
    });

    it('PUT /budget/preferences/:id - set active budget', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/budget')
            .end((_e, r) => {
                const budgetId = r.body.payload.budgets[0].id as string;
                chai.request(server)
                    .put(`/budget/preferences/${budgetId}`)
                    .end((err, res) => {
                        if (err) console.error(err);
                        snapshotBody(res.body, ctx, []);
                        done();
                    });
            });
    });

    it('DELETE /budget/:id - delete budget', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/budget')
            .end((_e, r) => {
                const budgetId = r.body.payload.budgets[0].id as string;
                chai.request(server)
                    .delete(`/budget/${budgetId}`)
                    .end((err, res) => {
                        if (err) console.error(err);
                        snapshotBody(res.body, ctx, []);
                        done();
                    });
            });
    });
});
