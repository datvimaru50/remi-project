const ERROR = require("../types/error");

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Videos', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });

    describe('/GET videos', () => {
        it('should GET less than 100 videos url', (done) => {
            chai.request(server)
                .get('/api/videos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.lte(100);
                    done();
                });
        });
    });

    describe('/POST register', () => {
        it('should add a new user', (done) => {
            let newUser = {
                email: `dat-${Date.now()}@gmail.com`,
                password: '123456789'
            }
            chai.request(server)
                .post('/api/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });

    describe('/POST register', () => {
        it('should return an error that email is already existed', (done) => {
            let newUser = {
                email: 'datvimaru50@gmail.com',
                password: '123456789'
            }
            chai.request(server)
                .post('/api/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('err').eql('auth/register/email_existed');
                    done();
                });
        });
    });

    describe('/POST login', () => {
        it('should login successfully', (done) => {
            let user = {
                email: 'datvimaru50@gmail.com',
                password: '123456789'
            }
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');
                    res.body.should.have.property('session');
                    done();
                });
        });
    });

    describe('/POST login', () => {
        it('should return err that email not existed', (done) => {
            let user = {
                email: 'fakeuser@gmail.com',
                password: '123456789'
            }
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('err').eql(ERROR.EMAIL_NOT_EXISTED);
                    done();
                });
        });
    });

    describe('/POST login', () => {
        it('should return err that password not match', (done) => {
            let user = {
                email: 'datvimaru50@gmail.com',
                password: 'kkk'
            }
            chai.request(server)
                .post('/api/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('err').eql(ERROR.PASSWORD_NOT_MATCHED);
                    done();
                });
        });
    });
});
