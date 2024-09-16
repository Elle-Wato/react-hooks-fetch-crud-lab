import React from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  // Map over the answers to create dropdown options
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // Handle the deletion of a question
  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(question)); // Call the onDelete callback after successful deletion
  }

  // Handle changing the correct answer via the dropdown
  function handleDropdownChange(event) {
    const newAnswerIndex = parseInt(event.target.value); // Ensure value is an integer
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newAnswerIndex,
      }),
    })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      console.log('Updated question:', updatedQuestion); // Optional: Handle the updated question if needed
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleDropdownChange} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

