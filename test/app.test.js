const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps endpoint', () => {
  it('should return 200 with json content', () => {
    return supertest(app) 
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/);
  })

  it('should sort via Rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Rating' })
      .expect(200)
      .then(res => {
        let sorted = true;
        let i = 0;
        while(i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          if(appAtIPlus1.Rating > appAtI.Rating) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  })

  it('should sort via App', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .then(res => {
        let sorted = true;
        let i = 0;
        while(i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          if(appAtIPlus1.App.toLowerCase() < appAtI.App.toLowerCase()) {
            console.log(appAtI);
            console.log(appAtIPlus1);
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  })


});