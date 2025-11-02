import { HxHCharacterController } from '../../src/controllers/HxHCharacterController';
import { HxHCharacterService } from '../../src/services/HxHCharacterService';
import { 
  HxHCharacterResponse, 
  CreateHxHCharacterDTO, 
  UpdateHxHCharacterDTO 
} from '../../src/types/HxHCharacter';
import { AppError } from '../../src/middleware/errorHandler'; // ← NUEVO IMPORT

// Mock del servicio
jest.mock('../../src/services/HxHCharacterService');

describe('HxHCharacterController', () => {
  let controller: HxHCharacterController;
  let mockService: jest.Mocked<HxHCharacterService>;

  // Datos de prueba
  const mockCharacter: HxHCharacterResponse = {
    id: '1',
    name: 'Gon Freecss',
    age: 12,
    height: 154,
    weight: 45,
    img: 'gon.jpg'
  };

  const mockCharacter2: HxHCharacterResponse = {
    id: '2',
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

    it('should throw AppError with 404 when character not found', async () => { // ← ACTUALIZADO
      // Arrange
      const error = new AppError('Personaje con ID 999 no encontrado', 404); // ← USA AppError
      mockService.getById.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.getCharacterById('999')).rejects.toThrow('Personaje con ID 999 no encontrado');
      await expect(controller.getCharacterById('999')).rejects.toBeInstanceOf(AppError); // ← VERIFICA QUE SEA AppError
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
      };
      
      const newCharacterResponse: HxHCharacterResponse = {
        ...createData,
        id: '3'
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

    it('should throw AppError with 400 when character name already exists', async () => { // ← NUEVO TEST
      // Arrange
      const createData: CreateHxHCharacterDTO = {
        name: 'Gon Freecss',
        age: 12,
        height: 154,
        weight: 45,
        img: 'gon.jpg'
      };
      
      const error = new AppError('Ya existe un personaje con el nombre: Gon Freecss', 400);
      mockService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.createCharacter(createData)).rejects.toThrow('Ya existe un personaje con el nombre: Gon Freecss');
      await expect(controller.createCharacter(createData)).rejects.toBeInstanceOf(AppError);
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

    it('should throw AppError with 404 when updating non-existent character', async () => { // ← NUEVO TEST
      // Arrange
      const updateData: UpdateHxHCharacterDTO = { age: 13 };
      const error = new AppError('Personaje con ID 999 no encontrado', 404);
      mockService.update.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.updateCharacter('999', updateData)).rejects.toThrow('Personaje con ID 999 no encontrado');
      await expect(controller.updateCharacter('999', updateData)).rejects.toBeInstanceOf(AppError);
    });

    it('should throw AppError with 400 when updating with existing name', async () => { // ← NUEVO TEST
      // Arrange
      const updateData: UpdateHxHCharacterDTO = { name: 'Killua Zoldyck' };
      const error = new AppError('Ya existe otro personaje con el nombre: Killua Zoldyck', 400);
      mockService.update.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.updateCharacter('1', updateData)).rejects.toThrow('Ya existe otro personaje con el nombre: Killua Zoldyck');
      await expect(controller.updateCharacter('1', updateData)).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('deleteCharacter', () => {
    it('should delete a character and return success message', async () => {
      // Arrange
      const successMessage = { message: 'Personaje "Gon Freecss" eliminado correctamente' }; // ← ACTUALIZADO mensaje
      mockService.delete.mockResolvedValue(successMessage);

      // Act
      const result = await controller.deleteCharacter('1');

      // Assert
      expect(mockService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(successMessage);
    });

    it('should throw AppError with 404 when deleting non-existent character', async () => { // ← NUEVO TEST
      // Arrange
      const error = new AppError('Personaje con ID 999 no encontrado', 404);
      mockService.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.deleteCharacter('999')).rejects.toThrow('Personaje con ID 999 no encontrado');
      await expect(controller.deleteCharacter('999')).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('getCharactersStats', () => {
    it('should return correct statistics for multiple characters', async () => {
      // Arrange
      const characters = [mockCharacter, mockCharacter2];
      mockService.search.mockResolvedValue(characters);

      const expectedStats = {
        total: 2,
        averageAge: 12,
        averageHeight: 156,
        averageWeight: 47
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