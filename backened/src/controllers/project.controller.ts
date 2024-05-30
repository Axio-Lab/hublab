import { Request, Response } from "express";
import underdog from "../configs/underdog.config";
import AuthRequest from "../interfaces/auth.interface";

export default class ProjectController {

    async createProject(req: Request, res: Response) {
        try {

            const createdProject = await underdog.post('/v2/projects/n', {
                name: req.body.name,
                image: req.body.image,
                attributes: {
                    userId: (req as AuthRequest).user._id
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

    async getUserNFTS(req: Request, res: Response) {
        try {
            const id = req.params.projectId;
            const createdProjects = await underdog.get(`/v2/projects/n`);

            const projectsId = createdProjects.data.results
                .filter((project: any) => {
                    return project.attributes && project.attributes.userId === (req as AuthRequest).user._id;
                })
                .map((project: any) => project.id);

            const nfts: any[] = [];

            // Using Promise.all to handle asynchronous operations
            const projectPromises = projectsId.map(async (id: any) => {
                const nftArray = await underdog.get(`/v2/projects/n/${id}/nfts`);
                const nftss = nftArray.data.results.map((nft: any) => ({ id: nft.id, name: nft.name }));
                nfts.push(...nftss);
            });

            // Awaiting all promises
            await Promise.all(projectPromises);

            return res.status(201).send({
                success: true,
                message: "NFTs returned successfully",
                nfts
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