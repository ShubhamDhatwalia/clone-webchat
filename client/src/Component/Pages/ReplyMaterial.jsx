import React from 'react';
import SideBar from '../ReplyMaterial/Sidebar';
import TextReplyMaterial from '../ReplyMaterial/TextReplyMaterial';
import Templates from '../ReplyMaterial/Templates';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatbotReplyMaterial from '../ReplyMaterial/ChatbotReplyMaterial';







function ReplyMaterial({ onClose, Keywords }) {
  const [selected, setSelected] = useState('Text');
  const [selectedReplies, setSelectedReplies] = useState([]);





  const selectedKeyword = useSelector((state) => state.keyword?.keywords?.find(kw => kw?.id === Keywords?.id));

  const selectedKeywordReplies = selectedKeyword?.replyMaterial;

  
  useEffect(() => {
    if (selectedKeywordReplies) {
      setSelectedReplies(selectedKeywordReplies);
    }
  }, [selectedKeywordReplies]);


  console.log(selected);





  return (
    <>
      <div className=' m-4 mt-14 bg-gray-100 rounded-lg flex min-h-[80vh] max-h-[80vh] '>


        <SideBar selected={setSelected} />


        <div className=' flex-grow'>

          {selected === 'Text' && <TextReplyMaterial onClose={onClose} Keywords={Keywords} selectedReplies={selectedReplies} setSelectedReplies={setSelectedReplies} />}

          {selected === 'Templates' && <Templates onClose={onClose} Keywords={Keywords} selectedReplies={selectedReplies} setSelectedReplies={setSelectedReplies} />}


          {selected === 'Chatbots' && <ChatbotReplyMaterial onClose={onClose} Keywords={Keywords} selectedReplies={selectedReplies} setSelectedReplies={setSelectedReplies} />}


        </div>

      </div>
    </>
  )
}

export default ReplyMaterial