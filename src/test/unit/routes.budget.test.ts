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

// Stable IDs from seed data
const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
const foodCategoryId = '486f9685-cc57-45f4-a2e7-fc505840de6a';
const supportCategoryId = '4b8614e2-4f8d-41e2-8d62-7163eefa6812';

/** Assert a Budget Row object has the expected shape */
const expectBudgetRowShape = (row: Record<string, unknown>) => {
    expect(row).to.have.all.keys(
        'categoryId',
        'colour',
        'id',
        'label',
        'value',
        'varHighPc',
        'varLowPc',
    );
    expect(row.id).to.be.a('string');
    expect(row.categoryId).to.be.a('string');
    expect(row.colour).to.be.a('string');
    expect(row.label).to.be.a('string');
    expect(row.value).to.be.a('number');
    expect(row.varHighPc).to.be.a('number');
    expect(row.varLowPc).to.be.a('number');
};

/** Assert a Budget object has the expected shape */
const expectBudgetShape = (budget: Record<string, unknown>) => {
    expect(budget).to.have.all.keys(
        'budgetRows',
        'cardId',
        'createdOn',
        'id',
        'isDefault',
        'longDescription',
        'name',
        'shortDescription',
        'updatedOn',
    );
    expect(budget.id).to.be.a('string');
    expect(budget.cardId).to.be.a('string');
    expect(budget.name).to.be.a('string');
    expect(budget.shortDescription).to.be.a('string');
    expect(budget.longDescription).to.be.a('string');
    expect(budget.isDefault).to.be.oneOf([true, false]);
    expect(budget.createdOn).to.be.a('string');
    expect(budget.updatedOn).to.be.a('string');
    expect(budget.budgetRows).to.be.a('array');
    for (const row of budget.budgetRows as Record<string, unknown>[]) {
        expectBudgetRowShape(row);
    }
};

