/**
 * Snapshot tests for /matcher endpoints.
 *
 * Matcher IDs are stable seed values — only timestamps need ignoring.
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

// Stable IDs from 1743540271_categories.js seed
const matcher1 = '1abb45aa-05bf-4172-ae73-79117969aaf5';
const matcher2 = '51189223-8688-48e5-9d57-c4e343c01175';
const matcher3 = 'e56221ba-b789-44af-b1fc-a68d526a3239';

describe('[SNAPSHOT] routes : matcher', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    it('GET /matcher - list all matchers', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/matcher')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.MATCHER);
                done();
            });
    });

    it('GET /matcher/:id - single matcher', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/matcher/${matcher1}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.MATCHER);
                done();
            });
    });

    it('GET /matcher/:id - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/matcher/00000000-0000-0000-0000-000000000000')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /matcher - create matcher', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/matcher')
            .set('Content-Type', 'application/json')
            .send({
                match: 'SNAPSHOT_TEST_MATCHER',
                matchType: 'any',
                caseSensitive: false,
            })
            .end((err, res) => {
                if (err) console.error(err);
                // id is newly generated on create
                snapshotBody(res.body, ctx, [...IGNORE.MATCHER, 'id']);
                done();
            });
    });

    it('PUT /matcher/:id - update matcher', function (done) {
        const ctx = this;
        chai.request(server)
            .put(`/matcher/${matcher2}`)
            .set('Content-Type', 'application/json')
            .send({
                id: matcher2,
                match: 'UPDATED_SNAPSHOT_MATCHER',
                matchType: 'start',
                caseSensitive: true,
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.MATCHER);
                done();
            });
    });

    it('DELETE /matcher/:id - delete matcher', function (done) {
        const ctx = this;
        chai.request(server)
            .delete(`/matcher/${matcher3}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });
});
