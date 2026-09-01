/**
 * Snapshot tests for /scenario endpoints.
 *
 * The scenario ID is a stable seed value. All date fields are relative to
 * seed-run time so they are excluded from the snapshot diff.
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

// Stable IDs from 1743540286_scenario.js seed
const scenarioId = 'f75ac2d1-1ff2-4f14-aa6a-0a7d7fda372d';
const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';

describe('[SNAPSHOT] routes : scenario', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    it('GET /scenario - list all scenarios', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/scenario')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.SCENARIO);
                done();
            });
    });

    it('GET /scenario/:id - single scenario', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/scenario/${scenarioId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.SCENARIO);
                done();
            });
    });

    it('GET /scenario/:id - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/scenario/00000000-0000-0000-0000-000000000000')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /scenario - create scenario', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/scenario')
            .set('Content-Type', 'application/json')
            .send({
                title: 'Snapshot Test Scenario',
                description: 'Created for snapshot testing',
                cardId,
                startBallance: 1000,
                startDate: '1 Jan 2025',
                endDate: '31 Dec 2025',
            })
            .end((err, res) => {
                if (err) console.error(err);
                // id is newly generated on create
                snapshotBody(res.body, ctx, [...IGNORE.SCENARIO, 'id']);
                done();
            });
    });

    it('PUT /scenario/:id - update scenario', function (done) {
        const ctx = this;
        chai.request(server)
            .put(`/scenario/${scenarioId}`)
            .set('Content-Type', 'application/json')
            .send({
                title: 'Updated Snapshot Scenario',
                description: 'Updated for snapshot testing',
                cardId,
                startBallance: 2500,
                startDate: '1 Mar 2025',
                endDate: '31 Mar 2026',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.SCENARIO);
                done();
            });
    });

    it('DELETE /scenario/:id - delete scenario', function (done) {
        const ctx = this;
        chai.request(server)
            .delete(`/scenario/${scenarioId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /scenario/delete-many - delete multiple scenarios', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/scenario/delete-many')
            .set('Content-Type', 'application/json')
            .send({ scenarios: [scenarioId] })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });
});
