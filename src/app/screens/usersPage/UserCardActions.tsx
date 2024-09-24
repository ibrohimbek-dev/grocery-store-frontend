import React, { useState, useEffect } from "react";
import { User } from "../../../lib/types/user";
import { Badge, Button, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGlobals } from "../../hooks/useGlobal";
import UserService from "../../services/UserService";
import { sweetTopSmallInfoAlert } from "../../../lib/sweetAlert";

interface UserCardActionsProps {
	user: User;
}

const UserCardActions = ({ user }: UserCardActionsProps) => {
	const [heartBadge, setHeartBadge] = useState<number | undefined>(
		user?.userLikes
	);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { authUser, updateNum } = useGlobals();

	const currentUserId = authUser?._id;

	useEffect(() => {
		const userService = new UserService();

		if (currentUserId) {
			userService
				.getMyUserLikes(currentUserId)
				.then((data) => {
					const likedUser = data?.some((like) => {
						return like.likeRefId === user._id;
					});

					setIsLiked(!!likedUser);
				})
				.catch((err) =>
					console.log("error on getMyUserLikes then-catch =>", err)
				);
		}
	}, [currentUserId, updateNum, user]);

	const handleLikeBtn = (userId: string) => {
		const userService = new UserService();

		if (userId.length > 0 && currentUserId) {
			userService
				.likeTargetUser(userId)
				.then((data) => {
					setHeartBadge(data?.userLikes);
					setIsLiked((prev) => !prev);
				})
				.catch((err) => console.log("Error on handleLikeBtn =>", err));
		} else if (!currentUserId) {
			sweetTopSmallInfoAlert("To like this user, please login first!").then();
		}
	};

	return (
		<div className="flex justify-between items-center">
			<span className="text-gray-500">Points: {user.userPoints}</span>
			<Tooltip title="Add to favorites this item">
				<Button
					variant="outlined"
					color="secondary"
					onClick={(e) => {
						handleLikeBtn(user._id);
						e.stopPropagation();
					}}
					aria-label="Add to favorites"
				>
					<Badge badgeContent={heartBadge} color="primary">
						<FavoriteIcon
							sx={{
								color: isLiked ? "secondary.main" : "action.disabled",
								cursor: "pointer",
							}}
						/>
					</Badge>
				</Button>
			</Tooltip>
		</div>
	);
};

export default UserCardActions;
