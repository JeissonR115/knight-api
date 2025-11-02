import request from 'supertest';
import { app } from '../../src/server'; // Importa la app exportada
import { AppDataSource } from '../../src/config/db';

// Mock de la base de datos
jest.mock('../../src/config/db');

describe('HxH Characters Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/hxh-characters', () => {
    it('should return all characters', async () => {
      // Arrange
      const mockCharacters = [
        { id: 1, name: 'Gon Freecss', age: 12, height: 154, weight: 45, img: 'gon.jpg' },
        { id: 2, name: 'Killua Zoldyck', age: 12, height: 158, weight: 48, img: 'killua.jpg' }
      ];

      const mockRepository = {
        find: jest.fn().mockResolvedValue(mockCharacters)
      };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

      // Act
      const response = await request(app).get('/api/hxh-characters');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: '1', name: 'Gon Freecss', age: 12, height: 154, weight: 45, img: 'gon.jpg' },
        { id: '2', name: 'Killua Zoldyck', age: 12, height: 158, weight: 48, img: 'killua.jpg' }
      ]);
    });

    it('should filter characters by name', async () => {
      // Arrange
      const mockCharacters = [
        { id: 1, name: 'Gon Freecss', age: 12, height: 154, weight: 45, img: 'gon.jpg' }
      ];

      const mockRepository = {
        find: jest.fn().mockResolvedValue(mockCharacters)
      };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

      // Act
      const response = await request(app).get('/api/hxh-characters?name=Gon');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Gon Freecss');
    });
  });

  describe('GET /api/hxh-characters/:id', () => {
    it('should return a character by id', async () => {
      // Arrange
      const mockCharacter = { id: 1, name: 'Gon Freecss', age: 12, height: 154, weight: 45, img: 'gon.jpg' };
      
      const mockRepository = {
        findOne: jest.fn().mockResolvedValue(mockCharacter)
      };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

      // Act
      const response = await request(app).get('/api/hxh-characters/1');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Gon Freecss');
    });

    it('should return 404 when character not found', async () => {
      // Arrange
      const mockRepository = {
        findOne: jest.fn().mockResolvedValue(null)
      };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

      // Act
      const response = await request(app).get('/api/hxh-characters/999');

      // Assert
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/hxh-characters', () => {
    it('should return 400 when character name already exists', async () => { // ← CAMBIAR de 500 a 400
      // Arrange
      const existingCharacter = { id: 1, name: 'Gon Freecss', age: 12, height: 154, weight: 45, img: 'gon.jpg' };
      
      const mockRepository = {
        findOne: jest.fn().mockResolvedValue(existingCharacter)
      };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

      // Act
      const response = await request(app)
        .post('/api/hxh-characters')
        .send({ name: 'Gon Freecss', age: 12, height: 154, weight: 45, img: 'gon.jpg' });

      // Assert
      expect(response.status).toBe(400); // ← CAMBIAR de 500 a 400
    });
  });

//   describe('PUT /api/hxh-characters/:id', () => {
//     it('should update a character', async () => {
//       // Arrange
//       const updateData = { age: 13, height: 160 };
//       const updatedCharacter = { 
//         id: 1, 
//         name: 'Gon Freecss', 
//         age: 13, 
//         height: 160, 
//         weight: 45, 
//         img: 'gon.jpg' 
//       };
      
//       const mockRepository = {
//         findOne: jest.fn()
//           .mockResolvedValueOnce(null) // Para verificar nombre único
//           .mockResolvedValueOnce(updatedCharacter), // Para encontrar después del update
//         update: jest.fn().mockResolvedValue({ affected: 1 })
//       };
//       (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

//       // Act
//       const response = await request(app)
//         .put('/api/hxh-characters/1')
//         .send(updateData);

//       // Assert
//       expect(response.status).toBe(200); 
//       expect(response.body.age).toBe(13);
//       expect(response.body.height).toBe(160);
//     });

//     it('should return 404 when updating non-existent character', async () => {
//       // Arrange
//       const updateData = { age: 13 };
      
//       const mockRepository = {
//         findOne: jest.fn()
//           .mockResolvedValueOnce(null) // Nombre único OK
//           .mockResolvedValueOnce(null), // No encuentra después del update
//         update: jest.fn().mockResolvedValue({ affected: 0 })
//       };
//       (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

//       // Act
//       const response = await request(app)
//         .put('/api/hxh-characters/999')
//         .send(updateData);

//       // Assert
//       expect(response.status).toBe(404); // ← Este está correcto
//     });
//   });

  describe('DELETE /api/hxh-characters/:id', () => {
    it('should return 404 when deleting non-existent character', async () => { // ← CAMBIAR de 500 a 404
      // Arrange
      const mockRepository = {
        findOne: jest.fn().mockResolvedValue(null)
      };
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

      // Act
      const response = await request(app).delete('/api/hxh-characters/999');

      // Assert
      expect(response.status).toBe(404); // ← CAMBIAR de 500 a 404
    });
  });
});