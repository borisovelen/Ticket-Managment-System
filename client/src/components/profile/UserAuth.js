import { useEffect } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { useUserContext } from "../../context/UserContext";
import { useErrorContext } from "../../context/ErrorContext";
import { usersAPI } from "../../api";

function UserAuth() {
    const {setError} = useErrorContext();
    const {setProfile} = useUserContext();
    const {loginStatus, setLoginStatus} = useLoginContext();

    useEffect(() => {
        async function UserData() {
            await usersAPI.checkStatus().then(response => {
                if (response.data.fullname) {
                    setProfile({name:response.data.fullname, role:response.data.role, email:response.data.email, joined_on:response.data.joined_on});
                    setLoginStatus(true);
                } else{
                    setLoginStatus(false);
                    setProfile(null);
                }
            }).catch((err) => {
                setError([err?.response?.data, "error"]);
            });
        }
        UserData();
    }, [loginStatus]);
}
export default UserAuth;