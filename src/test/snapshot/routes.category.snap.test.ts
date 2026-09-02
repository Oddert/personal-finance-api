/**
 * Snapshot tests for /category endpoints.
 *
 * Category IDs are stable seed values — only timestamps need ignoring.
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
const foodCatId = '486f9685-cc57-45f4-a2e7-fc505840de6a';
const supportCatId = '4b8614e2-4f8d-41e2-8d62-7163eefa6812';
const travelCatId = 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3';

describe('[SNAPSHOT] routes : category', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    it('GET /category - list all categories', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/category')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CATEGORY);
                done();
            });
    });

    it('GET /category?includeMatchers=true - list with matchers', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/category?includeMatchers=true')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CATEGORY);
                done();
            });
    });

    it('GET /category/:id - single category', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/category/${foodCatId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CATEGORY);
                done();
            });
    });

    it('GET /category/:id?includeMatchers=true - single with matchers', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/category/${foodCatId}?includeMatchers=true`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CATEGORY);
                done();
            });
    });

    it('GET /category/:id - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/category/00000000-0000-0000-0000-000000000000')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /category - create category', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/category')
            .set('Content-Type', 'application/json')
            .send({
                label: 'Snapshot Test Category',
                description: 'Created for snapshot testing',
                colour: '#bec3c7',
            })
            .end((err, res) => {
                if (err) console.error(err);
                // id is newly generated on create
                snapshotBody(res.body, ctx, [...IGNORE.CATEGORY, 'id']);
                done();
            });
    });

    it('POST /category - create category with matchers', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/category')
            .set('Content-Type', 'application/json')
            .send({
                label: 'Snapshot Category With Matchers',
                description: 'Created for snapshot testing with matchers',
                colour: '#ecf0f1',
                matchers: [
                    {
                        match: 'SNAP_MATCH_1',
                        matchType: 'any',
                        caseSensitive: false,
                    },
                    {
                        match: 'SNAP_MATCH_2',
                        matchType: 'start',
                        caseSensitive: true,
                    },
                ],
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, [...IGNORE.CATEGORY, 'id']);
                done();
            });
    });

    it('PUT /category/:id - update category', function (done) {
        const ctx = this;
        chai.request(server)
            .put(`/category/${supportCatId}`)
            .set('Content-Type', 'application/json')
            .send({
                label: 'Updated Snapshot Category',
                description: 'Updated for snapshot test',
                colour: '#ecf0f1',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.CATEGORY);
                done();
            });
    });

    it('DELETE /category/:id - delete category', function (done) {
        const ctx = this;
        chai.request(server)
            .delete(`/category/${travelCatId}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });
});
