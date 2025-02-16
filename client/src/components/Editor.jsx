// eslint-disable-next-line no-unused-vars
// import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { FaSpellCheck, FaSyncAlt } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import axios from "axios";
// import { Navigate } from "react-router";

const Editor = () => {
  const [inputText, setInputText] = useState();
  const [spellChecked, setSpellChecked] = useState(); // [inputText, setInputText, spellCheck]
  const [grammarChecked, setGrammarChecked] = useState();
  const [selected, setSelected] = useState();
  const [rephrases, setRephrases] = useState([]);
  const [corrected, setCorrected] = useState([]);

  const checkSpelling = async () => {
    if (!inputText) return;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/spell-check",
        {
          sentence: inputText,
        }
      );
      setSpellChecked(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkGrammar = async () => {
    if (!inputText) return;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/grammar-check",
        {
          sentence: inputText,
        }
      );
      setGrammarChecked(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const rephrase = async () => {
    if (!selected) return;
    try {
      const response = await axios.post("http://localhost:8000/api/rephrase", {
        sentence: selected,
      });
      setRephrases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const textSelection = (e) => {
    const selection = e.target.value
      .substring(e.target.selectionStart, e.target.selectionEnd)
      .trim();
    if (selection.length > 0) {
      console.log(selection);
      setSelected(selection);
    }
  };

  const addToResult = (sentence) => {
    console.log(corrected);
    setCorrected([...corrected, sentence]);
  };

  // useEffect(() => {
  //   console.log(inputText);
  // }, [inputText]);

  return (
    <section className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="flex gap-8 flex-wrap max-lg:flex-col">
        {/* <div>Hello</div> */}
        <div className="grow flex flex-col gap-8">
          <FormCard
            inputText={inputText}
            setInputText={setInputText}
            checkSpelling={checkSpelling}
            checkGrammar={checkGrammar}
            textSelection={textSelection}
          />
          {spellChecked && (
            <Cards
              icon={<FaSpellCheck />}
              onClick={() => {
                addToResult(spellChecked);
                setSpellChecked("");
              }}
              title="Spell Checked Text"
              desc={spellChecked}
              labelicon={<TiTick />}
              label={"Accept"}
            />
          )}
          {grammarChecked && (
            <Cards
              icon={<SiGrammarly />}
              onClick={() => {
                addToResult(grammarChecked);
                setGrammarChecked("");
              }}
              title="Grammar Checked Text"
              desc={grammarChecked}
              labelicon={<TiTick />}
              label={"Accept"}
            />
          )}
          {selected && (
            <Cards
              icon={<FaSpellCheck />}
              onClick={rephrase}
              title="Selected Sentence"
              desc={selected}
              labelicon={<FaSyncAlt />}
              label="Rephrase"
            />
          )}
          {rephrases.map((rephrase, index) => (
            <Cards
              key={index}
              icon={<FaSpellCheck />}
              onClick={() => {
                addToResult(rephrase);
                setRephrases((prevRephrases) => {
                  const newRephrases = prevRephrases.filter(
                    (r) => r !== rephrase
                  );
                  // If no more rephrase options, clear the selected sentence.
                  if (newRephrases.length === 0) {
                    setSelected("");
                  }
                  return newRephrases;
                });
              }}
              title={`Rephrase ${index + 1}`}
              desc={rephrase}
              labelicon={<TiTick />}
              label="Accept"
            />
          ))}
        </div>
        <div>
          <ResultCard corrected={corrected} />
        </div>
      </div>
    </section>
  );
};

const FormCard = ({
  inputText,
  setInputText,
  checkSpelling,
  checkGrammar,
  textSelection,
}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full">
      <h2 className="text-3xl text-blue-600 mb-4 font-bold">
        AI Writing Assistant
      </h2>
      <p className="mb-4 text-gray-600">
        Enhance your writing with our advanced AI tools.
      </p>
      <textarea
        rows={10}
        placeholder="Type your text here..."
        className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-2xl p-3"
        value={inputText}
        onSelectCapture={textSelection}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex justify-end mt-4 space-x-4">
        <Button onClick={checkSpelling} icon={<FaSpellCheck />}>
          Check Spelling
        </Button>
        <Button onClick={checkGrammar} icon={<SiGrammarly />}>
          Check Grammar
        </Button>
      </div>
    </div>
  );
};

const Button = ({ onClick, icon, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const ResultCard = ({ corrected }) => {
  useEffect(() => {
    console.log(corrected);
  }, [corrected]);

  const icon = <TiTick />;

  const additional = (
    <p className="italic text-gray-500">No corrected sentences yet.</p>
  );

  const results = corrected.map((sentence, index) => (
    <p key={index} className="text-black text-xl mb-4">
      {sentence}
    </p>
  ));

  return (
    <div className="bg-white p-6 pr-10 shadow-lg rounded-lg sticky top-8">
      <h2 className="text-2xl font-semibold mb-4 text-bold flex items-center">
        {icon && <span className="mr-2 text-green-600">{icon}</span>}{" "}
        {"Corrected Sentences"}
      </h2>
      <p className="text-gray-600 mb-3">
        {"Your approved corrections will appear here."}
      </p>
      {corrected.length === 0 ? additional : results}
    </div>
  );
};

const Cards = ({ icon, onClick, title, desc, label, labelicon }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-bold flex items-center">
        {icon && <span className="mr-2 text-green-600">{icon}</span>} {title}
      </h2>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Button onClick={onClick}>
        {labelicon && <span className="mr-2">{labelicon}</span>}
        {label}
      </Button>
    </div>
  );
};

export default Editor;
