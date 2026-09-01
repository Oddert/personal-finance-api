process.env.NODE_ENV = 'test';

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';

import knex from '../../db/knex';

import server from '../../';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const migrateOpts = {
    directory: path.join(__dirname, '../../db/migrations'),
};

const seedOpts = {
    directory: path.join(__dirname, '../../db/seeds'),
};

// Seeded user credentials (see 1743540259_user.js)
const seededUsername = 'sample@example.com';
const seededPassword = 'Password1';
const seededUserId = 'dc4b572d-1be4-412f-b99a-4cc947e9f048';

/** Shape every user object from /auth endpoints should conform to. */
const expectUserShape = (user: Record<string, unknown>) => {
    expect(user).to.have.all.keys(
        'createdOn',
        'currencies',
        'defaultCurrency',
        'defaultLang',
        'firstName',
        'id',
        'languages',
        'lastName',
        'updatedOn',
        'username',
    );
    expect(user.id).to.be.a('string');
    expect(user.username).to.be.a('string');
    expect(user.firstName).to.be.a('string');
    expect(user.lastName).to.be.a('string');
    expect(user.languages).to.be.a('string');
    expect(user.defaultLang).to.be.a('string');
    expect(user.currencies).to.be.a('string');
    expect(user.defaultCurrency).to.be.a('string');
    expect(user.createdOn).to.be.a('string');
    expect(user.updatedOn).to.be.a('string');
};

/** Shape every token-issuing auth response should conform to. */
const expectTokenShape = (body: Record<string, unknown>) => {
    expect(body.payload).to.be.a('object');
    const payload = body.payload as Record<string, unknown>;
    expect(payload.accessToken).to.be.a('string');
    expect(payload.refreshToken).to.be.a('string');
    expect((payload.accessToken as string).length).to.be.above(0);
    expect((payload.refreshToken as string).length).to.be.above(0);
};

describe('[UNIT] routes : auth', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => {
        return knex.migrate.rollback(migrateOpts);
    });

    // -------------------------------------------------------------------------
    // POST /auth/signup
    // -------------------------------------------------------------------------
    describe('POST /auth/signup', () => {
        it('should register a new user and return tokens + user', (done) => {
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
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    expectTokenShape(res.body);
                    expectUserShape(
                        res.body.payload.user as Record<string, unknown>,
                    );
                    expect(res.body.payload.user.username).to.eql(
                        'newuser@example.com',
                    );
                    expect(res.body.payload.user.firstName).to.eql('New');
                    expect(res.body.payload.user.lastName).to.eql('User');
                    done();
                });
        });

        it('should return 409 Conflict when the username is already taken', (done) => {
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
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        409,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // POST /auth/login
    // -------------------------------------------------------------------------
    describe('POST /auth/login', () => {
        it('should log in an existing user and return tokens + user', (done) => {
            chai.request(server)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: seededUsername,
                    password: seededPassword,
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    expectTokenShape(res.body);
                    expectUserShape(
                        res.body.payload.user as Record<string, unknown>,
                    );
                    expect(res.body.payload.user.username).to.eql(
                        seededUsername,
                    );
                    done();
                });
        });

        it('should return 404 when the user does not exist', (done) => {
            chai.request(server)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'nobody@example.com',
                    password: seededPassword,
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(
                        404,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    done();
                });
        });

        it('should return 401 when the password is wrong', (done) => {
            chai.request(server)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: seededUsername,
                    password: 'WrongPass99',
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(
                        401,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // GET /auth/user-exists/:username
    // -------------------------------------------------------------------------
    describe('GET /auth/user-exists/:username', () => {
        it('should return exists: true for a known username', (done) => {
            chai.request(server)
                .get(`/auth/user-exists/${seededUsername}`)
                .set('Content-Type', 'application/json')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    expect(res.body.payload.exists).to.eql(true);
                    done();
                });
        });

        it('should return exists: false for an unknown username', (done) => {
            chai.request(server)
                .get('/auth/user-exists/nobody@example.com')
                .set('Content-Type', 'application/json')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    expect(res.body.payload.exists).to.eql(false);
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // GET /auth/user  (requiresAuth — bypassed in test mode)
    // -------------------------------------------------------------------------
    describe('GET /auth/user', () => {
        it('should retrieve the authenticated user details', (done) => {
            chai.request(server)
                .get('/auth/user')
                .set('Content-Type', 'application/json')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    expectUserShape(
                        res.body.payload.user as Record<string, unknown>,
                    );
                    // The test user injected by getTestUser() matches the seeded user
                    expect(res.body.payload.user.id).to.eql(seededUserId);
                    expect(res.body.payload.user.username).to.eql(
                        seededUsername,
                    );
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /auth/user  (requiresAuth — bypassed in test mode)
    // -------------------------------------------------------------------------
    describe('PUT /auth/user', () => {
        it('should update the authenticated user details', (done) => {
            const newFirstName = 'Updated';
            const newLastName = 'Name';
            const newLanguages = 'en-US';

            chai.request(server)
                .put('/auth/user')
                .set('Content-Type', 'application/json')
                .send({
                    firstName: newFirstName,
                    lastName: newLastName,
                    languages: newLanguages,
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    const user = res.body.payload.user as Record<
                        string,
                        unknown
                    >;
                    expectUserShape(user);
                    expect(user.firstName).to.eql(newFirstName);
                    expect(user.lastName).to.eql(newLastName);
                    expect(user.languages).to.eql(newLanguages);
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /auth/change-password  (requiresAuth — bypassed in test mode)
    // -------------------------------------------------------------------------
    describe('PUT /auth/change-password', () => {
        it('should change the password and return new tokens', (done) => {
            chai.request(server)
                .put('/auth/change-password')
                .set('Content-Type', 'application/json')
                .send({
                    oldPassword: seededPassword,
                    newPassword: 'NewPassword1',
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    expectTokenShape(res.body);
                    expectUserShape(
                        res.body.payload.user as Record<string, unknown>,
                    );
                    done();
                });
        });

        it('should return 400 when the old password is incorrect', (done) => {
            chai.request(server)
                .put('/auth/change-password')
                .set('Content-Type', 'application/json')
                .send({
                    oldPassword: 'WrongPass99',
                    newPassword: 'NewPassword1',
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(
                        400,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /auth/change-email  (requiresAuth — bypassed in test mode)
    // -------------------------------------------------------------------------
    describe('PUT /auth/change-email', () => {
        it('should change the email (username) and return new tokens', (done) => {
            const newEmail = 'changed@example.com';

            chai.request(server)
                .put('/auth/change-email')
                .set('Content-Type', 'application/json')
                .send({ newEmail })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    expectTokenShape(res.body);
                    const user = res.body.payload.user as Record<
                        string,
                        unknown
                    >;
                    expectUserShape(user);
                    expect(user.username).to.eql(newEmail);
                    done();
                });
        });
    });
});
