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

const foodCatId = '486f9685-cc57-45f4-a2e7-fc505840de6a';
const supportCatId = '4b8614e2-4f8d-41e2-8d62-7163eefa6812';
const travelCatId = 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3';

describe('[UNIT] routes : category', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => {
        return knex.migrate.rollback(migrateOpts);
    });

    describe('GET /category', () => {
        it('should retrieve all categories', (done) => {
            chai.request(server)
                .get('/category')
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
                    expect(res.body.payload.categories).to.have.lengthOf.above(
                        0,
                    );
                    for (const category of res.body.payload.categories) {
                        expect(category).to.have.all.keys(
                            'colour',
                            'createdOn',
                            'description',
                            'id',
                            'label',
                            'matchers',
                            'updatedOn',
                            'userId',
                        );
                        expect(category.id).to.be.a('string');
                        expect(category.label).to.be.a('string');
                        expect(category.description).to.be.a('string');
                        expect(category.colour).to.be.a('string');
                        expect(category.createdOn).to.be.a('string');
                        expect(category.updatedOn).to.be.a('string');
                        expect(category.userId).to.be.a('string');
                    }
                    done();
                });
        });
    });

    describe('GET /category?includeMatchers=true', () => {
        it('should retrieve all categories with matchers joined', (done) => {
            chai.request(server)
                .get('/category?includeMatchers=true')
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
                    expect(res.body.payload.categories).to.have.lengthOf.above(
                        0,
                    );

                    for (const category of res.body.payload.categories) {
                        expect(category).to.have.all.keys(
                            'colour',
                            'createdOn',
                            'description',
                            'id',
                            'label',
                            'matchers',
                            'updatedOn',
                            'userId',
                        );
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        expect(category.matchers).to.exist;
                        expect(category.matchers).to.be.a('array');
                        for (const matcher of category.matchers) {
                            expect(matcher).to.be.a('object');
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
                    }
                    done();
                });
        });
    });

    describe('GET /category/:id', () => {
        it('should retrieve a single category', (done) => {
            chai.request(server)
                .get(`/category/${foodCatId}`)
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
                    const category = res.body.payload.category;
                    expect(category).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    expect(category.id).to.be.a('string');
                    expect(category.id).to.eql(foodCatId);
                    expect(category.label).to.be.a('string');
                    expect(category.description).to.be.a('string');
                    expect(category.colour).to.be.a('string');
                    expect(category.createdOn).to.be.a('string');
                    expect(category.updatedOn).to.be.a('string');
                    expect(category.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('GET /category/:id?includeMatchers=true', () => {
        it('should retrieve a category with matchers joined', (done) => {
            chai.request(server)
                .get(`/category/${foodCatId}?includeMatchers=true`)
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
                    const category = res.body.payload.category;
                    expect(category).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(category.matchers).to.exist;
                    expect(category.matchers).to.be.a('array');
                    for (const matcher of category.matchers) {
                        expect(matcher).to.be.a('object');
                        expect(matcher).to.have.all.keys([
                            'id',
                            'match',
                            'matchType',
                            'caseSensitive',
                            'createdOn',
                            'updatedOn',
                            'userId',
                        ]);
                        expect(matcher.id).to.be.a('string');
                        expect(matcher.match).to.be.a('string');
                        expect(matcher.matchType).to.be.a('string');
                        expect(matcher.caseSensitive).to.be.oneOf([
                            true,
                            false,
                        ]);
                        expect(matcher.createdOn).to.be.a('string');
                        expect(matcher.updatedOn).to.be.a('string');
                    }
                    done();
                });
        });
    });

    describe('POST /category', () => {
        it('should create a new category', (done) => {
            const date = new Date();
            const catLabel = `TEST_CATEGORY_LABEL_${date.toString()}`;
            const catDesc = `TEST_CATEGORY_DESCRIPTION_${date.toString()}`;
            const catColour = '#ecf0f1';

            chai.request(server)
                .post('/category')
                .set('Content-Type', 'application/json')
                .send({
                    label: catLabel,
                    description: catDesc,
                    colour: catColour,
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
                    const category = res.body.payload.category;
                    expect(category).to.be.a('object');
                    expect(category).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    expect(category.id).to.be.a('string');
                    expect(category.label).to.eql(catLabel);
                    expect(category.description).to.eql(catDesc);
                    expect(category.colour).to.eql(catColour);
                    expect(category.createdOn).to.be.a('string');
                    expect(category.updatedOn).to.be.a('string');
                    expect(category.userId).to.be.a('string');
                    done();
                });
        });

        it('should create a new category with matchers', (done) => {
            const date = new Date();
            const catLabel = `TEST_CATEGORY_LABEL_${date.toString()}`;
            const catDesc = `TEST_CATEGORY_DESCRIPTION_${date.toString()}`;
            const catColour = '#ecf0f1';

            const matchName = `TEST_MATCHER_${date.toString()}`;
            const matchType = 'any';

            chai.request(server)
                .post('/category')
                .set('Content-Type', 'application/json')
                .send({
                    label: catLabel,
                    description: catDesc,
                    colour: catColour,
                    matchers: [
                        {
                            match: matchName,
                            matchType: matchType,
                            caseSensitive: false,
                        },
                    ],
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
                    const category = res.body.payload.category;
                    expect(category).to.be.a('object');
                    expect(category).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    expect(category.id).to.be.a('string');
                    expect(category.label).to.eql(catLabel);
                    expect(category.description).to.eql(catDesc);
                    expect(category.colour).to.eql(catColour);
                    expect(category.createdOn).to.be.a('string');
                    expect(category.updatedOn).to.be.a('string');
                    expect(category.userId).to.be.a('string');

                    for (const matcher of category.matchers) {
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
                        expect(matcher.id).to.be.a('string');
                        expect(matcher.match).to.eql(matchName);
                        expect(matcher.matchType).to.eql(matchType);
                        expect(matcher.caseSensitive).to.be.oneOf([0, false]);
                        expect(matcher.userId).to.be.a('string');
                        expect(matcher.createdOn).to.be.a('string');
                        expect(matcher.updatedOn).to.be.a('string');
                        expect(matcher.updatedOn).to.eql(matcher.createdOn);
                    }
                    done();
                });
        });
    });

    describe('PUT /category/:categoryId', () => {
        it('should update a single category', (done) => {
            const date = new Date();
            const catLabel = `TEST_CATEGORY_LABEL_${date.toString()}`;
            const catDesc = `TEST_CATEGORY_DESCRIPTION_${date.toString()}`;
            const catColour = '#ecf0f1';

            chai.request(server)
                .put(`/category/${supportCatId}`)
                .set('Content-Type', 'application/json')
                .send({
                    label: catLabel,
                    description: catDesc,
                    colour: catColour,
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
                    const category = res.body.payload.category;
                    expect(category).to.be.a('object');
                    expect(category).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    expect(category.id).to.be.a('string');
                    expect(category.id).to.eql(supportCatId);
                    expect(category.label).to.eql(catLabel);
                    expect(category.description).to.eql(catDesc);
                    expect(category.colour).to.eql(catColour);
                    expect(category.createdOn).to.be.a('string');
                    expect(category.updatedOn).to.be.a('string');
                    expect(category.updatedOn).to.not.eql(category.createdOn);
                    expect(category.userId).to.be.a('string');
                    done();
                });
        });
    });

    describe('DELETE /category/:categoryId', () => {
        it('should delete a single category', (done) => {
            chai.request(server)
                .get(`/category/${travelCatId}`)
                .set('Content-Type', 'application/json')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.redirects.length.should.eql(0);
                    res1.status.should.eql(200);
                    res1.type.should.eql('application/json');

                    res1.body.status.should.eql(res1.status);
                    const category = res1.body.payload.category;
                    expect(category).to.be.a('object');
                    expect(category).to.have.all.keys(
                        'colour',
                        'createdOn',
                        'description',
                        'id',
                        'label',
                        'matchers',
                        'updatedOn',
                        'userId',
                    );
                    expect(category.id).to.be.a('string');
                    expect(category.id).to.eql(travelCatId);
                    expect(category.label).to.be.a('string');
                    expect(category.description).to.be.a('string');
                    expect(category.colour).to.be.a('string');
                    expect(category.createdOn).to.be.a('string');
                    expect(category.updatedOn).to.be.a('string');
                    expect(category.userId).to.be.a('string');

                    chai.request(server)
                        .delete(`/category/${travelCatId}`)
                        .set('Content-Type', 'application/json')
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.redirects.length.should.eql(0);
                            res2.status.should.eql(204);

                            chai.request(server)
                                .get(`/category/${travelCatId}`)
                                .set('Content-Type', 'application/json')
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.redirects.length.should.eql(0);
                                    res3.status.should.eql(404);
                                    res3.type.should.eql('application/json');
                                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                    expect(res3.body.payload?.category).to.not
                                        .exist;
                                    done();
                                });
                        });
                });
        });
    });
});
