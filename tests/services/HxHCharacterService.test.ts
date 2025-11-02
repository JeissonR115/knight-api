
import { HxHCharacterController } from '../../src/controllers/HxHCharacterController';
import { HxHCharacterService } from '../../src/services/HxHCharacterService';
import { 
  HxHCharacterResponse, 
  CreateHxHCharacterDTO, 
  UpdateHxHCharacterDTO 
} from '../../src/types/HxHCharacter';

// Mock del servicio
jest.mock('../../src/services/HxHCharacterService');

describe('HxHCharacterController', () => {
  let controller: HxHCharacterController;
  let mockService: jest.Mocked<HxHCharacterService>;

  // Datos de prueba - CORREGIDOS para coincidir con tus interfaces
  const mockCharacter: HxHCharacterResponse = {
    id: '1', // ← CAMBIADO de number a string
    name: 'Gon Freecss',
    age: 12,
    height: 154,
    weight: 45,
    img: 'gon.jpg'
  };

  const mockCharacter2: HxHCharacterResponse = {
    id: '2', // ← CAMBIADO de number a string
    name: 'Killua Zoldyck',
    age: 12,
    height: 158,
    weight: 48,
    img: 'killua.jpg'
  };

  beforeEach(() => {
    // Limpiar todos los mocks
    jest.clearAllMocks();
    
    // Crear instancia del controlador
    controller = new HxHCharacterController();
    
    // Obtener el mock del servicio
    mockService = (controller as any).service as jest.Mocked<HxHCharacterService>;
  });

  describe('searchCharacters', () => {
    it('should return characters with filters', async () => {
      // Arrange
      const filters = { name: 'Gon', age: 12 };
      const expectedCharacters = [mockCharacter];
      mockService.search.mockResolvedValue(expectedCharacters);

      // Act
      const result = await controller.searchCharacters('Gon', 12);

      // Assert
      expect(mockService.search).toHaveBeenCalledWith(filters);
      expect(result).toEqual(expectedCharacters);
    });

    it('should return all characters when no filters provided', async () => {
      // Arrange
      const expectedCharacters = [mockCharacter, mockCharacter2];
      mockService.search.mockResolvedValue(expectedCharacters);

      // Act
      const result = await controller.searchCharacters();

      // Assert
      expect(mockService.search).toHaveBeenCalledWith({});
      expect(result).toEqual(expectedCharacters);
    });

    it('should handle height and weight range filters', async () => {
      // Arrange
      const filters = { 
        minHeight: 150, 
        maxHeight: 160, 
        minWeight: 40, 
        maxWeight: 50 
      };
      const expectedCharacters = [mockCharacter, mockCharacter2];
      mockService.search.mockResolvedValue(expectedCharacters);

      // Act
      const result = await controller.searchCharacters(
        undefined, // name
        undefined, // age
        150,       // minHeight
        160,       // maxHeight
        40,        // minWeight
        50         // maxWeight
      );

      // Assert
      expect(mockService.search).toHaveBeenCalledWith(filters);
      expect(result).toEqual(expectedCharacters);
    });
  });

  describe('getCharacterById', () => {
    it('should return a character by id', async () => {
      // Arrange
      mockService.getById.mockResolvedValue(mockCharacter);

      // Act
      const result = await controller.getCharacterById('1');

      // Assert
      expect(mockService.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCharacter);
    });

    it('should throw error when character not found', async () => {
      // Arrange
      const error = new Error('Character not found');
      mockService.getById.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.getCharacterById('999')).rejects.toThrow('Character not found');
      expect(mockService.getById).toHaveBeenCalledWith(999);
    });
  });

  describe('createCharacter', () => {
    it('should create a new character and return 201 status', async () => {
      // Arrange
      const createData: CreateHxHCharacterDTO = {
        name: 'Leorio Paradinight',
        age: 19,
        height: 193,
        weight: 85,
        img: 'leorio.jpg'
        // REMOVIDO: nenType ya que no existe en tu DTO
      };
      
      const newCharacterResponse: HxHCharacterResponse = {
        ...createData,
        id: '3' // ← ID como string
      };
      
      mockService.create.mockResolvedValue(newCharacterResponse);

      // Act
      const result = await controller.createCharacter(createData);

      // Assert
      expect(mockService.create).toHaveBeenCalledWith(createData);
      expect(result.id).toBe('3');
      expect(result.name).toBe('Leorio Paradinight');
      expect(controller.getStatus()).toBe(201);
    });
  });

  describe('updateCharacter', () => {
    it('should update an existing character', async () => {
      // Arrange
      const updateData: UpdateHxHCharacterDTO = {
        age: 13,
        height: 160
      };
      
      const updatedCharacter = {
        ...mockCharacter,
        ...updateData
      };
      
      mockService.update.mockResolvedValue(updatedCharacter);

      // Act
      const result = await controller.updateCharacter('1', updateData);

      // Assert
      expect(mockService.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedCharacter);
      expect(result.age).toBe(13);
      expect(result.height).toBe(160);
    });
  });

  describe('deleteCharacter', () => {
    it('should delete a character and return success message', async () => {
      // Arrange
      const successMessage = { message: 'Character deleted successfully' };
      mockService.delete.mockResolvedValue(successMessage);

      // Act
      const result = await controller.deleteCharacter('1');

      // Assert
      expect(mockService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(successMessage);
    });
  });

  describe('getCharactersStats', () => {
    it('should return correct statistics for multiple characters', async () => {
      // Arrange
      const characters = [mockCharacter, mockCharacter2];
      mockService.search.mockResolvedValue(characters);

      const expectedStats = {
        total: 2,
        averageAge: 12, // (12 + 12) / 2 = 12
        averageHeight: 156, // (154 + 158) / 2 = 156
        averageWeight: 47 // (45 + 48) / 2 = 46.5 → 47
      };

      // Act
      const result = await controller.getCharactersStats();

      // Assert
      expect(mockService.search).toHaveBeenCalledWith();
      expect(result).toEqual(expectedStats);
    });

    it('should return zeros when no characters exist', async () => {
      // Arrange
      mockService.search.mockResolvedValue([]);

      const expectedStats = {
        total: 0,
        averageAge: 0,
        averageHeight: 0,
        averageWeight: 0
      };

      // Act
      const result = await controller.getCharactersStats();

      // Assert
      expect(result).toEqual(expectedStats);
    });

    it('should handle single character statistics', async () => {
      // Arrange
      mockService.search.mockResolvedValue([mockCharacter]);

      const expectedStats = {
        total: 1,
        averageAge: 12,
        averageHeight: 154,
        averageWeight: 45
      };

      // Act
      const result = await controller.getCharactersStats();

      // Assert
      expect(result).toEqual(expectedStats);
    });
  });
});
