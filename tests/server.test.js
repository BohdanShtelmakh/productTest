require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const { app, migrate } = require('../app');

describe('HTTP Server', () => {
  beforeAll(async () => {
    await migrate();
  })

  let token;

  const rightUserData = {
    username: 'user',
    email: 'bb@bb.com',
    password: 'Hello123'
  };
  const failUserData = {
    username: 'user',
    email: 'email',
    password: 'pass'
  }

  const testProductData = {
    name: 'Test Product',
    description: 'This is a test product',
    category: 'Test Category',
    price: 10.99
  };

  let createdProduct;

  test('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.body.success).toBe(true);
  })

  test('POST /user/register (FAIL)', async () => {
    const response = await request(app).post('/user/register').send(failUserData);
    expect(response.body.success).toBe(false);
  })

  test('POST /user/register (SUCCESS)', async () => {
    const response = await request(app).post('/user/register').send(rightUserData);
    expect(response.body.success).toBe(true);
  })

  test('POST /user/login (FAIL)', async () => {
    const response = await request(app).post('/user/login').send({ email: failUserData.email, password: failUserData.password });
    expect(response.body.success).toBe(false);
  })

  test('POST /user/login (SUCCESS)', async () => {
    const response = await request(app).post('/user/login').send({ email: rightUserData.email, password: rightUserData.password });
    token = response.body.token;
    expect(response.body.success).toBe(true);
  })

  test('POST /product (SUCCESS)', async () => {
    const response = await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(testProductData);

    createdProduct = response.body.product;

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.product.name).toBe(testProductData.name);
  });

  test('POST /product (FAIL)', async () => {
    const response = await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(testProductData);

    expect(response.body.success).toBe(false);
  });

  test('PUT /product/:id', async () => {
    testProductData.name = '123';
    const response = await request(app)
      .put(`/product/${createdProduct.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testProductData);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('GET /product/all', async () => {
    const response = await request(app)
      .get('/product/all')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  })

  test('GET /product/:id', async () => {
    const response = await request(app)
      .get(`/product/${createdProduct.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  })

  test('DELETE /product/:id', async () => {
    const response = await request(app)
      .delete(`/product/${createdProduct.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  })
})