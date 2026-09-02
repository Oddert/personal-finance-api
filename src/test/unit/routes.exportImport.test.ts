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

// ---------------------------------------------------------------------------
// Shape helpers
// ---------------------------------------------------------------------------

const expectCardShape = (card: Record<string, unknown>) => {
    expect(card).to.include.all.keys(
        'id',
        'cardName',
        'bankName',
        'cardType',
        'createdOn',
        'updatedOn',
    );
    expect(card.id).to.be.a('string');
    expect(card.cardName).to.be.a('string');
};

const expectCategoryShape = (category: Record<string, unknown>) => {
    expect(category).to.include.all.keys(
        'id',
        'label',
        'colour',
        'matchers',
        'created_on',
        'updated_on',
    );
    expect(category.id).to.be.a('string');
    expect(category.matchers).to.be.a('array');
};

const expectTransactionShape = (tx: Record<string, unknown>) => {
    expect(tx).to.include.all.keys(
        'id',
        'description',
        'debit',
        'credit',
        'ballance',
        'date',
        'transactionType',
        'createdOn',
        'updatedOn',
    );
    expect(tx.id).to.be.a('string');
    expect(tx.debit).to.be.a('number');
    expect(tx.credit).to.be.a('number');
};

const expectBudgetShape = (budget: Record<string, unknown>) => {
    expect(budget).to.include.all.keys(
        'id',
        'name',
        'budgetRows',
        'createdOn',
        'updatedOn',
    );
    expect(budget.id).to.be.a('string');
    expect(budget.budgetRows).to.be.a('array');
};

const expectScenarioShape = (scenario: Record<string, unknown>) => {
    expect(scenario).to.include.all.keys(
        'id',
        'title',
        'transactors',
        'createdOn',
        'updatedOn',
    );
    expect(scenario.id).to.be.a('string');
    expect(scenario.transactors).to.be.a('array');
};

