process.env.NODE_ENV = 'test';

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';

import knex from '../../db/knex';

import server from '../../';
import { nullOr } from '../../utils/testUtils';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const migrateOpts = {
    directory: path.join(__dirname, '../../db/migrations'),
};

const seedOpts = {
    directory: path.join(__dirname, '../../db/seeds'),
};

const scenarioId1 = 'f75ac2d1-1ff2-4f14-aa6a-0a7d7fda372d';

describe('[UNIT] routes : scenario', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => {
        return knex.migrate.rollback(migrateOpts);
    });

    describe('GET /scenario', () => {
        it('should retrieve all scenarios', (done) => {
            chai.request(server)
                .get('/scenario')
                .set('Content-Type', 'application/json')
                .send()
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    expect(res.body.payload.scenarios).to.have.lengthOf.above(
                        0,
                    );
                    for (const scenario of res.body.payload.scenarios) {
                        expect(scenario).to.have.all.keys(
                            'cardId',
                            'createdOn',
                            'description',
                            'endDate',
                            'id',
                            'startBallance',
                            'startDate',
                            'title',
                            'transactors',
                            'updatedOn',
                            'userId',
                        );
                        expect(scenario.cardId).to.be.a('string');
                        expect(scenario.createdOn).to.be.a('string');
                        expect(scenario.description).to.be.a('string');
                        expect(scenario.endDate).to.satisfy(nullOr('string'));
                        expect(scenario.id).to.be.a('string');
                        expect(scenario.startBallance).to.be.a('number');
                        expect(scenario.startDate).to.be.a('string');
                        expect(scenario.title).to.be.a('string');
                        expect(scenario.transactors).to.be.a('array');
                        expect(scenario.updatedOn).to.satisfy(nullOr('string'));
                        expect(scenario.userId).to.be.a('string');
                    }
                    done();
                });
        });
    });

    describe('POST /scenario', () => {
        it('should create a scenario', (done) => {
            const description =
                '[test] routes.scenario POST /scenario description';
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const endDate = '1 jan 2025';
            const startBallance = 7293;
            const startDate = '20 march 2024';
            const title = '[test] routes.scenario POST /scenario title';

            chai.request(server)
                .post('/scenario')
                .set('Content-Type', 'application/json')
                .send({
                    description,
                    cardId,
                    endDate,
                    startBallance,
                    startDate,
                    title,
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        201,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    const scenario = res.body.payload.scenario;
                    expect(scenario).to.have.all.keys(
                        'cardId',
                        'createdOn',
                        'description',
                        'endDate',
                        'id',
                        'startBallance',
                        'startDate',
                        'title',
                        'transactors',
                        'updatedOn',
                        'userId',
                    );
                    expect(scenario.cardId).to.be.eql(cardId);
                    expect(scenario.createdOn).to.be.a('string');
                    expect(scenario.description).to.eql(description);
                    expect(scenario.endDate).to.eql(
                        new Date(endDate).toISOString(),
                    );
                    expect(scenario.id).to.be.a('string');
                    expect(scenario.startBallance).to.eql(startBallance);
                    expect(scenario.startDate).to.eql(
                        new Date(startDate).toISOString(),
                    );
                    expect(scenario.title).to.eql(title);
                    expect(scenario.transactors).to.be.a('array');
                    expect(scenario.updatedOn).to.be.a('string');
                    expect(scenario.userId).to.be.a('string');

                    done();
                });
        });
    });

    describe('GET /scenario/:id', () => {
        it('should get a specific scenario', (done) => {
            chai.request(server)
                .get(`/scenario/${scenarioId1}`)
                .set('Content-Type', 'application/json')
                .send()
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    expect(res.body.payload.scenario).to.have.all.keys(
                        'cardId',
                        'createdOn',
                        'description',
                        'endDate',
                        'id',
                        'startBallance',
                        'startDate',
                        'title',
                        'transactors',
                        'updatedOn',
                        'userId',
                    );
                    expect(res.body.payload.scenario.id).to.eql(scenarioId1);

                    done();
                });
        });
    });

    describe('PUT /scenario/:id', () => {
        it('should update a scenario', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const description =
                '[test] routes.scenario POST /scenario/:id description';
            const endDate = '30 sept 2025';
            const startDate = '15 june 2024';
            const startBallance = 4915;
            const title = '[test] routes.scenario POST /scenario/:id title';

            chai.request(server)
                .put(`/scenario/${scenarioId1}`)
                .set('Content-Type', 'application/json')
                .send({
                    cardId,
                    description,
                    endDate,
                    startDate,
                    startBallance,
                    title,
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        201,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    const scenario = res.body.payload.scenario;
                    expect(scenario).to.have.all.keys(
                        'cardId',
                        'createdOn',
                        'description',
                        'endDate',
                        'id',
                        'startBallance',
                        'startDate',
                        'transactors',
                        'title',
                        'updatedOn',
                        'userId',
                    );
                    expect(scenario.cardId).to.be.eql(cardId);
                    expect(scenario.createdOn).to.be.a('string');
                    expect(scenario.description).to.eql(description);
                    expect(scenario.endDate).to.eql(
                        new Date(endDate).toISOString(),
                    );
                    expect(scenario.id).to.be.a('string');
                    expect(scenario.startBallance).to.eql(startBallance);
                    expect(scenario.startDate).to.eql(
                        new Date(startDate).toISOString(),
                    );
                    expect(scenario.title).to.eql(title);
                    expect(scenario.transactors).to.be.a('array');
                    expect(scenario.updatedOn).to.be.a('string');
                    expect(scenario.userId).to.be.a('string');

                    done();
                });
        });
    });

    describe('DELETE /scenario/:id', () => {
        it('should delete a scenario', (done) => {
            chai.request(server)
                .delete(`/scenario/${scenarioId1}`)
                .set('Content-Type', 'application/json')
                .send({ id: scenarioId1 })
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        204,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    done();
                });
        });
    });

    describe('POST /scenario/delete-many', () => {
        it('should delete multiple scenarios', (done) => {
            chai.request(server)
                .post('/scenario/delete-many')
                .set('Content-Type', 'application/json')
                .send({ scenarios: [0, 1, 2] })
                .end((err, res) => {
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        204,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    done();
                });
        });
    });
});
