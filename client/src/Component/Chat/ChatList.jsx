import React, { useEffect } from 'react';
import profile_icon from '../../assets/profile_icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import Chat from '../Pages/Chat';
import { fetchContacts } from '../../redux/contacts/contactThunk';
import { fetchAllChats } from '../../redux/chat/chatThunk';

// const conversation = [
//   {
//     message: 'Plan A',
//     time: '03:30 PM',
//     phone: '+917876054918',
//   },
//   {
//     message: 'Stop promotions',
//     time: '12:52 PM',
//     phone: '+917876054920',
//   },
//   {
//     message: 'A',
//     time: '12:33 PM',
//     phone: '+917876054919',
//   },
// ];

function ChatList({ onSelectUser, selectedUser, onSearch }) {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.allChats);



  const chatMap = new Map();

  chats.forEach((chat) => {
    const fromPhone = chat.message.from?.replace(/^\+/, '');
    if (!fromPhone) return;

    const contact = contacts.find((c) => c.phone.replace(/^\+/, '') === fromPhone);
    if (!contact) return;


    const existing = chatMap.get(fromPhone);
    if (!existing || Number(chat.message.timestamp) > Number(existing.message.timestamp)) {
      chatMap.set(fromPhone, {
        ...chat,
        name: contact.name,
        source: contact.source || '',
      });
    }
  });

  const chatData = Array.from(chatMap.values());






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
      const defaultContact = contacts.find(c => c.phone.replace(/^\+/, '') === filteredChatData[0].message.from);
      if (defaultContact) onSelectUser(defaultContact);
    }
  }, [selectedUser, filteredChatData, contacts, onSelectUser]);





  return (
    <ul>
      {filteredChatData.map((chat) => (
        <li
          key={chat.message.from}
          onClick={() => {
            const contact = contacts.find(c =>c.phone === `+${chat.message.from}`);
            if (contact) onSelectUser(contact);
          }}
          className={`cursor-pointer hover:bg-green-50 px-2 ${selectedUser?.phone.replace(/^\+/, '') === chat.message.from ? 'bg-green-100' : ''
            }`}
        >
          <div className='flex justify-between items-stretch h-[70px]'>
            <div className='flex items-center flex-grow'>
              <img src={profile_icon} alt="Profile" />
              <div className='ml-[10px] flex flex-col justify-center border-b border-gray-300 w-full h-full'>
                <h2 className='UserName font-semibold'>{chat.name}</h2>
                {chat.message && (
                  <p className='text-gray-500 font-semibold text-xs'>{chat.message.text?.body}</p>
                )}
              </div>
            </div>
            <div className='border-b border-gray-300 pl-2 whitespace-nowrap flex items-end'>
              <p className='timeStamp text-gray-500 text-xs font-semibold mr-2'>{chat.message?.timestamp &&
                new Date(chat.message?.timestamp * 1000).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ChatList;
