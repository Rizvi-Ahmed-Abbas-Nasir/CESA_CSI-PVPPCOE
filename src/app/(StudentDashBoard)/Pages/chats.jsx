import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Updated import path for Heroicons v2

const peopleList = [
  { id: 1, name: 'Olivia Chu', avatar: '/path/to/avatar1.png' },
  { id: 2, name: 'Nancy Bridges', avatar: '/path/to/avatar2.png' },
  { id: 3, name: 'Dude Guy', avatar: '/path/to/avatar3.png' }
];

const ChatApp = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setMessages([]); // Clear messages when selecting a new person
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || !selectedPerson) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: 'user' },
    ]);
    setInputValue('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Echo: ${inputValue}`, sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-[87vh] gap-3 w-full font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-blue-900 rounded-2xl text-white p-4 shadow-md flex flex-col">
        <h3 className="text-xl font-semibold border-b border-gray-300 pb-3 mb-4">Conversations</h3>
        {peopleList.map((person) => (
          <div
            key={person.id}
            onClick={() => handleSelectPerson(person)}
            className={`flex items-center p-3 rounded-lg transition-transform duration-300 gap-5 cursor-pointer ${
              selectedPerson?.id === person.id ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
          >
            <UserCircleIcon className="w-6 h-6 text-white mr-3" /> {/* Updated icon */}
            {/* <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full mr-3" /> */}
            <span>{person.name}</span>
          </div>
        ))}
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col rounded-2xl bg-gray-100">
        {selectedPerson ? (
          <>
            <div className="flex-1 p-6 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-xs p-3 rounded-lg text-sm transition-transform duration-200 ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-blue-500 text-white'
                      : 'mr-auto bg-gray-300 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex w-full items-center bg-gray-200 p-3 border-t">
                <div className='w-full flex gap-5'>    <div className='w-full'>   <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex w-full p-2 border border-gray-300 rounded-lg mr-3 focus:outline-none focus:border-blue-500"
              /></div>
              <div> <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Send
              </button></div></div>
            
           
             
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-xl text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
