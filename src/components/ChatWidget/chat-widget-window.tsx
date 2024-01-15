import React, { useEffect, useRef } from "react"
import { useSession } from "../../hooks/useSession";
import { createMessage, getMessages } from "../../services/api/chat/chatApi";
import { Message } from "../../services/api/chat/dto/message.dto";
import { Button, Form, FormInstance, Input, Row } from "antd";
import io, { Socket } from "socket.io-client";
import { getToken } from '../../utils/tokenCookies';
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface ChatWidgetWindowProps {
    user: any;
}

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
    const values = Form.useWatch([], form);
  
    React.useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
    }, [values]);
  
    return (
      <Button htmlType="submit" disabled={!submittable}>
        SEND
      </Button>
    );
  };

export const ChatWidgetWindow = (props: ChatWidgetWindowProps) => {
    const [visible, setVisible] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const { user } = useSession();
    const [form] = Form.useForm();
    const user2 = props.user;
    const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const [message, setMessage] = React.useState("");
    const [connectedUsers, setConnectedUsers] = React.useState();

    const chatbox = useRef<HTMLInputElement>(null);
    useEffect(() => {
        chatbox.current?.scrollIntoView(false)
    }, [messages]);


    useEffect(() => {
        // connect to WebSocket server
        const token = getToken();
        const newSocket = io("http://localhost:3005", {
            query: {token}
        });
      
        setSocket(newSocket);

        // set up event listeners for incoming messages
        newSocket.on("connect", () => console.log("Connected to WebSocket"));
        newSocket.on("disconnect", () =>
        console.log("Disconnected from WebSocket")
        );
        newSocket.on("message", (data) => {
        fetchData();
        });
        newSocket.on("connected users", (data) => {
            setConnectedUsers(data);
            localStorage.setItem('connectedUsers', JSON.stringify(data));
        })

        newSocket.auth = { id: user?.id, token: token };
        //                                                                                  clean up on unmount
        return () => {
        newSocket.disconnect();
        };
    }, []);

    const handleSend = (e: any) => {
        e.preventDefault();

        setMessage("");
    };

    const fetchData = async () => {
        const response = await getMessages(user?.id, user2?.id);
        setMessages(response);
    }      

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [messages])
    
    const toggleVisible = () => {
        setVisible(!visible);
    }

    const onFinish = async (values: any) => {
        if(values) {
            socket?.emit("message", {
                to: user2.id,
                message: values.message
            });
            form.resetFields();
            form.setFieldsValue({ userId1: user?.id, userId2: user2?.id });
            const fetchData = async () => {
                const response = await getMessages(user?.id, user2?.id);
                setMessages(response);
            }
            fetchData();
        }
    }

    function onKeyDown(e: any) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setMessage(e.target.value);
            handleSend(e);
            onFinish({ userId1: user?.id, userId2: user2?.id, locationId: user?.userModel?.profile?.id, message: e.target.value });
        }
    }

    const userId1Props = {
        hidden: true,
        initialvalue: user?.id
     }

    const userId2Props = {
        hidden: true,
        initialvalue: user2?.id
     }

    const sharedProps = {
        style: { width: '100%' },
        placeholder: 'Write a message',
        onKeyDown: onKeyDown
    }

  return (
    <>
      {visible ? (
        <div className="chat-widget-user-window">
          <div className="chat-window-container" id="scroll-container">
            <ul className="chat-window-list">
              {messages.map((message: Message, index: any) => {
                return message?.userId1 === user2?.id ? (
                  <li className="chat-window-other-message" key={index}>
                    <div className="chat-window-other-avatar-wrapper">
                      <img
                        src={`http://localhost:3000/upload/${user?.userModel?.profile?.profilePhoto}`}
                        height="50"
                      />
                      <div className="other-message-text-wrapper">
                        <span className="other-message-text">
                          {message?.message}
                        </span>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="chat-window-my-message" key={index}>
                    <div className="my-message-text-wrapper">
                      <span className="my-message-text">
                        {message?.message}
                      </span>
                    </div>
                  </li>
                );
              })}
              <div ref={chatbox}></div>
            </ul>
            <div className="comments-input-wrapper">
              <Form
                name={user?.id + user2?.id}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                className="chat-window-input"
              >
                <div className="comments-input">
                  <div className="mr-2">
                    <img
                      className="rounded-circle"
                      width="30"
                      src={
                        "http://localhost:3000/upload/" +
                        user?.userModel?.profile
                          ? user?.userModel?.profile?.profilePhoto
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-2">
                    <Form.Item name="message" rules={[{ required: true }]}>
                      <Input.TextArea {...sharedProps} />
                    </Form.Item>
                    <Form.Item name="userId1">
                      <Input {...userId1Props} />
                    </Form.Item>
                    <Form.Item name="userId2">
                      <Input {...userId2Props} />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-widget-user-window" onClick={toggleVisible}></div>
      )}
    </>
  );
}