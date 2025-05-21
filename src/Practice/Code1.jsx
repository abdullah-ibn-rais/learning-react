import { useState } from "react";

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === "dhaka") {
        resolve();
      } else {
        reject(new Error("Good guess but a wrong answer.Try again"));
      }
    }, 3000);
  });
}

export default function Code1() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") return <h1 className="text-5xl">Thats right!</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submit");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err.message);
    }
  };

  function handleTextChange(e) {
    setAnswer(e.target.value);
    setError(null);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>What city is located on two continents?</p>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleTextChange}
          value={answer}
          disabled={status === "submit"}
        ></textarea>
        <br />
        <button disabled={answer === "" || status === "submit"}>Submit</button>
        {status === "submit" && <p>Loading...</p>}

        {error && <p className="Error text-red-500">{error}</p>}
      </form>
    </>
  );
}
