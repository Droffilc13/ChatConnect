import UserListItem from "./misc/UserListItem";
import { ChatContext } from "../context/ChatProvider";
import { useContext } from "react";

const UserList = () => {
    const { user } = useContext(ChatContext)
    return (
        <>
            <UserListItem user={user} handleFunction={() => console.log("hi")} />
        </>
    );
}

export default UserList