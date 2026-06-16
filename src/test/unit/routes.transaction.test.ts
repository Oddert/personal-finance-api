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

const transactionId1 = '5a23ad67-9a9f-4b3e-9f8b-8c22ff310662';
const transactionId2 = 'ffcc3053-211f-4e4e-8513-093f8094a362';
const transactionId3 = 'a3455fb5-403c-42bf-9ad3-27714dab1f1e';

describe('[UNIT] routes : transaction', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => {
        return knex.migrate.rollback(migrateOpts);
    });

    describe('GET /transaction', () => {
        it('should retrieve all transactions', (done) => {
            chai.request(server)
                .get('/transaction')
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
                    expect(
                        res.body.payload.transactions,
                    ).to.have.lengthOf.above(0);
                    for (const transaction of res.body.payload.transactions) {
                        expect(transaction).to.have.all.keys(
                            'assignedCategory',
                            'ballance',
                            'categoryId',
                            'cardId',
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
                        expect(transaction.assignedCategory).to.eql(null);
                        expect(transaction.ballance).to.be.a('number');
                        expect(transaction.categoryId).to.be.a('string');
                        expect(transaction.cardId).to.be.a('string');
                        expect(transaction.createdOn).to.be.a('string');
                        expect(transaction.credit).to.be.a('number');
                        expect(transaction.currency).to.be.a('string');
                        expect(transaction.date).to.be.a('string');
                        expect(transaction.debit).to.be.a('number');
                        expect(transaction.description).to.be.a('string');
                        expect(transaction.id).to.be.a('string');
                        expect(transaction.transactionType).to.be.a('string');
                        expect(transaction.updatedOn).to.be.a('string');
                        expect(transaction.userId).to.be.a('string');
                    }
                    done();
                });
        });
    });

    describe('GET /transaction?includeCategory=true', () => {
        it('should retrieve all transactions with category information', (done) => {
            chai.request(server)
                .get('/transaction?includeCategory=true')
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
                    expect(
                        res.body.payload.transactions,
                    ).to.have.lengthOf.above(0);
                    for (const transaction of res.body.payload.transactions) {
                        expect(transaction).to.have.all.keys(
                            'assignedCategory',
                            'ballance',
                            'categoryId',
                            'cardId',
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
                        if (
                            transaction.assignedCategory ||
                            transaction.categoryId.length
                        ) {
                            expect(transaction.assignedCategory).to.be.a(
                                'object',
                            );
                            expect(
                                transaction.assignedCategory,
                            ).to.have.all.keys(
                                'colour',
                                'createdOn',
                                'description',
                                'id',
                                'label',
                                'matchers',
                                'updatedOn',
                                'userId',
                            );
                        }
                    }
                    done();
                });
        });
    });

    describe('GET /transaction/:id', () => {
        it('should retrieve a single transaction', (done) => {
            chai.request(server)
                .get(`/transaction/${transactionId1}`)
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
                    const transaction = res.body.payload.transaction;
                    expect(transaction).to.have.all.keys(
                        'assignedCategory',
                        'ballance',
                        'categoryId',
                        'cardId',
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
                    expect(transaction.assignedCategory).to.eql(null);
                    expect(transaction.ballance).to.be.a('number');
                    expect(transaction.categoryId).to.be.a('string');
                    expect(transaction.cardId).to.be.a('string');
                    expect(transaction.createdOn).to.be.a('string');
                    expect(transaction.credit).to.be.a('number');
                    expect(transaction.currency).to.be.a('string');
                    expect(transaction.date).to.be.a('string');
                    expect(transaction.debit).to.be.a('number');
                    expect(transaction.description).to.be.a('string');
                    expect(transaction.id).to.be.a('string');
                    expect(transaction.transactionType).to.be.a('string');
                    expect(transaction.updatedOn).to.be.a('string');
                    expect(transaction.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('GET /transaction/:id?includeCategory=true', () => {
        it('should retrieve a single transaction with category information', (done) => {
            chai.request(server)
                .get(`/transaction/${transactionId1}?includeCategory=true`)
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
                    const transaction = res.body.payload.transaction;
                    expect(transaction).to.have.all.keys(
                        'assignedCategory',
                        'ballance',
                        'categoryId',
                        'cardId',
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
                    done();
                });
        });
    });

    describe('POST /transaction', () => {
        it('should create a new transaction', (done) => {
            const date = new Date();

            const ballance = 934.17;
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const credit = 0;
            const currency = 'GBP';
            const debit = 23;
            const description = `TEST_TRANSACTION_${date.toString()}`;
            const transDate = new Date('23 june 2023').getTime();
            const transType = 'DEB';

            chai.request(server)
                .post('/transaction')
                .set('Content-Type', 'application/json')
                .send({
                    ballance: ballance,
                    cardId: cardId,
                    credit: credit,
                    currency: currency,
                    date: transDate,
                    debit: debit,
                    description: description,
                    transactionType: transType,
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
                    const transaction = res.body.payload.transaction;
                    expect(transaction).to.be.a('object');
                    expect(transaction).to.have.all.keys(
                        'assignedCategory',
                        'ballance',
                        'categoryId',
                        'cardId',
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
                    expect(transaction.assignedCategory).to.eql(null);
                    expect(transaction.ballance).to.be.eql(ballance);
                    expect(transaction.categoryId).to.be.eql(null);
                    expect(transaction.cardId).to.be.eql(cardId);
                    expect(transaction.createdOn).to.be.a('string');
                    expect(transaction.credit).to.be.eql(credit);
                    expect(transaction.currency).to.be.eql(currency);
                    expect(transaction.date).to.be.a('string');
                    expect(transaction.debit).to.be.eql(debit);
                    expect(transaction.description).to.be.eql(description);
                    expect(transaction.id).to.be.a('string');
                    expect(transaction.transactionType).to.be.eql(transType);
                    expect(transaction.updatedOn).to.be.a('string');
                    expect(transaction.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('PUT /transaction/:transactionId', () => {
        it('should update a single transaction', (done) => {
            const date = new Date();

            const ballance = 622.97;
            const cardId = 'dc4b572d-1be4-412f-b99a-4cc947e9f048'; // not currently in seed data
            const credit = 0;
            const currency = 'EUR';
            const debit = 52;
            const description = `TEST_TRANSACTION_${date.toString()}`;
            const transDate = new Date('30 july 2022').getTime();
            const transType = 'DEB';

            chai.request(server)
                .put(`/transaction/${transactionId2}`)
                .set('Content-Type', 'application/json')
                .send({
                    ballance: ballance,
                    cardId: cardId,
                    credit: credit,
                    currency: currency,
                    date: transDate,
                    debit: debit,
                    description: description,
                    transactionType: transType,
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

                    const transaction = res.body.payload.transaction;
                    expect(transaction).to.be.a('object');
                    expect(transaction).to.have.all.keys(
                        'assignedCategory',
                        'ballance',
                        'categoryId',
                        'cardId',
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
                    expect(transaction.ballance).to.be.eql(ballance);
                    expect(transaction.categoryId).to.satisfy(nullOr('string'));
                    expect(transaction.cardId).to.be.eql(cardId);
                    expect(transaction.createdOn).to.be.a('string');
                    expect(transaction.credit).to.be.eql(credit);
                    expect(transaction.currency).to.be.eql(currency);
                    expect(transaction.date).to.be.a('string');
                    expect(transaction.debit).to.be.eql(debit);
                    expect(transaction.description).to.be.eql(description);
                    expect(transaction.id).to.be.eql(transactionId2);
                    expect(transaction.transactionType).to.be.eql(transType);
                    expect(transaction.updatedOn).to.be.a('string');
                    expect(transaction.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('DELETE /transaction/:transactionId', () => {
        it('should delete a single transaction', (done) => {
            chai.request(server)
                .get(`/transaction/${transactionId3}`)
                .set('Content-Type', 'application/json')
                .end((err1, res) => {
                    should.not.exist(err1);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');

                    res.body.status.should.eql(res.status);
                    const transaction = res.body.payload.transaction;
                    expect(transaction).to.have.all.keys(
                        'assignedCategory',
                        'ballance',
                        'categoryId',
                        'cardId',
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
                    expect(transaction.assignedCategory).to.eql(null);
                    expect(transaction.ballance).to.be.a('number');
                    expect(transaction.categoryId).to.be.a('string');
                    expect(transaction.cardId).to.be.a('string');
                    expect(transaction.createdOn).to.be.a('string');
                    expect(transaction.credit).to.be.a('number');
                    expect(transaction.currency).to.be.a('string');
                    expect(transaction.date).to.be.a('string');
                    expect(transaction.debit).to.be.a('number');
                    expect(transaction.description).to.be.a('string');
                    expect(transaction.id).to.be.a('string');
                    expect(transaction.transactionType).to.be.a('string');
                    expect(transaction.updatedOn).to.be.a('string');
                    expect(transaction.userId).to.be.a('string');

                    chai.request(server)
                        .delete(`/transaction/${transactionId3}`)
                        .set('Content-Type', 'application/json')
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.redirects.length.should.eql(0);
                            res2.status.should.eql(
                                204,
                                `Invalid response: ${JSON.stringify(res2.body)}`,
                            );

                            chai.request(server)
                                .get(`/transaction/${transactionId3}`)
                                .set('Content-Type', 'application/json')
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.redirects.length.should.eql(0);
                                    res3.status.should.eql(
                                        404,
                                        `Invalid response: ${JSON.stringify(res3.body)}`,
                                    );
                                    res3.type.should.eql('application/json');
                                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                    expect(res3.body.payload.transaction).to.not
                                        .exist;
                                    done();
                                });
                        });
                });
        });
    });
});