// ---------------------------------------------------------------------------
// Minimal import payload — mirrors the shape the controller expects.
// IDs are arbitrary but stable so we can assert round-trip equality.
// ---------------------------------------------------------------------------
const IMPORT_PAYLOAD = {
    cards: [
        {
            id: 'aaaaaaaa-0000-0000-0000-000000000001',
            isDefault: true,
            cardName: 'Import Test Card',
            cardType: 'CURRENT',
            bankName: 'Import Bank',
            sortCode: 111111,
            cardNumber: 1111111111111111,
            expires: new Date('2030-01-01').toISOString(),
            description: 'Card created via bulk import',
            icon: '',
            coverImage: '',
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
        },
    ],
    categories: [
        {
            id: 'bbbbbbbb-0000-0000-0000-000000000002',
            label: 'Import Test Category',
            description: 'Created by import',
            colour: '#ff0000',
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            created_on: new Date('2024-01-01').toISOString(),
            updated_on: new Date('2024-01-01').toISOString(),
            matchers: [],
        },
    ],
    transactions: [
        {
            id: 'cccccccc-0000-0000-0000-000000000003',
            userId: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            cardId: 'aaaaaaaa-0000-0000-0000-000000000001',
            categoryId: null,
            description: 'Import test transaction',
            transactionType: 'DEB',
            debit: 42.5,
            credit: 0,
            ballance: 100.0,
            currency: 'GBP',
            date: new Date('2024-06-15').toISOString(),
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
        },
    ],
    budgets: [
        {
            id: 'dddddddd-0000-0000-0000-000000000004',
            userId: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            cardId: 'aaaaaaaa-0000-0000-0000-000000000001',
            name: 'Import Test Budget',
            shortDescription: 'Short desc',
            longDescription: 'Long desc',
            isDefault: false,
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
            budgetRows: [],
        },
    ],
    scenarios: [
        {
            id: 'eeeeeeee-0000-0000-0000-000000000005',
            userId: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            cardId: 'aaaaaaaa-0000-0000-0000-000000000001',
            title: 'Import Test Scenario',
            description: 'Scenario created by import',
            startBallance: 500,
            startDate: new Date('2024-01-01').toISOString(),
            endDate: null,
            createdOn: new Date('2024-01-01').toISOString(),
            updatedOn: new Date('2024-01-01').toISOString(),
            transactors: [],
        },
    ],
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('[UNIT] routes : bulk-data', () => {
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
    // GET /bulk-data/export
    // -------------------------------------------------------------------------
    describe('GET /bulk-data/export', () => {
        it('should return 200 with all top-level collections for the authenticated user', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
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

                    const { payload } = res.body;
                    expect(payload).to.be.a('object');
                    expect(payload).to.have.all.keys(
                        'budgets',
                        'cards',
                        'categories',
                        'scenarios',
                        'transactions',
                    );
                    done();
                });
        });

        it('should return non-empty arrays from seeded data', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .set('Content-Type', 'application/json')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);

                    const { budgets, cards, categories, scenarios, transactions } =
                        res.body.payload;

                    expect(cards).to.be.a('array').with.lengthOf.above(0);
                    expect(categories).to.be.a('array').with.lengthOf.above(0);
                    expect(transactions).to.be.a('array').with.lengthOf.above(0);
                    expect(budgets).to.be.a('array').with.lengthOf.above(0);
                    expect(scenarios).to.be.a('array').with.lengthOf.above(0);
                    done();
                });
        });

        it('exported cards should have the expected shape', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);
                    for (const card of res.body.payload.cards) {
                        expectCardShape(card);
                    }
                    done();
                });
        });

        it('exported categories should have the expected shape and include matchers', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);
                    for (const category of res.body.payload.categories) {
                        expectCategoryShape(category);
                    }
                    done();
                });
        });

        it('exported transactions should have the expected shape', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);
                    for (const tx of res.body.payload.transactions) {
                        expectTransactionShape(tx);
                    }
                    done();
                });
        });

        it('exported budgets should have the expected shape and include budget rows', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);
                    for (const budget of res.body.payload.budgets) {
                        expectBudgetShape(budget);
                    }
                    done();
                });
        });

        it('exported scenarios should have the expected shape and include transactors', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);
                    for (const scenario of res.body.payload.scenarios) {
                        expectScenarioShape(scenario);
                        for (const transactor of scenario.transactors as Record<string, unknown>[]) {
                            expect(transactor).to.include.all.keys(
                                'id',
                                'description',
                                'isAddition',
                                'value',
                                'schedulers',
                            );
                            expect(transactor.schedulers).to.be.a('array');
                        }
                    }
                    done();
                });
        });

        it('transactions should be ordered by date descending', (done) => {
            chai.request(server)
                .get('/bulk-data/export')
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.status.should.eql(200);
                    const { transactions } = res.body.payload;
                    if (transactions.length > 1) {
                        for (let i = 0; i < transactions.length - 1; i++) {
                            const a = new Date(transactions[i].date).getTime();
                            const b = new Date(transactions[i + 1].date).getTime();
                            expect(a).to.be.at.least(
                                b,
                                `Transaction at index ${i} should not be older than index ${i + 1}`,
                            );
                        }
                    }
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // POST /bulk-data/import
    // -------------------------------------------------------------------------
    describe('POST /bulk-data/import', () => {
        it('should return 200 after a successful import', (done) => {
            chai.request(server)
                .post('/bulk-data/import')
                .set('Content-Type', 'application/json')
                .send(IMPORT_PAYLOAD)
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        200,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    done();
                });
        });

        it('should wipe existing seed data before importing', (done) => {
            // First confirm seeded data exists
            chai.request(server)
                .get('/bulk-data/export')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.status.should.eql(200);
                    const seedCardCount = res1.body.payload.cards.length;
                    expect(seedCardCount).to.be.above(0);

                    // Now import — the payload has 1 card
                    chai.request(server)
                        .post('/bulk-data/import')
                        .set('Content-Type', 'application/json')
                        .send(IMPORT_PAYLOAD)
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.status.should.eql(200);

                            // Re-export and check we now have exactly 1 card
                            chai.request(server)
                                .get('/bulk-data/export')
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.status.should.eql(200);
                                    expect(
                                        res3.body.payload.cards,
                                    ).to.have.lengthOf(
                                        IMPORT_PAYLOAD.cards.length,
                                        'Import should replace all existing cards',
                                    );
                                    done();
                                });
                        });
                });
        });

        it('should persist imported cards and make them retrievable via /card', (done) => {
            chai.request(server)
                .post('/bulk-data/import')
                .set('Content-Type', 'application/json')
                .send(IMPORT_PAYLOAD)
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.status.should.eql(200);

                    chai.request(server)
                        .get('/card')
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.status.should.eql(200);
                            const { cards } = res2.body.payload;
                            expect(cards).to.have.lengthOf(
                                IMPORT_PAYLOAD.cards.length,
                            );
                            expect(cards[0].cardName).to.eql(
                                IMPORT_PAYLOAD.cards[0].cardName,
                            );
                            done();
                        });
                });
        });

        it('should persist imported categories and make them retrievable via /category', (done) => {
            chai.request(server)
                .post('/bulk-data/import')
                .set('Content-Type', 'application/json')
                .send(IMPORT_PAYLOAD)
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.status.should.eql(200);

                    chai.request(server)
                        .get('/category')
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.status.should.eql(200);
                            const { categories } = res2.body.payload;
                            expect(categories).to.have.lengthOf(
                                IMPORT_PAYLOAD.categories.length,
                            );
                            expect(categories[0].label).to.eql(
                                IMPORT_PAYLOAD.categories[0].label,
                            );
                            done();
                        });
                });
        });

        it('should persist imported transactions and make them retrievable via /transaction', (done) => {
            chai.request(server)
                .post('/bulk-data/import')
                .set('Content-Type', 'application/json')
                .send(IMPORT_PAYLOAD)
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.status.should.eql(200);

                    chai.request(server)
                        .get('/transaction')
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.status.should.eql(200);
                            const { transactions } = res2.body.payload;
                            expect(transactions).to.have.lengthOf(
                                IMPORT_PAYLOAD.transactions.length,
                            );
                            expect(transactions[0].description).to.eql(
                                IMPORT_PAYLOAD.transactions[0].description,
                            );
                            expect(transactions[0].debit).to.eql(
                                IMPORT_PAYLOAD.transactions[0].debit,
                            );
                            done();
                        });
                });
        });

        it('should perform a clean round-trip: export → import → export matches', (done) => {
            // Step 1: export the seeded data
            chai.request(server)
                .get('/bulk-data/export')
                .end((err1, exportRes1) => {
                    should.not.exist(err1);
                    exportRes1.status.should.eql(200);
                    const originalPayload = exportRes1.body.payload;

                    // Step 2: import it back in (wipes then reloads)
                    chai.request(server)
                        .post('/bulk-data/import')
                        .set('Content-Type', 'application/json')
                        .send(originalPayload)
                        .end((err2, importRes) => {
                            should.not.exist(err2);
                            importRes.status.should.eql(200);

                            // Step 3: re-export and compare counts
                            chai.request(server)
                                .get('/bulk-data/export')
                                .end((err3, exportRes2) => {
                                    should.not.exist(err3);
                                    exportRes2.status.should.eql(200);
                                    const reimportedPayload =
                                        exportRes2.body.payload;

                                    expect(reimportedPayload.cards).to.have.lengthOf(
                                        originalPayload.cards.length,
                                        'Card count should survive round-trip',
                                    );
                                    expect(reimportedPayload.categories).to.have.lengthOf(
                                        originalPayload.categories.length,
                                        'Category count should survive round-trip',
                                    );
                                    expect(reimportedPayload.transactions).to.have.lengthOf(
                                        originalPayload.transactions.length,
                                        'Transaction count should survive round-trip',
                                    );
                                    expect(reimportedPayload.budgets).to.have.lengthOf(
                                        originalPayload.budgets.length,
                                        'Budget count should survive round-trip',
                                    );
                                    expect(reimportedPayload.scenarios).to.have.lengthOf(
                                        originalPayload.scenarios.length,
                                        'Scenario count should survive round-trip',
                                    );
                                    done();
                                });
                        });
                });
        });
    });
});
