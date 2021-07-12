import { ChatEngine } from "react-chat-engine";
import "./App.css";

import ChatFeed from "./ChatFeed";
import LoginForm from "./LoginForm";
import ChatHeader from "../../../components/Headers/ChatHeader";

const projectID = "59a02fcf-f543-4b5d-a7ff-f517a30cd486";
const Chat = () => {
  if (!localStorage.getItem("username")) return <LoginForm />;
  return (
    <>
      <ChatHeader />
      <ChatEngine
        height="100vh"
        projectID={projectID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </>
  );
};
export default Chat;
