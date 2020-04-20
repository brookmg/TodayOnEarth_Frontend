/**
 * This component is used to reset password
 */
import React from "react";
import ButtonSuccess from "../ButtonSuccess";
import Margin from "../CompoundComponents/Margin";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";
import { Link } from "gatsby";
import { FormInput } from "shards-react";
import { RESET_PASSWORD } from "./queries";
import { isBrowser } from "../../utils";
import { StyledCenteredDiv } from "./styles";


/**
 * @param {string} token Password reset token from email
 */
const PasswordReset = ({ token }) => {
    const [newPassword, setNewPassword] = React.useState(``);
    const [performPasswordReset] = useMutation(RESET_PASSWORD)
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleChangePasswordClicked = () => {
        if (!isBrowser()) return
        performPasswordReset({
            variables: {
                token,
                newPassword
            }
        }).then(() => {
            window.alert(`Password reset successful!`)
            navigate(`/app/login`)
        }).catch(err => {
            window.alert(`Could not change password!\n\n${err.message}`)
        })
    }

    return (
        <div>
            <StyledCenteredDiv>
                <h1>Password Reset</h1>
                <FormInput type={`password`} placeholder={`New Password`} onChange={handleNewPasswordChange} />
                <Margin vertical={`1rem`}>
                    <ButtonSuccess onClick={handleChangePasswordClicked}>Change Password</ButtonSuccess>
                </Margin>
            </StyledCenteredDiv>

            <p><Link to={`/signup`}>Sign Up</Link> | <Link to={`/app/login`}>Log In</Link></p>
        </div>
    )
}

export default PasswordReset