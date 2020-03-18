import React from "react";
import styled from "styled-components";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import gql from "graphql-tag";
import ButtonCustom from "./ButtonCustom";
import ThemePalletteContext from "../../components/Contexts/ThemePalletteContext";
import AnchorButton from "./AnchorButton";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";


const POST_LIKED_MUTATION = gql`

mutation setPostLiked($postid: Int){
  postLiked(postId:$postid)
}

`;

const POST_UNLIKED_MUTATION = gql`

mutation setUnPostLiked($postid: Int){
  postUnLiked(postId:$postid)
}

`;

const POST_DISLIKED_MUTATION = gql`

mutation setPostDisLiked($postid: Int){
  postDisLiked(postId:$postid)
}

`;

const POST_UNDISLIKED_MUTATION = gql`

mutation setPostUnDisLiked($postid: Int){
  postUnDisLiked(postId:$postid)
}

`;

const StyledMarginButtonCustom = styled(ButtonCustom)`
    overflow: hidden;
    padding: 0;
    margin: 0.5em;
`

const StyledNotInterestedIcon = styled(NotInterestedIcon)`
    width: 28px;
    height: 28px;
`

const StyledAddAlertIcon = styled(AddAlertIcon)`
    width: 28px;
    height: 28px;
`

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

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