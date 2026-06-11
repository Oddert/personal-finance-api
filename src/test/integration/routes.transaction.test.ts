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

describe('[INTEGRATION] routes : transaction', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => knex.migrate.rollback(migrateOpts));

    describe('POST /transaction', () => {
        it('should create a new transaction and change the length of the total array', (done) => {
            const date = new Date();

            const transDate = new Date('21 sept 2023').getTime();
            const transType = 'DEB';
            const description = `TEST_TRANSACTION_${date.toString()}`;
            const debit = 98.1;
            const credit = 0;
            const ballance = 174.22;

            let initialLength = 0;

            chai.request(server)
                .get('/transaction')
                .set('Content-Type', 'application/json')
                .end((err1, res1) => {
                    if (err1) {
                        console.warn(err1);
                    }
                    should.not.exist(err1);
                    res1.redirects.length.should.eql(0);
                    res1.status.should.eql(200);
                    res1.type.should.eql('application/json');
                    expect(
                        res1.body.payload.transactions,
                    ).to.have.lengthOf.above(0);
                    initialLength = res1.body.payload.transactions.length;

                    chai.request(server)
                        .post('/transaction')
                        .set('Content-Type', 'application/json')
                        .send({
                            ballance: ballance,
                            cardId: 'be913800-df3b-4285-803a-88e971fde8f3',
                            credit: credit,
                            date: transDate,
                            debit: debit,
                            description: description,
                            transactionType: transType,
                        })
                        .end((err2, res2) => {
                            if (err2) {
                                console.warn(err2);
                            }
                            should.not.exist(err2);
                            res2.redirects.length.should.eql(0);
                            res2.status.should.eql(201);
                            res2.type.should.eql('application/json');

                            res2.body.status.should.eql(res2.status);
                            expect(res2.body.payload.transaction).to.be.a(
                                'object',
                            );
                            expect(
                                res2.body.payload.transaction,
                            ).to.have.all.keys(
                                'assignedCategory',
                                'ballance',
                                'cardId',
                                'categoryId',
                                'createdOn',
                                'credit',
                                'currency',
                                'date',
                                'debit',
                                'description',
                                'id',
                                'transactionType',
                                'updatedOn',
                                'userId',
                            );
                            expect(res2.body.payload.transaction.id).to.be.a(
                                'string',
                            );
                            expect(res2.body.payload.transaction.date).to.eql(
                                new Date(transDate).toISOString(),
                            );
                            expect(
                                res2.body.payload.transaction.transactionType,
                            ).to.eql(transType);
                            expect(
                                res2.body.payload.transaction.description,
                            ).to.eql(description);
                            expect(res2.body.payload.transaction.debit).to.eql(
                                debit,
                            );
                            expect(res2.body.payload.transaction.credit).to.eql(
                                credit,
                            );
                            expect(
                                res2.body.payload.transaction.ballance,
                            ).to.eql(ballance);
                            expect(
                                res2.body.payload.transaction.createdOn,
                            ).to.be.a('string');
                            expect(
                                res2.body.payload.transaction.updatedOn,
                            ).to.be.a('string');
                            expect(
                                res2.body.payload.transaction.updatedOn,
                            ).to.eql(res2.body.payload.transaction.createdOn);

                            chai.request(server)
                                .get('/transaction')
                                .set('Content-Type', 'application/json')
                                .send()
                                .end((err3, res3) => {
                                    if (err3) {
                                        console.warn(err3);
                                    }
                                    should.not.exist(err3);
                                    res3.redirects.length.should.eql(0);
                                    res3.status.should.eql(200);
                                    res3.type.should.eql('application/json');
                                    expect(
                                        res3.body.payload.transactions,
                                    ).to.have.lengthOf(initialLength + 1);
                                    done();
                                });
                        });
                });
        });
    });

    describe('POST /transaction', () => {
        it('should add a transaction, a category and some matchers', (done) => {
            const schema = {
                ballance: 76.34,
                cardId: 'be913800-df3b-4285-803a-88e971fde8f3',
                credit: 0,
                description: 'Integration test new description',
                date: new Date('17 june 2022').getTime(),
                debit: 52,
                transactionType: 'DEB',
                assignedCategory: {
                    label: 'Integration Test New Category',
                    description: '',
                    colour: '#ecf0f1',
                    matchers: [
                        {
                            match: 'ITM1',
                            match_type: 'end',
                            case_sensitive: true,
                        },
                        {
                            match: 'ITM2',
                            match_type: 'start',
                            case_sensitive: true,
                        },
                        {
                            match: 'ITM3',
                            match_type: 'any',
                            case_sensitive: false,
                        },
                    ],
                },
            };

            chai.request(server)
                .post('/transaction')
                .set('Content-Type', 'application/json')
                .send(schema)
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(201);
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);

                    const transaction = res.body.payload.transaction;

                    expect(transaction).to.be.a('object');
                    expect(transaction).to.have.all.keys(
                        'assignedCategory',
                        'ballance',
                        'cardId',
                        'categoryId',
                        'createdOn',
                        'credit',
                        'currency',
                        'date',
                        'debit',
                        'description',
                        'id',
                        'transactionType',
                        'updatedOn',
                        'userId',
                    );
                    expect(transaction.id).to.be.a('string');
                    expect(transaction.date).to.eql(
                        new Date(schema.date).toISOString(),
                    );
                    expect(transaction.transactionType).to.eql(
                        schema.transactionType,
                    );
                    expect(transaction.description).to.eql(schema.description);
                    expect(transaction.debit).to.eql(schema.debit);
                    expect(transaction.credit).to.eql(schema.credit);
                    expect(transaction.ballance).to.eql(schema.ballance);
                    expect(transaction.categoryId).to.be.a('string');
                    expect(transaction.createdOn).to.be.a('string');
                    expect(transaction.updatedOn).to.be.a('string');
                    expect(transaction.updatedOn).to.eql(transaction.createdOn);

                    expect(transaction.assignedCategory).to.be.a('object');
                    expect(transaction.assignedCategory).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    expect(transaction.assignedCategory.id).to.be.a('string');
                    expect(transaction.assignedCategory.label).to.be.a(
                        'string',
                    );
                    expect(transaction.assignedCategory.description).to.be.a(
                        'string',
                    );
                    expect(transaction.assignedCategory.colour).to.be.a(
                        'string',
                    );
                    expect(transaction.assignedCategory.matchers).to.be.a(
                        'array',
                    );
                    expect(transaction.assignedCategory.createdOn).to.be.a(
                        'string',
                    );
                    expect(transaction.assignedCategory.updatedOn).to.be.a(
                        'string',
                    );
                    expect(transaction.assignedCategory.updatedOn).to.eql(
                        transaction.assignedCategory.createdOn,
                    );
                    expect(transaction.assignedCategory.userId).to.be.a(
                        'string',
                    );
                    for (const matcher of transaction.assignedCategory
                        .matchers) {
                        // Basic check the matcher came through. Thorough Matcher integration tests performed by Category tests.
                        expect(matcher).to.be.a('object');
                        expect(matcher).to.have.all.keys(
                            'caseSensitive',
                            'createdOn',
                            'id',
                            'match',
                            'matchType',
                            'updatedOn',
                            'userId',
                        );
                    }
                    done();
                });
        });
    });
});
