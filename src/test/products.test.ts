import request from 'supertest'
import app from '../main'
import { databaseService } from '~/services/connectDB.service'

let token = ''

beforeAll(async () => {
  await databaseService.connect()
  const response = await request(app).post('/api/v1/users/login').send({ email: 'admin123@gmail.com', password: 'Admin@123' })
  token = response.body.data.access_token
})

afterAll(async () => {
  await databaseService.disConnect()
})

describe('POST /api/v1/users/login', () => {
  it('It should respond with 200 success for admin login', async () => {
    const response = await request(app).post('/api/v1/users/login').send({ email: 'admin123@gmail.com', password: 'Admin@123' })
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('Login successfully.')
  })
})

describe('POST /api/v1/auth/users', () => {
  it('should create a user and return 200 status code', async () => {
    const response = await request(app).get('/api/v1/auth/users').set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
  })
})
