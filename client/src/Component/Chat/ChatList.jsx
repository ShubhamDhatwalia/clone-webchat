import React, { useEffect } from 'react';
import profile_icon from '../../assets/profile_icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import Chat from '../Pages/Chat';
import { fetchContacts } from '../../redux/contacts/contactThunk';
import { fetchAllChats } from '../../redux/chat/chatThunk';

const conversation = [
  {
    message: 'Plan A',
    time: '03:30 PM',
    phone: '+917876054918',
  },
  {
    message: 'Stop promotions',
    time: '12:52 PM',
    phone: '+917876054920',
  },
  {
    message: 'A',
    time: '12:33 PM',
    phone: '+917876054919',
  },
];

function ChatList({ onSelectUser, selectedUser, onSearch }) {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.allChats);

  console.log(chats.map(chat => chat.message.from.replace(/^\+/, '')));


  const chatData = chats
    .map((chat) => {
      const contact = contacts.find((c) => c.phone.replace(/^\+/, '') === chat.message.from.phone);
      console.log(contact);
      if (!contact) return null;
      return {
        ...chat,
        name: contact.name,
        source: contact.source || '',
      };
    })
    .filter(Boolean);


  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(fetchContacts())
    }
  }, []);


  useEffect(() => {
    if (chats.length === 0) {
      dispatch(fetchAllChats())
    }
  }, []);




  const filteredChatData = chatData.filter((chat) => {
    const search = onSearch.toLowerCase();
    return (
      chat.name.toLowerCase().includes(search) ||
      chat.phone.includes(onSearch) ||
      chat.source.toLowerCase().includes(search)
    );
  });


  useEffect(() => {
    if (!selectedUser && filteredChatData.length > 0) {
      const defaultContact = contacts.find(c => c.phone === filteredChatData[0].phone);
      if (defaultContact) onSelectUser(defaultContact);
    }
  }, [selectedUser, filteredChatData, contacts, onSelectUser]);





  return (
    <ul>
      {filteredChatData.map((chat) => (
        <li
          key={chat.phone}
          onClick={() => {
            const contact = contacts.find(c => c.phone === chat.phone);
            if (contact) onSelectUser(contact);
          }}
          className={`cursor-pointer hover:bg-green-50 px-2 ${selectedUser?.phone === chat.phone ? 'bg-green-100' : ''
            }`}
        >
          <div className='flex justify-between items-stretch h-[70px]'>
            <div className='flex items-center flex-grow'>
              <img src={profile_icon} alt="Profile" />
              <div className='ml-[10px] flex flex-col justify-center border-b border-gray-300 w-full h-full'>
                <h2 className='UserName font-semibold'>{chat.name}</h2>
                {chat.message && (
                  <p className='text-gray-500 font-semibold text-xs'>{chat.message}</p>
                )}
              </div>
            </div>
            <div className='border-b border-gray-300 pl-2 whitespace-nowrap flex items-end'>
              <p className='timeStamp text-gray-500 text-xs font-semibold mr-2'>{chat.time}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ChatList;
