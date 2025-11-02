import { config } from 'dotenv';

config({ path: '.env.test' });

jest.mock('../src/config/db', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
    initialize: jest.fn(),
    destroy: jest.fn()
  }
}));

jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
});