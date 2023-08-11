import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
//import './chat.css';
import MainHeader from './MainHeader';
import Sidepannel from './sidepannel';

var stompClient =null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());   
    const [groupChats, setGroupChats] = useState(new Map());   
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [grpFlag,setGrpFlag] =useState(false);
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
        groupId:""
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://192.168.2.40:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        stompClient.subscribe('/user/'+userData.groupId+'/topic', onGroupMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            groupId:userData.groupId,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                if(!groupChats.get(payloadData.groupId) && (userData.groupId === payloadData.groupId)){
                    
                    groupChats.set(payloadData.groupId,[]);
                    setGroupChats(new Map(groupChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }
    const onGroupMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(groupChats.get(payloadData.groupId)){
            groupChats.get(payloadData.groupId).push(payloadData);
            setGroupChats(new Map(groupChats));
        }else{
            let list =[];
            list.push(payloadData);
            groupChats.set(payloadData.groupId,list);
            setGroupChats(new Map(groupChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }
    const sendgroupValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            groupId:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.groupId !== tab){
            groupChats.get(tab).push(chatMessage);
            setGroupChats(new Map(groupChats));
          }
          stompClient.send("/app/topic-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }
    const handlegroupId=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"groupId": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
        <div>
        <MainHeader />
        <Sidepannel />
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{ setGrpFlag(false)
                            setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                     {[...groupChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)
                            setGrpFlag(true)} } className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                     {/* <li onClick={()=>{setTab("GROUP")}} className={`member ${tab==="GROUP" && "active"}`}>GROUP</li> */}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {(tab!=="CHATROOM" && grpFlag) && <div className="chat-content">
                <ul className="chat-messages">
                    {[...groupChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendgroupValue}>send</button>
                </div>
            </div>}
            {(tab!=="CHATROOM" && !grpFlag) && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <input
                id="grp_id"
                placeholder="Enter your group ID"
                name="groupId"
                value={userData.groupId}
                onChange={handlegroupId}
                margin="normal"
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    </div>
    )
}
  
  export default ChatRoom;