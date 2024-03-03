import "./App.css";
import { useState } from "react";
import { ChakraBaseProvider } from "@chakra-ui/react";
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import {theme} from "@chakra-ui/theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadPage from "./components/UploadPage";
import Forms from "./components/Forms";
import Carousels from "./components/Carousels";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Topics from "./components/Topics";
// import { set } from "../../server/app";

function App() {
  const [show, setShow] = useState(true);
  const [sequence, setSequence] = useState(0);
  const [pdfId, setPdfId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);

  return (
    <>
      <ChakraBaseProvider theme={theme}>
        <div>
          <LandingPage handleShow={setShow} show={show} />
          {!show ? (
            <div>
              <Navbar handleSequence={setSequence} handleShow={setShow}/>
              {sequence === 0 && <UploadPage handleSequence={setSequence} handlePdfId={setPdfId} handleTopics={setTopics}/>}
              {sequence === 1 && <Forms handleSequence={setSequence} pdfId={pdfId} setQuestions={setQuestions} topics={topics}/>}
              {sequence === 3 && <Topics handleSequence={setSequence}/>}
              {sequence === 2 && <Carousels handleSequence={setSequence} questions={questions}/>}
            </div>
          ) : (
            <></>
          )}
        </div>
      </ChakraBaseProvider>
    </>
  );
}

export default App;
