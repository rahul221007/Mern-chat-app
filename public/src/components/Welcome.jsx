import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await JSON.parse(
                    localStorage.getItem("chat-app-user")
                );
                if (data && data.username) {
                    setUserName(data.username);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle error, e.g., set default username or show an error message to the user
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to start messaging.</h3>
        </Container>
    );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;