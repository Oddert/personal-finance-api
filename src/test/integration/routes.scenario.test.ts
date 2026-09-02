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

describe('[INTEGRATION] routes : scenario', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => knex.migrate.rollback(migrateOpts));

    describe('GET /scenario', () => {
        it('should retrieve all scenarios with transactors and schedulers', (done) => {
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
                            'cards',
                            'transactors',
                            'updatedOn',
                            'userId',
                        );
                        expect(scenario.cards).to.be.a('array');
                        expect(scenario.transactors).to.be.a('array');

                        for (const transactor of scenario.transactors) {
                            expect(transactor).to.have.all.keys(
                                'categoryId',
                                'cardId',
                                'createdOn',
                                'description',
                                'id',
                                'isAddition',
                                'scenarioId',
                                'schedulers',
                                'updatedOn',
                                'value',
                            );
                            expect(transactor.id).to.be.a('string');
                            expect(transactor.createdOn).to.be.a('string');
                            expect(transactor.categoryId).to.satisfy(
                                nullOr('string'),
                            );
                            expect(transactor.updatedOn).to.be.a('string');
                            expect(transactor.description).to.be.a('string');
                            expect(transactor.isAddition).to.be.oneOf([
                                true,
                                false,
                            ]);
                            expect(transactor.value).to.be.a('number');
                            expect(transactor.scenarioId).to.be.a('string');
                            expect(transactor.scenarioId).to.eql(scenario.id);
                            expect(transactor.schedulers).to.be.a('array');

                            for (const scheduler of transactor.schedulers) {
                                expect(scheduler).to.have.all.keys(
                                    'createdOn',
                                    'day',
                                    'id',
                                    'nthDay',
                                    'startDate',
                                    'schedulerCode',
                                    'step',
                                    'transactorId',
                                    'updatedOn',
                                );
                                expect(scheduler.id).to.be.a('string');
                                expect(scheduler.transactorId).to.eql(
                                    transactor.id,
                                );
                                expect(scheduler.schedulerCode).to.be.a(
                                    'string',
                                );
                                expect(scheduler.createdOn).to.be.a('string');
                                expect(scheduler.updatedOn).to.be.a('string');
                                expect(scheduler.step).to.satisfy(
                                    nullOr('string'),
                                );
                                expect(scheduler.startDate).to.satisfy(
                                    nullOr('number'),
                                );
                                expect(scheduler.day).to.satisfy(
                                    nullOr('number'),
                                );
                                expect(scheduler.nthDay).to.satisfy(
                                    nullOr('number'),
                                );
                                expect(scheduler.transactorId).to.be.a(
                                    'string',
                                );
                                expect(scheduler.transactorId).to.eql(
                                    transactor.id,
                                );
                            }
                        }
                    }
                    done();
                });
        });
    });
});

// POST a scenario and check transactors / schedulers
// Create many scenarios and check transactors / schedulers
// POST and check scenarios length
// Update a scenario and check the transactors and schedulers
// Update a transactor and check its details (including schedulers)
// Delete a scenario and check it deleted the corresponding transactors and schedulers
// Delete a transactor and check its gone from scenario + check the schedulers are deleted
// Delete many scenarios and check the length is correct
