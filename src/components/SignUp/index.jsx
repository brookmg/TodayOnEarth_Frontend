/**
 * This component is refactored from the "/signup" page
 */
import React from "react";
import AuthContext from "../../contexts/AuthContext";
import ButtonSignInWith from "../ButtonSignInWith";
import Margin from "../CompoundComponents/Margin";
import AnchorButton from "../AnchorButton";
import ButtonSuccess from "../ButtonSuccess";
import ScreenSizeContext from "../../contexts/ScreenSizeContext";
import { FormInput } from "shards-react";
import { navigate } from "gatsby";
import { signUp } from "../../services/auth";
import { StyledDisplayFlexDiv, StyledFlex1Div } from "./styles";


/**
 * 
 * @param {string} email 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {string} username 
 * @param {string} google_id 
 * @param {string} facebook_id 
 * @param {string} twitter_id 
 * @param {string} github_id 
 * @param {string} linkedin_id 
 * @param {string} telegram_id 
 */
const SignUp = ({ email, first_name, last_name, username, google_id, facebook_id, twitter_id, github_id, linkedin_id, telegram_id }) => {
    const isDesktopOrLaptop = React.useContext(ScreenSizeContext);
    const auth = React.useContext(AuthContext);
    const [user, setUser] = React.useState({ email, first_name, last_name, username, google_id, facebook_id, twitter_id, github_id, linkedin_id, telegram_id });
    const handleUpdate = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        signUp(user)
            .then(() => auth.refreshActiveUser(() => navigate(`/app/profile`)))
            .catch(e => alert(`Error signing up: ${e.message}`));
    };
    const handleSignInClick = () => { navigate(`/app/login`); };
    const authEndpoint = process.env.GATSBY_AUTH_ENDPOINT;
    return (<>
        <h1>Sign up</h1>
        <form method={`post`} onSubmit={event => {
            handleSubmit(event);
        }}>
            <StyledDisplayFlexDiv style={{ flexDirection: isDesktopOrLaptop ? `row` : `column` }}>
                <StyledFlex1Div>
                    <Margin horizontal={`0.5em`} vertical={`0.25em`}>
                        <ButtonSignInWith
                            url={`${authEndpoint}/twitter`}
                            borderColor={`#49a0e9`}

                            backgroundColor={`#fff`}
                            color={`#49a0e9`}
                            imgSrc={`https://abs.twimg.com/favicons/twitter.ico`}
                            value={`Fill with Twitter`} />
                        <ButtonSignInWith
                            url={`${authEndpoint}/facebook`}
                            borderColor={`#3b5998`}
                            backgroundColor={`#3b5998`}
                            color={`#fff`}
                            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/4/4d/F_icon_reversed.svg`}
                            value={`Fill with Facebook`} />
                        <ButtonSignInWith
                            url={`${authEndpoint}/google`}
                            borderColor={`#eee`}
                            backgroundColor={`#fff`}
                            color={`#000`}
                            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/5/53/Google_"G"_Logo.svg`}
                            value={`Fill with Google`} />
                        <ButtonSignInWith
                            url={`${authEndpoint}/github`}
                            borderColor={`#24292e`}
                            backgroundColor={`#fff`}
                            color={`#24292e`}
                            imgSrc={`https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg`}
                            value={`Fill with GitHub`} />
                        <ButtonSignInWith
                            url={`${authEndpoint}/linkedin`}
                            borderColor={`#3577b5`}
                            backgroundColor={`#3577b5`}
                            color={`#fff`}
                            imgSrc={`https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico`}
                            value={`Fill with LinkedIn`} />
                    </Margin>
                </StyledFlex1Div>
                <StyledFlex1Div>
                    <div>
                        Email
                        <FormInput name={`email`} value={user.email} onChange={handleUpdate} />
                    </div>
                    <div>
                        First Name
                        <FormInput name={`first_name`} value={user.first_name} onChange={handleUpdate} />
                    </div>
                    <div>
                        Last Name
                        <FormInput name={`last_name`} value={user.last_name} onChange={handleUpdate} />
                    </div>
                    <div>
                        Username
                        <FormInput name={`username`} value={user.username} onChange={handleUpdate} />
                    </div>
                    <div>
                        Password
                        <FormInput type={`password`} name={`password`} onChange={handleUpdate} />
                    </div>
                </StyledFlex1Div>
            </StyledDisplayFlexDiv>


            <Margin vertical={`1em`} right={`1em`}>
                <ButtonSuccess type={`submit`}>Sign Up</ButtonSuccess><br />
                <AnchorButton url={`/app/login`} onClick={handleSignInClick}>Already have an account? Log in here</AnchorButton>
            </Margin>
        </form>
    </>);
};
export default SignUp