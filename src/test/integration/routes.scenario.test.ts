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
                        expect(scenario.transactors).to.have.lengthOf.above(1);

                        let schedulerCount = 0;

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
                            schedulerCount += transactor.schedulers.length;

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
                                    nullOr('number'),
                                );
                                expect(scheduler.startDate).to.satisfy(
                                    nullOr('string'),
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

                        expect(schedulerCount).to.be.above(1);
                    }
                    done();
                });
        });
    });

    describe('POST /scenario', () => {
        it('should create a scenario with multiple transactors and schedulers', (done) => {
            chai.request(server)
                .post('/scenario')
                .set('Content-Type', 'application/json')
                .send({
                    cardId: 'be913800-df3b-4285-803a-88e971fde8f3',
                    description: '[test] scenario with nested records',
                    endDate: null,
                    startBallance: 1000,
                    startDate: '1 Jan 2025',
                    title: '[test] nested scenario',
                    transactors: [
                        {
                            cardId: 'be913800-df3b-4285-803a-88e971fde8f3',
                            description: 'Mortgage',
                            isAddition: false,
                            scenarioId: 'scenario-id-is-generated',
                            schedulers: [
                                {
                                    day: 1,
                                    schedulerCode: 'DAY',
                                },
                            ],
                            value: 600.55,
                        },
                        {
                            cardId: 'be913800-df3b-4285-803a-88e971fde8f3',
                            description: 'Salary',
                            isAddition: true,
                            scenarioId: 'scenario-id-is-generated',
                            schedulers: [
                                {
                                    day: 15,
                                    schedulerCode: 'DAY',
                                },
                            ],
                            value: 1894.28,
                        },
                    ],
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(
                        201,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );

                    const scenario = res.body.payload.scenario;
                    expect(scenario.transactors).to.have.lengthOf(2);
                    expect(scenario.transactors[0].schedulers).to.have.lengthOf(
                        1,
                    );
                    expect(scenario.transactors[1].schedulers).to.have.lengthOf(
                        1,
                    );
                    expect(
                        scenario.transactors[0].schedulers[0].transactorId,
                    ).to.eql(scenario.transactors[0].id);
                    expect(
                        scenario.transactors[1].schedulers[0].transactorId,
                    ).to.eql(scenario.transactors[1].id);

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
