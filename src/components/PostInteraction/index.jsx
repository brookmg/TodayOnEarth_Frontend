import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import AnchorButton from "../AnchorButton";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { StyledDiv, StyledMarginButtonCustom, StyledNotInterestedIcon, StyledAddAlertIcon } from "./styles";
import { POST_UNLIKED_MUTATION, POST_UNDISLIKED_MUTATION, POST_LIKED_MUTATION, POST_DISLIKED_MUTATION } from "./queries";


const PostInteraction = ({ postid }) => {
    const theme = React.useContext(ThemePalletteContext);

    const undoSuccessful = () => toast(`Undo was successful`, {
        type: toast.TYPE.SUCCESS
    })

    const handleUnLike = (data) => {
        if (data.postUnLiked)
            undoSuccessful()
    }

    const handleUnDisLike = (data) => {
        if (data.postUnDisLiked)
            undoSuccessful()
    }
    const [postUnLiked] = useMutation(POST_UNLIKED_MUTATION, { onCompleted: handleUnLike })
    const [postUnDisLiked] = useMutation(POST_UNDISLIKED_MUTATION, { onCompleted: handleUnDisLike })
    const handleLikeUndo = () => {
        postUnLiked({
            variables: {
                postid
            }
        })
    }

    const handleDisLikeUndo = () => {
        postUnDisLiked({
            variables: {
                postid
            }
        })
    }
    const handleLike = (data) => {
        if (data.postLiked)
            toast(<UndoMessage text={`Added post to your interests`} onUndo={handleLikeUndo} />, {
                hideProgressBar: false,
            })
    }

    const handleDisLike = (data) => {
        if (data.postDisLiked)
            toast(<UndoMessage text={`Will not show you posts like this`} onUndo={handleDisLikeUndo} />, {
                hideProgressBar: false,
            })
    }
    const [postLiked] = useMutation(POST_LIKED_MUTATION, { onCompleted: handleLike })
    const [postDisLiked] = useMutation(POST_DISLIKED_MUTATION, { onCompleted: handleDisLike })

    const UndoMessage = ({ text, onUndo }) =>
        <span>
            {text}
            <div><AnchorButton onClick={onUndo}>Click here to Undo</AnchorButton></div>
        </span>

    const handleNotInterestedClick = () => {
        postDisLiked({
            variables: {
                postid
            }
        })
        console.log(`not interested clicked on:`, postid)

    };
    const handleInterestedClick = () => {
        postLiked({
            variables: {
                postid
            }
        })

        console.log(`interested clicked on:`, postid)
    };
    return (
        <StyledDiv>
            <StyledMarginButtonCustom
                onClick={handleNotInterestedClick}
                borderColor={theme.color_background}
                backgroundColor={theme.color_background}
                color={theme.color_text}>
                <StyledNotInterestedIcon /> Not Interested
            </StyledMarginButtonCustom>
            <StyledMarginButtonCustom
                onClick={handleInterestedClick}
                borderColor={theme.color_background}
                backgroundColor={theme.color_background}
                color={theme.color_text}>
                <StyledAddAlertIcon /> Interested
            </StyledMarginButtonCustom>
        </StyledDiv>
    );
};

export default PostInteraction;