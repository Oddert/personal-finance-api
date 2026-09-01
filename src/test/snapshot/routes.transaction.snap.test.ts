/**
 * Snapshot tests for /transaction endpoints.
 *
 * Transaction IDs are stable seed values. Timestamps and date fields vary
 * between runs and are excluded from snapshots.
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

chai.use(chaiHttp);

const migrateOpts = { directory: path.join(__dirname, '../../db/migrations') };
const seedOpts = { directory: path.join(__dirname, '../../db/seeds') };

// Stable IDs from 1743540283_transactions.js seed
const transactionId1 = '5a23ad67-9a9f-4b3e-9f8b-8c22ff310662';
const transactionId2 = 'ffcc3053-211f-4e4e-8513-093f8094a362';
const transactionId3 = 'a3455fb5-403c-42bf-9ad3-27714dab1f1e';
const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';

describe('[SNAPSHOT] routes : transaction', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    it('GET /transaction - list all transactions', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/transaction')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.TRANSACTION);
                done();
            });
    });

    it('GET /transaction?includeCategory=true - list with category', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/transaction?includeCategory=true')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.TRANSACTION);
                done();
            });
    });

    it('GET /transaction/count - transaction count', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/transaction/count')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('GET /transaction/:id - single transaction', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/transaction/${transactionId1}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.TRANSACTION);
                done();
            });
    });

    it('GET /transaction/:id?includeCategory=true - single with category', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/transaction/${transactionId1}?includeCategory=true`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.TRANSACTION);
                done();
            });
    });

    it('GET /transaction/:id - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/transaction/00000000-0000-0000-0000-000000000000')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /transaction - create transaction', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/transaction')
            .set('Content-Type', 'application/json')
            .send({
                ballance: 500.0,
                cardId,
                credit: 0,
                currency: 'GBP',
                date: new Date('1 Jan 2024').getTime(),
                debit: 25.5,
                description: 'SNAPSHOT TEST TRANSACTION',
                transactionType: 'DEB',
            })
            .end((err, res) => {
                if (err) console.error(err);
                // id is newly generated on create
                snapshotBody(res.body, ctx, [...IGNORE.TRANSACTION, 'id']);
                done();
            });
    });

    it('PUT /transaction/:id - update transaction', function (done) {
        const ctx = this;
        chai.request(server)
            .put(`/transaction/${transactionId2}`)
            .set('Content-Type', 'application/json')
            .send({
                ballance: 999.99,
                cardId,
                credit: 0,
                currency: 'GBP',
                date: new Date('15 Feb 2024').getTime(),
                debit: 10.0,
                description: 'SNAPSHOT UPDATED TRANSACTION',
                transactionType: 'DEB',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.TRANSACTION);
                done();
            });
    });

    it('DELETE /transaction/:id - delete transaction', function (done) {
        const ctx = this;
        chai.request(server)
            .delete(`/transaction/${transactionId3}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });
});
