/**
 * Snapshot tests for /card endpoints.
 *
 * Card IDs are stable seed values — only timestamps need ignoring.
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

// Stable IDs from 1743540260_card.js
const defaultCardId = 'be913800-df3b-4285-803a-88e971fde8f3';
const secondCardId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

describe('[SNAPSHOT] routes : card', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    it('GET /card - list all cards', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/card')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CARD);
                done();
            });
    });

    it('GET /card/:id - single card', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/card/${defaultCardId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CARD);
                done();
            });
    });

    it('GET /card/:id - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/card/00000000-0000-0000-0000-000000000000')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /card - create card', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/card')
            .set('Content-Type', 'application/json')
            .send({
                cardName: 'Snapshot Test Card',
                cardType: 'CURRENT',
                bankName: 'Snapshot Bank',
                sortCode: 123456,
                cardNumber: 1234567890123456,
                expires: '2028-12-01',
                description: 'Card created for snapshot testing',
                isDefault: false,
            })
            .end((err, res) => {
                if (err) console.error(err);
                // id is newly generated on create
                snapshotBody(res.body, ctx, [...IGNORE.CARD, 'id']);
                done();
            });
    });

    it('PUT /card/:id - update card', function (done) {
        const ctx = this;
        chai.request(server)
            .put(`/card/${secondCardId}`)
            .set('Content-Type', 'application/json')
            .send({
                cardName: 'Updated Snapshot Card',
                bankName: 'Updated Snapshot Bank',
                description: 'Updated for snapshot test',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CARD);
                done();
            });
    });

    it('PUT /card/:id - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .put('/card/00000000-0000-0000-0000-000000000000')
            .set('Content-Type', 'application/json')
            .send({ cardName: 'Nobody' })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('DELETE /card/:id - delete card', function (done) {
        const ctx = this;
        chai.request(server)
            .delete(`/card/${secondCardId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('PUT /card/preferences/:id - set active card', function (done) {
        const ctx = this;
        chai.request(server)
            .put(`/card/preferences/${secondCardId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });
});
