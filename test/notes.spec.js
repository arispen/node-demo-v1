process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const PORT = require('../config').port;
const server = 'http://localhost:' + PORT;

const Note = require('../src/note.model');

describe('Notes', () => {

    before((done) => {
        Note.sync({
            force: false
        }).then(() => {
            done();
        });
    });

    describe('GET /v1/ping', () => {
        it('it should GET {"pong": true} ', (done) => {
            chai.request(server)
                .get('/v1/ping')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.pong.should.be.eql(true);
                    done();
                });
        });
    });

    describe('GET /v1/notes', () => {
        it('it should GET all the notes', (done) => {
            chai.request(server)
                .get('/v1/notes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.count.should.be.a('number');
                    res.body.results.should.be.a('array');
                    done();
                });
        });
    });

    describe('POST /v1/notes', () => {
        it('it should POST a note', (done) => {
            const note = {
                title: 'my new note',
                message: 'it should remind me something'
            }
            chai.request(server)
                .post('/v1/notes')
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('title');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    describe('GET /v1/notes/:id', () => {
        it('it should GET a note by the given id', (done) => {
            Note.build({
                title: 'test title',
                message: 'test message'
            }).save().then(note => {
                chai.request(server)
                    .get('/v1/notes/' + note.id)
                    .send() //.send(note)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql('test title');
                        res.body.should.have.property('message').eql('test message');
                        res.body.should.have.property('id').eql(note.id);
                        done();
                    });
            });

        });
    });

    describe('PUT /v1/notes/:id', () => {
        it('it should UPDATE a note with a given id', (done) => {
            Note.build({
                title: 'note with a mitsake in title',
                message: 'but with a good message'
            }).save().then(note => {
                chai.request(server)
                    .put('/v1/notes/' + note.id)
                    .send({
                        title: 'a better title'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql('a better title');
                        done();
                    });
            });
        });
    });

    describe('DELETE /v1/notes/:id note', () => {
        it('it should DELETE a note with a given id', (done) => {
            Note.build({
                title: 'this message shouldn\'t be here',
                message: 'so we better delete it'
            }).save().then(note => {
                chai.request(server)
                    .delete('/v1/notes/' + note.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done();
                    });
            });
        });
    });
});

//TODO: chai-as-promised