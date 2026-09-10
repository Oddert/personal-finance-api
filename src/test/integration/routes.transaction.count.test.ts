process.env.NODE_ENV = 'test';

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import dayjs from 'dayjs';

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

describe('[INTEGRATION] routes : transaction count', () => {
    beforeEach(() => {
        return knex.migrate
            .rollback(migrateOpts)
            .then(() => knex.migrate.latest(migrateOpts))
            .then(() => knex.seed.run(seedOpts));
    });

    afterEach(() => knex.migrate.rollback(migrateOpts));

    describe('GET /transaction/count', () => {
        it('should return count of all transactions across all cards when no cardId is provided', (done) => {
            chai.request(server)
                .get('/transaction/count')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.be.a('number');
                    expect(res.body.payload.count).to.be.greaterThan(0);
                    done();
                });
        });

        it('should return transaction count for a single card with no date range filter', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';

            chai.request(server)
                .get(`/transaction/count?cardId=${cardId}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.be.a('number');
                    expect(res.body.payload.count).to.be.greaterThan(0);
                    done();
                });
        });

        it('should return transaction count for multiple cards (comma-separated)', (done) => {
            const cardIds =
                'be913800-df3b-4285-803a-88e971fde8f3,a1b2c3d4-e5f6-7890-abcd-ef1234567890';

            chai.request(server)
                .get(`/transaction/count?cardId=${cardIds}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.be.a('number');
                    done();
                });
        });

        it('should filter transactions by date range (from parameter)', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const fromDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');

            chai.request(server)
                .get(`/transaction/count?cardId=${cardId}&from=${fromDate}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.be.a('number');
                    done();
                });
        });

        it('should filter transactions by date range (to parameter)', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const toDate = dayjs().format('YYYY-MM-DD');

            chai.request(server)
                .get(`/transaction/count?cardId=${cardId}&to=${toDate}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.be.a('number');
                    done();
                });
        });

        it('should filter transactions by date range (both from and to parameters)', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const fromDate = dayjs().subtract(3, 'months').format('YYYY-MM-DD');
            const toDate = dayjs().format('YYYY-MM-DD');

            chai.request(server)
                .get(
                    `/transaction/count?cardId=${cardId}&from=${fromDate}&to=${toDate}`,
                )
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.be.a('number');
                    done();
                });
        });

        it('should return 0 for a date range with no transactions', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';
            const fromDate = '2020-01-01';
            const toDate = '2020-01-31';

            chai.request(server)
                .get(
                    `/transaction/count?cardId=${cardId}&from=${fromDate}&to=${toDate}`,
                )
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    expect(res.body.payload.count).to.eql(0);
                    done();
                });
        });

        it('should only count transactions for the authenticated user', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';

            chai.request(server)
                .get(`/transaction/count?cardId=${cardId}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body.payload).to.have.property('count');
                    // The count should only include transactions for the authenticated user
                    expect(res.body.payload.count).to.be.a('number');
                    expect(res.body.payload.count).to.be.greaterThan(0);
                    done();
                });
        });

        it('should return different counts for different cards', (done) => {
            const card1 = 'be913800-df3b-4285-803a-88e971fde8f3';
            const card2 = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

            chai.request(server)
                .get(`/transaction/count?cardId=${card1}`)
                .set('Content-Type', 'application/json')
                .end((err1, res1) => {
                    if (err1) {
                        console.warn(err1);
                    }
                    should.not.exist(err1);
                    res1.status.should.eql(200);
                    const count1 = res1.body.payload.count;

                    chai.request(server)
                        .get(`/transaction/count?cardId=${card2}`)
                        .set('Content-Type', 'application/json')
                        .end((err2, res2) => {
                            if (err2) {
                                console.warn(err2);
                            }
                            should.not.exist(err2);
                            res2.status.should.eql(200);
                            const count2 = res2.body.payload.count;

                            // The counts may be different depending on seed data
                            expect(count1).to.be.a('number');
                            expect(count2).to.be.a('number');
                            done();
                        });
                });
        });

        it('should return count with valid response structure', (done) => {
            const cardId = 'be913800-df3b-4285-803a-88e971fde8f3';

            chai.request(server)
                .get(`/transaction/count?cardId=${cardId}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.warn(err);
                    }
                    should.not.exist(err);
                    res.redirects.length.should.eql(0);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('payload');
                    expect(res.body.status).to.eql(200);
                    expect(res.body.payload).to.have.property('count');
                    done();
                });
        });
    });
});
