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
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProject = yield underdog_config_1.default.post('/v2/projects/n', {
                    name: req.body.name,
                    image: req.body.image,
                    attributes: {
                        userId: req.user._id
                    }
                });
                return res.status(201).send({
                    success: true,
                    message: 'Project created successfully',
                    createdProject: createdProject.data
                });
            }
            catch (err) {
                return res.status(500).send({
                    success: false,
                    message: err.message || 'Internal Server Error'
                });
            }
        });
    }
    createNFT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.projectId;
            const createdNFT = yield underdog_config_1.default.post(`/v2/projects/n/${id}/nfts`, {
                name: req.body.name,
                image: req.body.image
            });
            return res.status(201)
                .send({
                success: true,
                message: "NFT created successfully",
                createdNFT: createdNFT.data
            });
        });
    }
    generateNftClaimLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = req.params.projectId;
            const nftId = req.params.nftId;
            const nftClaimLink = yield underdog_config_1.default.get(`/v2/projects/n/${projectId}/nfts/${nftId}/claim`);
            return res.status(201)
                .send({
                success: true,
                message: "NFT claim link generated successfully",
                createdNFT: nftClaimLink.data.link
            });
        });
    }
    getUserNFTS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProjects = yield underdog_config_1.default.get(`/v2/projects/n`);
                const projects = createdProjects.data.results
                    .filter((project) => {
                    return project.attributes && project.attributes.userId === req.user._id;
                })
                    .map((project) => ({ id: project.id, name: project.name, image: project.image, mintAddress: project.mintAddress }));
                // const nfts: any[] = [];
                // // Using Promise.all to handle asynchronous operations
                // const projectPromises = projectsId.map(async (id: any) => {
                //     const nftArray = await underdog.get(`/v2/projects/n/${id}/nfts`);
                //     const nftss = nftArray.data.results.map((nft: any) => ({ id: nft.id, projectId: nft.projectId, name: nft.name, image: nft.image, mintAddress: nft.mintAddress }));
                //     nfts.push(...nftss);
                // });
                // // Awaiting all promises
                // await Promise.all(projectPromises);
                return res.status(201).send({
                    success: true,
                    message: "NFTs returned successfully",
                    nfts: projects
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: "An error occurred while fetching NFTs",
                    error: error.message
                });
            }
        });
    }
}
exports.default = ProjectController;
