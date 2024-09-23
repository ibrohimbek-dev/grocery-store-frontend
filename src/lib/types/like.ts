import { LikeGroup } from "../enums/like.enum";

export interface Like {
	_id: string;
	likeGroup: LikeGroup;
	userId: string;
	likeRefId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface LikeInput {
	userId: string;
	likeRefId: string;
	likeGroup: LikeGroup;
}
