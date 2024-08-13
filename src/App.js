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

      // console.log('Inserted new document with _id:', result);

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
    const result = localStorage.getItem("test_submitted")
    if(result === 'true'){
      setTestCompleted(true);
    }else{
      setIsRegistered(true);
    }
  };

  const handleTestSubmit = async (answers) => {
    const data = {
      name,
      email,
      answers, // This variable is expected to be passed when calling handleTestSubmit
    };

    try {
      await uploadAnswer(data);
      localStorage.setItem("test_submitted",true)
    } catch (error) {
      console.error('Error uploading answers:', error);
      // Implement retry logic if needed
      // For simplicity, let's retry uploading immediately
      await uploadAnswer(data); // Retry uploading
    }
  };
  useEffect(() => {
    // Reset the test_submitted flag to false on component mount
    localStorage.setItem("test_submitted", false);
  }, []);

  useEffect(() => {
    if (isRegistered) {
      console.log('Name:', name);
      console.log('Email:', email);
    }
  }, [name, email, isRegistered]);

  const questions = [
    {
      question: 'What is the syntax to find if all 2 conditions are correct in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to find if any of the 2 conditions are correct in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to select the top 6 records in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to find the sum of all values in a given column in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to delete a full table structure in SQL?',
      type: 'text',
    },
    {
      question: 'What is the syntax to check multiple OR conditions in a short way in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to arrange column values in ascending order in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to select unique values from a column in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to use conditions in a SQL query?',
      type: 'text',
    },
    {
      question: 'What is the syntax to add records to a table in SQL?',
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
