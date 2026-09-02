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

// Stable IDs from 1743540260_card.js seed
const defaultCardId = 'be913800-df3b-4285-803a-88e971fde8f3';
const secondCardId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

/** Assert a card object has the expected shape */
const expectCardShape = (card: Record<string, unknown>) => {
    expect(card).to.have.all.keys(
        'bankName',
        'cardName',
        'cardNumber',
        'cardType',
        'coverImage',
        'createdOn',
        'description',
        'expires',
        'icon',
        'id',
        'isDefault',
        'sortCode',
        'updatedOn',
    );
    expect(card.id).to.be.a('string');
    expect(card.cardName).to.be.a('string');
    expect(card.bankName).to.be.a('string');
    expect(card.isDefault).to.be.oneOf([true, false]);
    expect(card.createdOn).to.be.a('string');
    expect(card.updatedOn).to.be.a('string');
};

describe('[UNIT] routes : card', () => {
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
    // GET /card
    // -------------------------------------------------------------------------
    describe('GET /card', () => {
        it('should retrieve all cards for the authenticated user', (done) => {
            chai.request(server)
                .get('/card')
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

                    const { cards } = res.body.payload;
                    expect(cards).to.be.a('array');
                    expect(cards).to.have.lengthOf.above(0);
                    for (const card of cards) {
                        expectCardShape(card);
                    }
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // GET /card/:id
    // -------------------------------------------------------------------------
    describe('GET /card/:id', () => {
        it('should retrieve a single card by id', (done) => {
            chai.request(server)
                .get(`/card/${defaultCardId}`)
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

                    const { card } = res.body.payload;
                    expectCardShape(card);
                    expect(card.id).to.eql(defaultCardId);
                    expect(card.isDefault).to.eql(true);
                    done();
                });
        });

        it('should return 404 for an unknown card id', (done) => {
            chai.request(server)
                .get('/card/00000000-0000-0000-0000-000000000000')
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
    // POST /card
    // -------------------------------------------------------------------------
    describe('POST /card', () => {
        it('should create a new card and return it', (done) => {
            const cardName = 'New Test Card';
            const cardType = 'CURRENT';
            const bankName = 'Test Bank';
            const sortCode = 123456;
            const cardNumber = 9876543210123456;
            const expires = '2028-12-01';

            chai.request(server)
                .post('/card')
                .set('Content-Type', 'application/json')
                .send({
                    cardName,
                    cardType,
                    bankName,
                    sortCode,
                    cardNumber,
                    expires,
                    description: 'A test card',
                    isDefault: false,
                })
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

                    const { card } = res.body.payload;
                    expectCardShape(card);
                    expect(card.id).to.be.a('string');
                    expect(card.cardName).to.eql(cardName);
                    expect(card.cardType).to.eql(cardType);
                    expect(card.bankName).to.eql(bankName);
                    expect(card.isDefault).to.eql(false);
                    expect(card.createdOn).to.be.a('string');
                    expect(card.updatedOn).to.be.a('string');
                    done();
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /card/:id
    // -------------------------------------------------------------------------
    describe('PUT /card/:id', () => {
        it('should update a single card and return the updated card', (done) => {
            const updatedCardName = 'Updated Main Account';
            const updatedBankName = 'Updated Bank';
            const updatedDescription = 'Updated description for test';

            chai.request(server)
                .put(`/card/${secondCardId}`)
                .set('Content-Type', 'application/json')
                .send({
                    cardName: updatedCardName,
                    bankName: updatedBankName,
                    description: updatedDescription,
                })
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

                    const { card } = res.body.payload;
                    expectCardShape(card);
                    expect(card.id).to.eql(secondCardId);
                    expect(card.cardName).to.eql(updatedCardName);
                    expect(card.bankName).to.eql(updatedBankName);
                    expect(card.description).to.eql(updatedDescription);
                    done();
                });
        });

        it('should return 404 when updating an unknown card id', (done) => {
            chai.request(server)
                .put('/card/00000000-0000-0000-0000-000000000000')
                .set('Content-Type', 'application/json')
                .send({ cardName: 'Nobody' })
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
    // DELETE /card/:id
    // -------------------------------------------------------------------------
    describe('DELETE /card/:id', () => {
        it('should delete a card and return 204', (done) => {
            // Confirm the card exists first
            chai.request(server)
                .get(`/card/${secondCardId}`)
                .set('Content-Type', 'application/json')
                .end((err1, res1) => {
                    should.not.exist(err1);
                    res1.status.should.eql(
                        200,
                        `Card should exist before delete: ${JSON.stringify(res1.body)}`,
                    );

                    chai.request(server)
                        .delete(`/card/${secondCardId}`)
                        .set('Content-Type', 'application/json')
                        .end((error, res) => {
                            if (error) console.error(error);
                            should.not.exist(error);
                            res.redirects.length.should.eql(0);
                            res.status.should.eql(
                                204,
                                `Invalid response: ${JSON.stringify(res.body)}`,
                            );

                            // Verify the card is gone
                            chai.request(server)
                                .get(`/card/${secondCardId}`)
                                .set('Content-Type', 'application/json')
                                .end((err3, res3) => {
                                    should.not.exist(err3);
                                    res3.status.should.eql(
                                        404,
                                        `Card should not exist after delete: ${JSON.stringify(res3.body)}`,
                                    );
                                    done();
                                });
                        });
                });
        });
    });

    // -------------------------------------------------------------------------
    // PUT /card/preferences/:id
    // -------------------------------------------------------------------------
    describe('PUT /card/preferences/:id', () => {
        it('should set a card as the default and return 201', (done) => {
            chai.request(server)
                .put(`/card/preferences/${secondCardId}`)
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
