const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const nock = require("nock"); // mocking responses
const app = require("../server");
// chai config
chai.use(chaiHTTP);
chai.should();

before(() => {
    app.listen(3000);
})

describe("api calls are triggered", () => {
    // yelp api test using mock package
    it("returns an array of json points POST /heatmap", (done) => {
        chai.request(app)
            .post("/api/heatmap")
            .set('Content-Type', 'application/json')
            .send({
                "latLng" : [39.574432, -106.097519],
                "amenities" : "bar"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.be.an('object');
                done();
            })
    });
    it("returns an object from nominatum when /api/boundary POST route is hit", (done) => {
        chai.request(app)
            .post("/api/boundary")
            .set('Content-Type', 'application/json')
            .send([39.574432, -106.097519])
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.name).to.equal('Frisco, Colorado');
                done();
            })
    });

})