describe('[UNIT] routes : budget', () => {
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
    // GET /budget
    // -------------------------------------------------------------------------
    describe('GET /budget', () => {
        it('should retrieve all budgets with budget rows', (done) => {
            chai.request(server)
                .get('/budget')
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

                    const { budgets } = res.body.payload;
                    expect(budgets).to.be.a('array');
                    expect(budgets).to.have.lengthOf.above(0);
                    for (const budget of budgets) {
                        expectBudgetShape(budget);
                    }
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // GET /budget/:id
    // -------------------------------------------------------------------------
    describe('GET /budget/:id', () => {
        it('should retrieve a single budget by id', (done) => {
            // Fetch all budgets first to get a stable id (seeds use uuid())
            chai.request(server)
                .get('/budget')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    expect(res1.body.payload.budgets).to.have.lengthOf.above(0);
                    const budgetId = res1.body.payload.budgets[0].id as string;

                    chai.request(server)
                        .get(`/budget/${budgetId}`)
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

                            const { budget } = res.body.payload;
                            expectBudgetShape(budget);
                            expect(budget.id).to.eql(budgetId);
                            done();
                        });
                });
        });

        it('should return 404 for an unknown id', (done) => {
            chai.request(server)
                .get('/budget/00000000-0000-0000-0000-000000000000')
                .set('Content-Type', 'application/json')
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
    });

    // -------------------------------------------------------------------------
    // POST /budget
    // -------------------------------------------------------------------------
    describe('POST /budget', () => {
        it('should create a new budget with budget rows', (done) => {
            const budgetName = 'Test Budget';
            const shortDesc = 'Short test description';
            const longDesc = 'Long test description for the new budget';

            chai.request(server)
                .post('/budget')
                .set('Content-Type', 'application/json')
                .send({
                    name: budgetName,
                    shortDescription: shortDesc,
                    longDescription: longDesc,
                    cardId,
                    budgetRows: [
                        {
                            categoryId: foodCategoryId,
                            colour: '#509af3',
                            label: 'Food',
                            value: 400,
                            varLowPc: 5,
                            varHighPc: 10,
                        },
                        {
                            categoryId: supportCategoryId,
                            colour: '#4c9a2a',
                            label: 'Support',
                            value: 50,
                            varLowPc: 5,
                            varHighPc: 5,
                        },
                    ],
                })
                .end((error, res) => {
                    if (error) console.error(error);
                    should.not.exist(error);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(
                        201,
                        `Invalid response: ${JSON.stringify(res.body)}`,
                    );
                    res.type.should.eql('application/json');
                    res.body.status.should.eql(res.status);

                    const { budget } = res.body.payload;
                    expectBudgetShape(budget);
                    expect(budget.id).to.be.a('string');
                    expect(budget.name).to.eql(budgetName);
                    expect(budget.shortDescription).to.eql(shortDesc);
                    expect(budget.longDescription).to.eql(longDesc);
                    expect(budget.cardId).to.eql(cardId);
                    expect(budget.budgetRows).to.have.lengthOf(2);
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /budget/:id
    // -------------------------------------------------------------------------
    describe('PUT /budget/:id', () => {
        it('should update a single budget', (done) => {
            chai.request(server)
                .get('/budget')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    expect(res1.body.payload.budgets).to.have.lengthOf.above(0);
                    const budget = res1.body.payload.budgets[0];
                    const budgetId = budget.id as string;

                    const updatedName = 'Updated Budget Name';
                    const updatedShortDesc = 'Updated short description';
                    const updatedLongDesc = 'Updated long description for test';

                    chai.request(server)
                        .put(`/budget/${budgetId}`)
                        .set('Content-Type', 'application/json')
                        .send({
                            id: budgetId,
                            name: updatedName,
                            shortDescription: updatedShortDesc,
                            longDescription: updatedLongDesc,
                        })
                        .end((error, res) => {
                            if (error) console.error(error);
                            should.not.exist(error);
                            res.redirects.length.should.eql(0);
                            res.status.should.eql(
                                201,
                                `Invalid response: ${JSON.stringify(res.body)}`,
                            );
                            res.type.should.eql('application/json');
                            res.body.status.should.eql(res.status);

                            const updatedBudget = res.body.payload.budget;
                            expectBudgetShape(updatedBudget);
                            expect(updatedBudget.id).to.eql(budgetId);
                            expect(updatedBudget.name).to.eql(updatedName);
                            expect(updatedBudget.shortDescription).to.eql(
                                updatedShortDesc,
                            );
                            expect(updatedBudget.longDescription).to.eql(
                                updatedLongDesc,
                            );
                            done();
                        });
                });
        });
    });

    // -------------------------------------------------------------------------
    // DELETE /budget/:id
    // -------------------------------------------------------------------------
    describe('DELETE /budget/:id', () => {
        it('should delete a budget and return 204', (done) => {
            chai.request(server)
                .get('/budget')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    expect(res1.body.payload.budgets).to.have.lengthOf.above(0);
                    const budgetId = res1.body.payload.budgets[0].id as string;

                    chai.request(server)
                        .delete(`/budget/${budgetId}`)
                        .set('Content-Type', 'application/json')
                        .end((error, res) => {
                            if (error) console.error(error);
                            should.not.exist(error);
                            res.redirects.length.should.eql(0);
                            res.status.should.eql(
                                204,
                                `Invalid response: ${JSON.stringify(res.body)}`,
                            );

                            // Verify the budget is gone
                            chai.request(server)
                                .get(`/budget/${budgetId}`)
                                .set('Content-Type', 'application/json')
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.status.should.eql(
                                        404,
                                        `Invalid response: ${JSON.stringify(res3.body)}`,
                                    );
                                    done();
                                });
                        });
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /budget/preferences/:id
    // -------------------------------------------------------------------------
    describe('PUT /budget/preferences/:id', () => {
        it('should set a budget as the default and return 201', (done) => {
            chai.request(server)
                .get('/budget')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    expect(res1.body.payload.budgets).to.have.lengthOf.above(0);
                    const budgetId = res1.body.payload.budgets[0].id as string;

                    chai.request(server)
                        .put(`/budget/preferences/${budgetId}`)
                        .set('Content-Type', 'application/json')
                        .end((error, res) => {
                            if (error) console.error(error);
                            should.not.exist(error);
                            res.redirects.length.should.eql(0);
                            res.status.should.eql(
                                201,
                                `Invalid response: ${JSON.stringify(res.body)}`,
                            );
                            res.type.should.eql('application/json');
                            done();
                        });
                });
        });
    });

    // -------------------------------------------------------------------------
    // GET /budget/rows
    // -------------------------------------------------------------------------
    describe('GET /budget/rows', () => {
        it('should retrieve all budget rows for the user', (done) => {
            chai.request(server)
                .get('/budget/rows')
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

                    const { budgetRows } = res.body.payload;
                    expect(budgetRows).to.be.a('array');
                    expect(budgetRows).to.have.lengthOf.above(0);
                    for (const row of budgetRows) {
                        // Budget rows endpoint includes a nested budget object
                        expect(row.id).to.be.a('string');
                        expect(row.categoryId).to.be.a('string');
                        expect(row.colour).to.be.a('string');
                        expect(row.label).to.be.a('string');
                        expect(row.value).to.be.a('number');
                    }
                    done();
                });
        });
    });
});
