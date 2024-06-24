import React, { useEffect, useState } from 'react';
import Registration from './Components/registration';
import TestPage from './Components/testPage';
import ThankYou from './Components/ThankYou';
import * as Realm from 'realm-web';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadAnswer = async (data) => {
    const app = new Realm.App({ id: 'application-0-mbuxbwm' });

    try {
      // Log in anonymously
      const credentials = Realm.Credentials.anonymous();
      const user = await app.logIn(credentials);

      // Access the MongoDB service
      const mongodb = app.currentUser.mongoClient('mongodb-atlas');

      // Access your database and collection
      const testsCollection = mongodb.db('testdb').collection('test_results');

      // Insert one document
      const result = await testsCollection.insertOne(data);

      console.log('Inserted new document with _id:', result);

      // Optionally handle success or navigate to another page here
      setTestCompleted(true);
      setUploadError(null); // Reset upload error state

    } catch (err) {
      console.error('Failed to upload answer:', err);
      setUploadError(err.message); // Set error message for display
    }
  };

  const handleRegistration = (userData) => {
    setName(userData.name);
    setEmail(userData.email);
    setIsRegistered(true);
  };

  const handleTestSubmit = async (answers) => {
    const data = {
      name,
      email,
      answers, // This variable is expected to be passed when calling handleTestSubmit
    };

    try {
      await uploadAnswer(data);
    } catch (error) {
      console.error('Error uploading answers:', error);
      // Implement retry logic if needed
      // For simplicity, let's retry uploading immediately
      await uploadAnswer(data); // Retry uploading
    }
  };

  useEffect(() => {
    if (isRegistered) {
      console.log('Name:', name);
      console.log('Email:', email);
    }
  }, [name, email, isRegistered]);

  const questions = [
    {
      question: 'write a program in C to find the ASCII values of characters K, J, M, and N.',
      type: 'code',
    },
    {
      question: 'write a program in C to swap Two integers: 45 and 70',
      type: 'code',
    },
    {
      question: 'write a program in C to check if a string contains alphabets or not. Given String : "sTr!nG123$peciAL"',
      type: 'code',
    },
    {
      question: 'write a program in C to display fibonacci sequence upto 50 terms',
      type: 'code',
    },
    {
      question: 'write a program in C to find the roots of a quadratic equation',
      type: 'code',
    },
    {
      question: 'write a program in C to add two integers : 101 and 90',
      type: 'code',
    },
    {
      question: 'write a program in C to check if any given year is a leap year or not',
      type: 'code',
    },
    {
      question: 'write a program in C to calculate the sum of all natural numbers upto 100',
      type: 'code',
    },
    {
      question: 'write a program in C to check if the given integer is Positive or Negative',
      type: 'code',
    },
    {
      question: 'write a program in C to Find the Factorial of any integer',
      type: 'code',
    },
    {
      question: 'Explain how the break statement works in programming.  Provide an example where you would use the break statement in a loop.',
      type: 'text',
    },
    {
      question: 'What is the purpose of using loops in programming',
      type: 'text',
    },
    {
      question: 'Describe the role of the continue statement in loops.  Give an example scenario where you would use the continue statement.',
      type: 'text',
    },
    {
      question: 'What is decision-making in programming, and why is it important?',
      type: 'text',
    },
    {
      question: 'Explain the difference between while and for loop in C',
      type: 'text',
    },
  ];

  return (
    <div className="App">
      {!isRegistered && !testCompleted && (
        <Registration onRegistration={handleRegistration} />
      )}
      {isRegistered && !testCompleted && (
        <TestPage questions={questions} onSubmit={handleTestSubmit} />
      )}
      {testCompleted && <ThankYou />}
      {uploadError && (
        <div className="upload-error">
          <p>Failed to submit test:</p>
          <p>{uploadError}</p>
          <button onClick={() => handleTestSubmit([])}>Retry</button> {/* Pass an empty array as answers */}
        </div>
      )}
    </div>
  );
};

export default App;
