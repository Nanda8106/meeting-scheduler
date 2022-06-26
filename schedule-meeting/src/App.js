import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./assets/style/globalStyle";
import ScheduleMeeting from "./components/scheduleMeeting";
import NavBar from "./components/NavBar";
import DisplayResults from "./components/displayResults";


const App = () => {
  const [finalFreeTimes, setFinalFreeTimes] = useState([])
  return (
    <Wrap>
      <GlobalStyle />
      <NavBar />
      <ScheduleMeeting setFinalFreeTimes={setFinalFreeTimes} />
      {finalFreeTimes.length > 0 && (<DisplayResults finalFreeTimes={finalFreeTimes}/>)}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`
export default App;
