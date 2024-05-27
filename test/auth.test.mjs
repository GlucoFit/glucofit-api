import request from 'supertest';
import app from '../src/app.js'; // Adjust the path to your app.js file
import User from '../src/models/User.js';
import { expect } from 'chai';

describe('Authentication', () => {
  before(async () => {
    // Clean up the database before running tests
    await User.destroy({ where: {} });
  });

  describe('Register', () => {
    it('should register a new user', (done) => {
      request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'test@example.com', password: 'password123' })
        .expect(201)
        .then((response) => {
          expect(response.body).to.have.property('id');
          done();
        })
        .catch(done);
    });
  });

  describe('Login', () => {
    it('should login an existing user', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property('id');
          done();
        })
        .catch(done);
    });

    it('should fail to login with incorrect credentials', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' })
        .expect(401)
        .then((response) => {
          // Check if the response status code is 401
          expect(response.status).to.equal(401);
          done();
        })
        .catch(done);
    });
  });
});