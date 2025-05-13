import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';

import knex from '../../db/knex';

import server from '../../';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const migrateOpts = {
    directory: path.join(__dirname, '../../db/migrations'),
};

const seedOpts = {
    directory: path.join(__dirname, '../../db/seeds'),
};

describe('[INTEGRATION] routes : category', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => knex.migrate.rollback(migrateOpts));

    describe('POST /category', () => {
        it('should create a new category', (done) => {
            const date = new Date();
            const catLabel = `TEST_CATEGORY_LABEL_${date.toString()}`;
            const catDesc = `TEST_CATEGORY_DESCRIPTION_${date.toString()}`;
            const catColour = '#bec3c7';
            let initialLength = 0;

            chai.request(server)
                .get('/category')
                .set('Content-Type', 'application/json')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.redirects.length.should.eql(0);
                    res1.status.should.eql(200);
                    res1.type.should.eql('application/json');
                    expect(res1.body.payload.categories).to.have.lengthOf.above(
                        0,
                    );
                    initialLength = res1.body.payload.categories.length;

                    chai.request(server)
                        .post('/category')
                        .set('Content-Type', 'application/json')
                        .send({
                            label: catLabel,
                            description: catDesc,
                            colour: catColour,
                        })
                        .end((err2, res2) => {
                            should.not.exist(err2);
                            res2.redirects.length.should.eql(0);
                            res2.status.should.eql(201);
                            res2.type.should.eql('application/json');

                            res2.body.status.should.eql(res2.status);
                            expect(res2.body.payload.category).to.be.a(
                                'object',
                            );
                            expect(res2.body.payload.category).to.have.all.keys(
                                'id',
                                'label',
                                'description',
                                'colour',
                                'created_on',
                                'updated_on',
                            );
                            expect(res2.body.payload.category.id).to.be.a(
                                'number',
                            );
                            expect(res2.body.payload.category.label).to.eql(
                                catLabel,
                            );
                            expect(
                                res2.body.payload.category.description,
                            ).to.eql(catDesc);
                            expect(res2.body.payload.category.colour).to.eql(
                                catColour,
                            );
                            expect(
                                res2.body.payload.category.created_on,
                            ).to.be.a('string');
                            expect(
                                res2.body.payload.category.updated_on,
                            ).to.be.a('string');

                            chai.request(server)
                                .get('/category')
                                .set('Content-Type', 'application/json')
                                .send()
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.redirects.length.should.eql(0);
                                    res3.status.should.eql(200);
                                    res3.type.should.eql('application/json');
                                    expect(
                                        res3.body.payload.categories,
                                    ).to.have.lengthOf(initialLength + 1);
                                    done();
                                });
                        });
                });
        });
    });
});
