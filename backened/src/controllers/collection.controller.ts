import { Request, Response } from "express";
import underdog from "../configs/underdog.config";

export default class ProjectController {

    async createProject(req: Request, res: Response) {
        try {

            const createdProject = await underdog.post('/v2/projects/n', {
                name: req.body.name,
                image: req.body.image,
                attributes: {
                    userId: req.params.userId
                }
            });

            return res.status(201).send({
                success: true,
                message: 'Project created successfully',
                createdProject: createdProject.data
            });
        } catch (err: any) {

            return res.status(500).send({
                success: false,
                message: err.message || 'Internal Server Error'
            });
        }
    }

    async createNFT(req: Request, res: Response) {
        const id = req.params.projectId;
        const createdNFT = await underdog.post(`/v2/projects/n/${id}/nfts`, {
            name: req.body.name,
            image: req.body.image
        });

        return res.status(201)
            .send({
                success: true,
                message: "NFT created successfully",
                createdNFT: createdNFT.data
            })
    }

    async generateNftClaimLink(req: Request, res: Response) {
        const projectId = req.params.projectId;
        const nftId = req.params.nftId;
        const nftClaimLink = await underdog.get(`/v2/projects/n/${projectId}/nfts/${nftId}/claim`);

        return res.status(201)
            .send({
                success: true,
                message: "NFT claim link generated successfully",
                createdNFT: nftClaimLink.data.link
            })
    }

    async getUserNFTS(req: Request, res: Response) {
        try {
            const createdProjects = await underdog.get(`/v2/projects/n`);

            const projects = createdProjects.data.results
                .filter((project: any) => {
                    return project.attributes && project.attributes.userId === req.params.userId;
                })
                .map((project: any) => ({ id: project.id, name: project.name, image: project.image, mintAddress: project.mintAddress }));

            return res.status(201).send({
                success: true,
                message: "NFTs returned successfully",
                nfts: projects
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: "An error occurred while fetching NFTs",
                error: error.message
            });
        }
    }
}