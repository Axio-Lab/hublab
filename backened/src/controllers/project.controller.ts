import { Request, Response } from "express";
import underdog from "../configs/underdog.config";

export default class ProjectController {
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

    async createProject(req: Request, res: Response) {
        try {
            console.log('Underdog instance:', underdog);
            console.log('Request body:', req.body);

            const createdProject = await underdog.post('/v2/projects/n', {
                name: req.body.name,
                image: req.body.image
            });

            console.log('Created Project:', createdProject.data);
            return res.status(201).send({
                success: true,
                message: 'Project created successfully',
                createdProject: createdProject.data
            });
        } catch (err: any) {
            console.error('Error creating project:', err);

            if (err.response) {
                console.error('Error response data:', err.response.data);
                console.error('Error response status:', err.response.status);
                console.error('Error response headers:', err.response.headers);
            } else if (err.request) {
                console.error('Error request:', err.request);
            } else {
                console.error('Error message:', err.message);
            }

            return res.status(500).send({
                success: false,
                message: err.message || 'Internal Server Error'
            });
        }
    }

    async createNFT(req: Request, res: Response) {
        const createdNFT = await underdog.post(`/v2/projects/n/${req.params.projectId}/nfts`, {
            name: req.body.name,
            image: req.body.image
        });

        return res.status(201)
            .send({
                success: true,
                message: "NFT created successfully",
                createdNFT
            })
    }
}