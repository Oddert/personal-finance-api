/**
 * Snapshot tests for /auth endpoints.
 *
 * Captures full raw JSON response bodies and compares against stored snapshots.
 * Run with `--update` flag to regenerate snapshots after intentional changes.
 * Volatile fields (tokens, timestamps, IDs) are excluded via `ignore`.
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

const seededUsername = 'sample@example.com';
const seededPassword = 'Password1';

describe('[SNAPSHOT] routes : auth', function () {
    before(function () {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    after(function () {
        return knex.migrate.rollback(migrateOpts);
    });

    it('POST /auth/login - success', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: seededUsername, password: seededPassword })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.AUTH);
                done();
            });
    });

    it('POST /auth/login - not found', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'nobody@example.com', password: seededPassword })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /auth/login - wrong password', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: seededUsername, password: 'WrongPass99' })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('POST /auth/signup - success', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/auth/signup')
            .set('Content-Type', 'application/json')
            .send({
                username: 'newuser@example.com',
                password: 'Password2',
                firstName: 'New',
                lastName: 'User',
                languages: 'en-GB',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.AUTH);
                done();
            });
    });

    it('POST /auth/signup - conflict (duplicate username)', function (done) {
        const ctx = this;
        chai.request(server)
            .post('/auth/signup')
            .set('Content-Type', 'application/json')
            .send({
                username: seededUsername,
                password: 'Password2',
                firstName: 'Dup',
                lastName: 'User',
                languages: 'en-GB',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('GET /auth/user-exists/:username - exists true', function (done) {
        const ctx = this;
        chai.request(server)
            .get(`/auth/user-exists/${seededUsername}`)
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('GET /auth/user-exists/:username - exists false', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/auth/user-exists/nobody@example.com')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('GET /auth/user - authenticated user details', function (done) {
        const ctx = this;
        chai.request(server)
            .get('/auth/user')
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.AUTH);
                done();
            });
    });

    it('PUT /auth/user - update user details', function (done) {
        const ctx = this;
        chai.request(server)
            .put('/auth/user')
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'Updated',
                lastName: 'Name',
                languages: 'en-US',
            })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.AUTH);
                done();
            });
    });

    it('PUT /auth/change-password - success', function (done) {
        const ctx = this;
        chai.request(server)
            .put('/auth/change-password')
            .set('Content-Type', 'application/json')
            .send({ oldPassword: seededPassword, newPassword: 'NewPassword1' })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.AUTH);
                done();
            });
    });

    it('PUT /auth/change-password - wrong old password', function (done) {
        const ctx = this;
        chai.request(server)
            .put('/auth/change-password')
            .set('Content-Type', 'application/json')
            .send({ oldPassword: 'WrongPass99', newPassword: 'NewPassword1' })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, []);
                done();
            });
    });

    it('PUT /auth/change-email - success', function (done) {
        const ctx = this;
        chai.request(server)
            .put('/auth/change-email')
            .set('Content-Type', 'application/json')
            .send({ newEmail: 'changed@example.com' })
            .end((err, res) => {
                if (err) console.error(err);
                snapshotBody(res.body, ctx, IGNORE.AUTH);
                done();
            });
    });
});
