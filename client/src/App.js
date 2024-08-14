import React, { useState } from "react";
import styled from "styled-components";

// Styled Components 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 15px;
  width: 80%;
  min-height: 300px;
  max-width: 500px;
  font-size: 1.2rem;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const ResultTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

const ResultText = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

// App 컴포넌트 정의
function App() {
  const [inputText, setInputText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    setAnalysisResult(data.result);
  };

  return (
    <Container>
      <Title>감정 일기 :)</Title>
      <Input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="오늘 하루에 대해 알려주세요!"
      />
      <Button onClick={handleSubmit}>저장하기</Button>

      {analysisResult && (
        <ResultContainer>
          <ResultTitle>나의 감정 키워드:</ResultTitle>
          <ResultText>{analysisResult}</ResultText>
        </ResultContainer>
      )}
    </Container>
  );
}

export default App;
