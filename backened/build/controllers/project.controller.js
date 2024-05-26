"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const underdog_config_1 = __importDefault(require("../configs/underdog.config"));
class ProjectController {
    // Create project
    // Create an NFT
    // List created projects
    // Claim nft
    // List all NFT 
    // Burn NFT
    // async createProject(req: Request, res: Response) {
    //     try {
    //         console.log( underdog)
    //         const createdProject = await underdog.post(`/v2/projects/n`, {
    //             name: req.body.name,
    //             image: req.body.image
    //         });
    //         console.log(createdProject);
    //         return res.status(201)
    //             .send({
    //                 success: true,
    //                 message: "Project created successfully",
    //                 createdProject
    //             })
    //     } catch (err: any) {
    //         return res.status(500)
    //            .send({
    //             success: false,
    //             message: err
    //            })
    //     }
    // }
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Underdog instance:', underdog_config_1.default);
                console.log('Request body:', req.body);
                const createdProject = yield underdog_config_1.default.post('/v2/projects/n', {
                    name: req.body.name,
                    image: req.body.image
                });
                console.log('Created Project:', createdProject.data);
                return res.status(201).send({
                    success: true,
                    message: 'Project created successfully',
                    createdProject: createdProject.data
                });
            }
            catch (err) {
                console.error('Error creating project:', err);
                if (err.response) {
                    console.error('Error response data:', err.response.data);
                    console.error('Error response status:', err.response.status);
                    console.error('Error response headers:', err.response.headers);
                }
                else if (err.request) {
                    console.error('Error request:', err.request);
                }
                else {
                    console.error('Error message:', err.message);
                }
                return res.status(500).send({
                    success: false,
                    message: err.message || 'Internal Server Error'
                });
            }
        });
    }
    createNFT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNFT = yield underdog_config_1.default.post(`/v2/projects/n/${req.params.projectId}/nfts`, {
                name: req.body.name,
                image: req.body.image
            });
            return res.status(201)
                .send({
                success: true,
                message: "NFT created successfully",
                createdNFT
            });
        });
    }
}
exports.default = ProjectController;
