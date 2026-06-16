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

const matcher1 = '1abb45aa-05bf-4172-ae73-79117969aaf5';
const matcher2 = '51189223-8688-48e5-9d57-c4e343c01175';
const matcher3 = 'e56221ba-b789-44af-b1fc-a68d526a3239';

describe('[UNIT] routes : matcher', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => {
        return knex.migrate.rollback(migrateOpts);
    });

    describe('GET /matcher', () => {
        it('should retrieve all matchers', (done) => {
            chai.request(server)
                .get('/matcher')
                .set('Content-Type', 'application/json')
                .send()
                .end((error, res) => {
                    if (error) {
                        console.error(error);
                    }
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    const matchers = res.body.payload.matchers;
                    expect(matchers).to.have.lengthOf.above(0);
                    for (const matcher of matchers) {
                        expect(matcher).to.have.all.keys(
                            'id',
                            'match',
                            'matchType',
                            'caseSensitive',
                            'createdOn',
                            'updatedOn',
                            'userId',
                        );
                        expect(matcher.id).to.be.a('string');
                        expect(matcher.match).to.be.a('string');
                        expect(matcher.matchType).to.be.a('string');
                        expect(matcher.caseSensitive).to.be.oneOf([
                            true,
                            false,
                        ]);
                        expect(matcher.createdOn).to.be.a('string');
                        expect(matcher.updatedOn).to.be.a('string');
                        expect(matcher.userId).to.be.a('string');
                    }
                    done();
                });
        });
    });

    describe('GET /matcher/:id', () => {
        it('should retrieve a single matcher', (done) => {
            chai.request(server)
                .get(`/matcher/${matcher1}`)
                .set('Content-Type', 'application/json')
                .send()
                .end((error, res) => {
                    if (error) {
                        console.error(error);
                    }
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    const matcher = res.body.payload.matcher;
                    expect(matcher).to.have.all.keys(
                        'id',
                        'match',
                        'matchType',
                        'caseSensitive',
                        'createdOn',
                        'updatedOn',
                        'userId',
                    );
                    expect(matcher.id).to.eql(matcher1);
                    expect(matcher.match).to.be.a('string');
                    expect(matcher.matchType).to.be.a('string');
                    expect(matcher.caseSensitive).to.be.oneOf([true, false]);
                    expect(matcher.createdOn).to.be.a('string');
                    expect(matcher.updatedOn).to.be.a('string');
                    expect(matcher.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('POST /matcher', () => {
        it('should create a new matcher', (done) => {
            const date = new Date();
            const matchName = `TEST_MATCHER_${date.toString()}`;

            chai.request(server)
                .post('/matcher')
                .set('Content-Type', 'application/json')
                .send({
                    match: matchName,
                    matchType: 'any',
                    caseSensitive: false,
                })
                .end((error, res) => {
                    if (error) {
                        console.error(error);
                    }
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        201,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    const matcher = res.body.payload.matcher;
                    expect(matcher).to.be.a('object');
                    expect(matcher).to.have.all.keys(
                        'id',
                        'match',
                        'matchType',
                        'caseSensitive',
                        'createdOn',
                        'updatedOn',
                        'userId',
                    );
                    expect(matcher.id).to.be.a('string');
                    expect(matcher.match).to.eql(matchName);
                    expect(matcher.matchType).to.eql('any');
                    expect(matcher.caseSensitive).to.be.oneOf([false]);
                    expect(matcher.createdOn).to.be.a('string');
                    expect(matcher.updatedOn).to.be.a('string');
                    expect(matcher.updatedOn).to.eql(matcher.createdOn);
                    expect(matcher.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('PUT /matcher/:matcherId', () => {
        it('should update a single matcher', (done) => {
            const date = new Date();
            const matchName = `TEST_MATCHER_UPDATED${date.toString()}`;
            chai.request(server)
                .put(`/matcher/${matcher2}`)
                .set('Content-Type', 'application/json')
                .send({
                    id: matcher2,
                    match: matchName,
                    matchType: 'any',
                    caseSensitive: false,
                })
                .end((error, res) => {
                    if (error) {
                        console.error(error);
                    }
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        201,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    const matcher = res.body.payload.matcher;
                    expect(matcher).to.be.a('object');
                    expect(matcher).to.have.all.keys(
                        'id',
                        'match',
                        'matchType',
                        'caseSensitive',
                        'createdOn',
                        'updatedOn',
                        'userId',
                    );
                    expect(matcher.id).to.eql(matcher2);
                    expect(matcher.match).to.eql(matchName);
                    expect(matcher.matchType).to.eql('any');
                    expect(matcher.caseSensitive).to.be.oneOf([true, false]);
                    expect(matcher.createdOn).to.be.a('string');
                    expect(matcher.updatedOn).to.be.a('string');
                    expect(matcher.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('DELETE /matcher/:matcherId', () => {
        it('should delete a single matcher', (done) => {
            chai.request(server)
                .get(`/matcher/${matcher3}`)
                .set('Content-Type', 'application/json')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.redirects.length.should.eql(0);
                    res1.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res1.body)}`,
                    );
                    res1.type.should.eql('application/json');

                    res1.body.status.should.eql(res1.status);
                    const matcher = res1.body.payload.matcher;
                    expect(matcher).to.be.a('object');
                    expect(matcher).to.have.all.keys(
                        'id',
                        'match',
                        'matchType',
                        'caseSensitive',
                        'createdOn',
                        'updatedOn',
                        'userId',
                    );
                    expect(matcher.id).to.eql(matcher3);
                    expect(matcher.match).to.be.a('string');
                    expect(matcher.matchType).to.be.a('string');
                    expect(matcher.caseSensitive).to.be.oneOf([true, false]);
                    expect(matcher.createdOn).to.be.a('string');
                    expect(matcher.updatedOn).to.be.a('string');
                    expect(matcher.userId).to.be.a('string');

                    chai.request(server)
                        .delete(`/matcher/${matcher3}`)
                        .set('Content-Type', 'application/json')
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.redirects.length.should.eql(0);
                            res2.status.should.eql(
                                204,
                                `Invalid response: ${JSON.stringify(res2.body)}`,
                            );

                            chai.request(server)
                                .get(`/matcher/${matcher3}`)
                                .set('Content-Type', 'application/json')
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.redirects.length.should.eql(0);
                                    res3.status.should.eql(404);
                                    res3.type.should.eql('application/json');
                                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                    expect(res3.body.payload?.matcher).to.not
                                        .exist;
                                    done();
                                });
                        });
                });
        });
    });
});
