/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { KnightController } from './../controllers/knightController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsrController } from './../controllers/UsrController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HxHCharacterController } from './../controllers/HxHCharacterController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "KnightResponse": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "armor": {"dataType":"string","required":true},
            "rank": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Bronze"]},{"dataType":"enum","enums":["Silver"]},{"dataType":"enum","enums":["Gold"]}],"required":true},
            "power": {"dataType":"double","required":true},
            "img": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsrResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "lastClickAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUsrDTO": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "lastClickAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUsrDTO": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HxHCharacterResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "age": {"dataType":"double","required":true},
            "height": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "img": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateHxHCharacterDTO": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "age": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "height": {"dataType":"double","required":true},
            "weight": {"dataType":"double","required":true},
            "img": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateHxHCharacterDTO": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "age": {"dataType":"double"},
            "height": {"dataType":"double"},
            "weight": {"dataType":"double"},
            "img": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsKnightController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/knights',
            ...(fetchMiddlewares<RequestHandler>(KnightController)),
            ...(fetchMiddlewares<RequestHandler>(KnightController.prototype.getAll)),

            async function KnightController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsKnightController_getAll, request, response });

                const controller = new KnightController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsKnightController_searchByName: Record<string, TsoaRoute.ParameterSchema> = {
                name: {"in":"query","name":"name","required":true,"dataType":"string"},
        };
        app.get('/api/knights/search/name',
            ...(fetchMiddlewares<RequestHandler>(KnightController)),
            ...(fetchMiddlewares<RequestHandler>(KnightController.prototype.searchByName)),

            async function KnightController_searchByName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsKnightController_searchByName, request, response });

                const controller = new KnightController();

              await templateService.apiHandler({
                methodName: 'searchByName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsKnightController_search: Record<string, TsoaRoute.ParameterSchema> = {
                name: {"in":"query","name":"name","dataType":"string"},
                armor: {"in":"query","name":"armor","dataType":"string"},
                rank: {"in":"query","name":"rank","dataType":"string"},
        };
        app.get('/api/knights/search',
            ...(fetchMiddlewares<RequestHandler>(KnightController)),
            ...(fetchMiddlewares<RequestHandler>(KnightController.prototype.search)),

            async function KnightController_search(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsKnightController_search, request, response });

                const controller = new KnightController();

              await templateService.apiHandler({
                methodName: 'search',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsrController_searchByName: Record<string, TsoaRoute.ParameterSchema> = {
                name: {"in":"query","name":"name","required":true,"dataType":"string"},
        };
        app.get('/api/usrs',
            ...(fetchMiddlewares<RequestHandler>(UsrController)),
            ...(fetchMiddlewares<RequestHandler>(UsrController.prototype.searchByName)),

            async function UsrController_searchByName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsrController_searchByName, request, response });

                const controller = new UsrController();

              await templateService.apiHandler({
                methodName: 'searchByName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsrController_updateUsr: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"UpdateUsrDTO"},
        };
        app.put('/api/usrs/:id',
            ...(fetchMiddlewares<RequestHandler>(UsrController)),
            ...(fetchMiddlewares<RequestHandler>(UsrController.prototype.updateUsr)),

            async function UsrController_updateUsr(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsrController_updateUsr, request, response });

                const controller = new UsrController();

              await templateService.apiHandler({
                methodName: 'updateUsr',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsrController_createUsr: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"CreateUsrDTO"},
        };
        app.post('/api/usrs',
            ...(fetchMiddlewares<RequestHandler>(UsrController)),
            ...(fetchMiddlewares<RequestHandler>(UsrController.prototype.createUsr)),

            async function UsrController_createUsr(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsrController_createUsr, request, response });

                const controller = new UsrController();

              await templateService.apiHandler({
                methodName: 'createUsr',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHxHCharacterController_searchCharacters: Record<string, TsoaRoute.ParameterSchema> = {
                name: {"in":"query","name":"name","dataType":"string"},
                age: {"in":"query","name":"age","dataType":"double"},
                minHeight: {"in":"query","name":"minHeight","dataType":"double"},
                maxHeight: {"in":"query","name":"maxHeight","dataType":"double"},
                minWeight: {"in":"query","name":"minWeight","dataType":"double"},
                maxWeight: {"in":"query","name":"maxWeight","dataType":"double"},
        };
        app.get('/api/hxh-characters',
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController)),
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController.prototype.searchCharacters)),

            async function HxHCharacterController_searchCharacters(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHxHCharacterController_searchCharacters, request, response });

                const controller = new HxHCharacterController();

              await templateService.apiHandler({
                methodName: 'searchCharacters',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHxHCharacterController_getCharacterById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/hxh-characters/:id',
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController)),
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController.prototype.getCharacterById)),

            async function HxHCharacterController_getCharacterById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHxHCharacterController_getCharacterById, request, response });

                const controller = new HxHCharacterController();

              await templateService.apiHandler({
                methodName: 'getCharacterById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHxHCharacterController_createCharacter: Record<string, TsoaRoute.ParameterSchema> = {
                characterData: {"in":"body","name":"characterData","required":true,"ref":"CreateHxHCharacterDTO"},
        };
        app.post('/api/hxh-characters',
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController)),
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController.prototype.createCharacter)),

            async function HxHCharacterController_createCharacter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHxHCharacterController_createCharacter, request, response });

                const controller = new HxHCharacterController();

              await templateService.apiHandler({
                methodName: 'createCharacter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHxHCharacterController_updateCharacter: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                characterData: {"in":"body","name":"characterData","required":true,"ref":"UpdateHxHCharacterDTO"},
        };
        app.put('/api/hxh-characters/:id',
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController)),
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController.prototype.updateCharacter)),

            async function HxHCharacterController_updateCharacter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHxHCharacterController_updateCharacter, request, response });

                const controller = new HxHCharacterController();

              await templateService.apiHandler({
                methodName: 'updateCharacter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHxHCharacterController_deleteCharacter: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/api/hxh-characters/:id',
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController)),
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController.prototype.deleteCharacter)),

            async function HxHCharacterController_deleteCharacter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHxHCharacterController_deleteCharacter, request, response });

                const controller = new HxHCharacterController();

              await templateService.apiHandler({
                methodName: 'deleteCharacter',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHxHCharacterController_getCharactersStats: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/hxh-characters/stats/summary',
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController)),
            ...(fetchMiddlewares<RequestHandler>(HxHCharacterController.prototype.getCharactersStats)),

            async function HxHCharacterController_getCharactersStats(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHxHCharacterController_getCharactersStats, request, response });

                const controller = new HxHCharacterController();

              await templateService.apiHandler({
                methodName: 'getCharactersStats',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
