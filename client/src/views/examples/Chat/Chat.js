import { ChatEngine } from "react-chat-engine";
import "./App.css";

import ChatFeed from "./ChatFeed";
import LoginForm from "./LoginForm";
import ChatHeader from "../../../components/Headers/ChatHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const projectID = "59a02fcf-f543-4b5d-a7ff-f517a30cd486";
const privateKey = "ec54213f-ae72-4753-96e1-fe4846179e4e";
const Chat = () => {
  const [value, setValue] = useState("notLogged");
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const myArr = user.name.split(" ");
  const newUserName = myArr.join("_");
  const newPassword = "testing";

  /* const url =
    "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553";
  const fileName = "myFile.jpg";
  const convert = () => {
    fetch(url).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      console.log(blob);
      const file = new File([blob], fileName, { contentType });
      // access file here
    });
  };
  convert();*/
  /*

  const chatLogin = async () => {
    // const imgToSend = urlToObject(user.avatar);
    // console.log(imgToSend);
    try {
      await axios.get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": projectID,
          "User-Name": newUserName,
          "User-Secret": newPassword,
        },
      });
      localStorage.setItem("username", newUserName);
      localStorage.setItem("password", newPassword);
      setValue("chatLogged");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const chatUserCreate = async () => {
    if (value !== "chatLogged")
      await axios.post(
        "https://api.chatengine.io/users/",
        {
          username: newUserName,
          email: user.email,
          first_name: myArr[0],
          last_name: myArr[1],
          secret: newPassword,
          // avatar: imgToSend,
        },
        {
          headers: {
            "PRIVATE-KEY": privateKey,
          },
        }
      );

    localStorage.setItem("username", newUserName);
    localStorage.setItem("password", newPassword);
  };
  chatLogin();
  chatUserCreate();
*/
  if (!localStorage.getItem("username")) return <LoginForm />;
  return (
    <>
      <ChatHeader />
      <ChatEngine
        height="90vh"
        projectID={projectID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </>
  );
};
export default Chat;
