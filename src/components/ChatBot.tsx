// Chatbot.tsx
'use client';

import {Box,Tooltip, Button, TextField, Typography, Paper, Stack, Icon, IconButton, Avatar} from'@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getNoReason } from '@/lib/api';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';

interface Message{
  id: string;
  text: string;
  sender: 'user' | 'bot'
  timeStamp: Date;
}

export default function Chatbot(){
  const[messages,setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to Noracle. Ask me anything... ",
      sender: 'bot',
      timeStamp: new Date(),
    },
  ]);
  const[input,setInput] = useState('');
  const[loading,setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [speechSupported ,setSpeechSupported] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition (Speech-to-Text)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          
          // Show user-friendly error
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please enable microphone permissions.');
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setSpeechSupported(false);
        console.warn('Web Speech API not supported in this browser');
      }

      // Speech Synthesis (Text-to-Speech)
      if (window.speechSynthesis) {
        synthesisRef.current = window.speechSynthesis;
      } else {
        setSpeechSupported(false);
      }
    }
  }, []);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  };
  useEffect(() => {
    scrollToBottom();
  },[messages]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        alert('Could not start speech recognition. Try again.');
      }
    }
  };

  // Text-to-Speech for bot messages
  const speakText = (text: string, messageId: string) => {
    if (!synthesisRef.current) {
      alert('Text-to-speech not supported in your browser');
      return;
    }

    // Stop any ongoing speech
    if (isSpeaking) {
      synthesisRef.current.cancel();
      setIsSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setIsSpeaking(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(null);
    };

    synthesisRef.current.speak(utterance);
  };



  const handleSend = async () =>{
    if (!input.trim() || loading) return;
    const userMessage : Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timeStamp: new Date(),
    };
    setMessages(prev=>[...prev,userMessage]);
    setInput('');
    setLoading(true);
    try{
      const reason = await getNoReason(input);
      const botMessage: Message = {
        id: (Date.now()+1).toString(),
        text: reason,
        sender: 'bot',
        timeStamp: new Date(),
      };
      setTimeout(() => {
        setMessages(prev=>[...prev,botMessage]);
        setLoading(false);
      }, 500);
    }catch(error){
      console.error('API is fried. Why? ' ,error);
      const errorMessage: Message = {
        id: (Date.now()+1).toString(),
        text: 'The API gods have forsaken you!',
        sender: 'bot',
        timeStamp: new Date(),
      };
      setMessages(prev=> [...prev,errorMessage]);
      setLoading(false);
    }
  };
  // return(
  //   <Box className = "min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center p-4">
  //     <Paper elevation={24}
  //     className='w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col overflow-hidden'
  //       sx={{
  //         bgcolor: '#0f0f0f',
  //         borderRadius: 3,
  //         border: '1px solid #450a0a',
  //         backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)',
  //       }}
  //       ><Box sx={{ textAlign: 'center', py: 1, opacity: 0.5 }}>
  //         <Typography variant="caption" sx={{ color: '#666' }}>
  //           🔒 Messages are ephemeral • Refresh to reset
  //         </Typography>
  //       </Box>
  //         <Box className="border-b-2"
  //           sx={{
  //             background: 'linear-gradient(90deg,#1a0a0a 0%, #2d0f0f 100%)',
  //             borderColor: '#ef4444',
  //             p: 2.5,
  //             display: 'flex',
  //             alignItems: 'center',
  //             gap: 2,
  //           }}>
  //         <Avatar
  //         sx={{
  //           bgcolor: '#ef4444',
  //           width: 48,
  //           height: 48,
  //           boxShadow: '0 0 20px rgba(239,69,69,0.4)'
  //         }}> <SmartToyIcon/>
  //         </Avatar>
  //         <Box>
  //           <Typography variant='h6'
  //           sx={{
  //             color: '#ef4444',
  //             fontWeight: 700,
  //             letterSpacing: 0.5,
  //           }}>Noracle</Typography>
  //         </Box>
  //         </Box>
  //         <Box
  //         sx={{
  //           flex:1,
  //           overflow: 'auto',
  //           p: 3,
  //           display: 'flex',
  //           flexDirection: 'column',
  //           gap: 2,
  //           '&::-webkit-scrollbar': {
  //             width: 8,
  //           },
  //           '&::-webkit-scrollbar-track': {
  //             bgcolor: '#1a1a1a',
  //           },
  //           '&::-webkit-scrollbar-thumb': {
  //             bgcolor: '#ef4444',
  //             borderRadius: 4,
  //             '&:hover': {
  //               bgcolor: '#dc2626',
  //             },
  //           },
  //         }}>
  //           {messages.map((msg)=>(
  //             <Box key={msg.id}
  //             sx={{
  //               display: 'flex',
  //               justifyContent: msg.sender == 'user'? 'flex-end':'flex-start',
  //               gap: 1.5,
  //               animation: 'slideIn 0.3s ease-out',
  //               '@keyframes slideIn': {
  //                 from: {
  //                   opacity: 0,
  //                   transform: msg.sender === 'user' ? 'translateX(20px)' :'translate(-20px)',
  //                 },
  //                 to:{
  //                   opacity: 1,
  //                   transform: 'translateX(0)',
  //                 },
  //               },
  //             }}
  //             >
  //           {msg.sender === 'bot' && (
  //             <Avatar sx={{
  //               bgcolor: '#2a0a0a',
  //               border: '2px solid #ef4444',
  //               width: 36,
  //               height: 36,
  //             }}
  //             >
  //               <SmartToyIcon sx={{fontSize: 20, color: '#ed4444'}}/> 
  //             </Avatar>
  //           )}
  //           <Box
  //           sx={{
  //             maxWidth: '70%',
  //             bgcolor:msg.sender === 'user' ? '#ef4444': '#1a1a1a',
  //             color: msg.sender === 'user' ? '#fff' : '#e5e5e5',
  //             borderRadius: 2.5,
  //             p: 2,
  //             boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.4)',
  //             border: msg.sender === 'user' ? 'none' : '1px solid #2a2a2a'
  //           }}
  //           >
  //             <Typography
  //             sx={{
  //               fontSize: '0.95rem',
  //               lineHeight: 1.5,
  //               wordBreak: 'break-word',
  //             }}
  //             >{msg.text}
  //             </Typography>
  //             <Typography
  //             sx={{
  //               fontSize: '0.7rem',
  //               color: msg. sender === 'user' ? 'rgba(255,255,255,0.7)' : '#666',
  //               mt: 0.5,}}
  //             >{msg.timeStamp.toLocaleTimeString([],{hour:'2-digit',minute: '2-digit'})}
  //             </Typography>
  //           </Box>
  //           {msg.sender === 'user' && (
  //             <Avatar
  //             sx={{
  //               bgcolor: '#2a2a2a',
  //               border: '2px solid #525252',
  //               width: 36,
  //               height: 36,
  //             }}
  //             ><PersonIcon sx={{fontSize: 20, color: '#999'}}/>
  //             </Avatar>
  //           )}
  //         </Box>
  //           ))}
  //         {loading && (
  //           <Box sx={{display: 'flex', gap: 1.5}}>
  //             <Avatar 
  //             sx={{
  //               bgcolor: '#2a0a0a',
  //               border: '2px solid #ef4444',
  //               width: 36,
  //               height: 36,
  //             }}>
  //               <SmartToyIcon sx={{fontSize: 20,color:'#ef4444'}}/>
  //             </Avatar>
  //             <Box sx={{
  //               bgcolor: '#1a1a1a',
  //               borderRadius: 2.5,
  //               p: 2,
  //               border: '1px solid #2a2a2a',
  //               display: 'flex',
  //               gap: 1
  //             }}>
  //               {[0,1,2].map((i) =>(
  //                 <Box key={i}
  //                   sx={{
  //                     width: 8,
  //                     height: 8,
  //                     bgcolor: '#ef4444',
  //                     borderRadius: '50%',
  //                     animation: 'bounce 1.4s infinite ease-in-out',
  //                     animationDelay: `${i * 0.16}s`,
  //                     '@keyframes bounce':{
  //                       '0%, 80%, 100%': {transform: 'scale(0)'},
  //                       '40%' : {transform: 'scale(1)'},
  //                     },
  //                   }}/>
  //               ))}
  //             </Box>
  //           </Box>
  //         )}
  //         <div ref={messagesEndRef}/>
  //       </Box>
  //       <Box sx={{
  //     background: 'linear-gradient(180deg,#0f0f0f 0%,#1a0a0a 100%)',
  //     borderTop: '2px soild #2a0a0a',
  //     p: 2.5,
  //   }}>
  //     <Box sx={{display:'flex',gap: 1.5, alignItems: 'flex-end'}}>
  //       <TextField
  //       fullWidth
  //       multiline
  //       maxRows={4}
  //       value={input}
  //       onChange={(e => setInput(e.target.value))}
  //       onKeyDown={(e) => {
  //         if(e.key == 'Enter' && !e.shiftKey){
  //           e.preventDefault();
  //           handleSend();
  //         }
  //       }}
  //       placeholder='Your message here'
  //       disabled = {loading}
  //       sx={{
  //               '& .MuiOutlinedInput-root': {
  //                 color: '#e5e5e5',
  //                 bgcolor: '#1a1a1a',
  //                 borderRadius: 3,
  //                 '& fieldset': {
  //                   borderColor: '#2a2a2a',
  //                   borderWidth: 2,
  //                 },
  //                 '&:hover fieldset': {
  //                   borderColor: '#ef4444',
  //                 },
  //                 '&.Mui-focused fieldset': {
  //                   borderColor: '#ef4444',
  //                   boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
  //                 },
  //                 '&.Mui-disabled': {
  //                   bgcolor: '#0f0f0f',
  //                 },
  //               },
  //               '& .MuiInputBase-input': {
  //                 '&::placeholder': {
  //                   color: '#666',
  //                   opacity: 1,
  //                 },
  //               },
  //             }}
  //             />
  //             <IconButton
  //             onClick={handleSend}
  //             disabled={!input.trim()|| loading}
  //             sx={{
  //               bgcolor: '#ef4444',
  //               color: 'white',
  //               width: 56,
  //               height: 56,
  //               transition: 'all 0.2s ease',
  //               boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  //               '&:hover': {
  //                 bgcolor: '#dc2626',
  //                 transform: 'scale(1.05)',
  //                 boxShadow: '0 6px 20px rgba(239, 68, 68, 0.6)',
  //               },
  //               '&:active': {
  //                 transform: 'scale(0.95)',
  //               },
  //               '&.Mui-disabled': {
  //                 bgcolor: '#2a2a2a',
  //                 color: '#666',
  //                 boxShadow: 'none',
  //               },
  //             }}
  //             >
  //             <SendIcon/>
  //             </IconButton>
  //     </Box>
  //   </Box>
  //     </Paper>
  //   </Box>
  // );
  return (
    <Box className="min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center p-4">
      <Paper
        elevation={24}
        className="w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col overflow-hidden"
        sx={{
          bgcolor: '#0f0f0f',
          borderRadius: 3,
          border: '1px solid #450a0a',
          backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)',
        }}
      >
        {/* Header */}
        <Box
          className="border-b-2"
          sx={{
            background: 'linear-gradient(90deg, #1a0a0a 0%, #2d0f0f 100%)',
            borderColor: '#ef4444',
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#ef4444',
              width: 48,
              height: 48,
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
            }}
          >
            <SmartToyIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: '#ef4444',
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Noracle
            </Typography>
          </Box>
        </Box>

        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: '#1a1a1a',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: '#ef4444',
              borderRadius: 4,
              '&:hover': {
                bgcolor: '#dc2626',
              },
            },
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: 1.5,
                animation: 'slideIn 0.3s ease-out',
                '@keyframes slideIn': {
                  from: {
                    opacity: 0,
                    transform: msg.sender === 'user' ? 'translateX(20px)' : 'translateX(-20px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              {msg.sender === 'bot' && (
                <Avatar
                  sx={{
                    bgcolor: '#2a0a0a',
                    border: '2px solid #ef4444',
                    width: 36,
                    height: 36,
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 20, color: '#ef4444' }} />
                </Avatar>
              )}

              <Box
                sx={{
                  maxWidth: '70%',
                  bgcolor: msg.sender === 'user' ? '#ef4444' : '#1a1a1a',
                  color: msg.sender === 'user' ? '#fff' : '#e5e5e5',
                  borderRadius: 2.5,
                  p: 2,
                  boxShadow: msg.sender === 'user'
                    ? '0 4px 12px rgba(239, 68, 68, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.4)',
                  border: msg.sender === 'bot' ? '1px solid #2a2a2a' : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : '#666',
                    }}
                  >
                    {msg.timeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  
                  {/* Text-to-Speech button for bot messages */}
                  {msg.sender === 'bot' && speechSupported && (
                    <Tooltip title={isSpeaking === msg.id ? "Stop speaking" : "Listen to message"}>
                      <IconButton
                        size="small"
                        onClick={() => speakText(msg.text, msg.id)}
                        sx={{
                          color: isSpeaking === msg.id ? '#ef4444' : '#666',
                          padding: 0.5,
                          transition: 'all 0.2s',
                          '&:hover': {
                            color: '#ef4444',
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                          },
                        }}
                      >
                        {isSpeaking === msg.id ? (
                          <StopIcon sx={{ fontSize: 16 }} />
                        ) : (
                          <VolumeUpIcon sx={{ fontSize: 16 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>

              {msg.sender === 'user' && (
                <Avatar
                  sx={{
                    bgcolor: '#2a2a2a',
                    border: '2px solid #525252',
                    width: 36,
                    height: 36,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 20, color: '#999' }} />
                </Avatar>
              )}
            </Box>
          ))}

          {loading && (
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: '#2a0a0a',
                  border: '2px solid #ef4444',
                  width: 36,
                  height: 36,
                }}
              >
                <SmartToyIcon sx={{ fontSize: 20, color: '#ef4444' }} />
              </Avatar>
              <Box
                sx={{
                  bgcolor: '#1a1a1a',
                  borderRadius: 2.5,
                  p: 2,
                  border: '1px solid #2a2a2a',
                  display: 'flex',
                  gap: 1,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: '#ef4444',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: `${i * 0.16}s`,
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #0f0f0f 0%, #1a0a0a 100%)',
            borderTop: '2px solid #2a0a0a',
            p: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isListening ? "🎤 Listening..." : "Type your message..."}
              disabled={loading || isListening}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e5e5e5',
                  bgcolor: isListening ? '#1a0f0f' : '#1a1a1a',
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: isListening ? '#ef4444' : '#2a2a2a',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: '#ef4444',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ef4444',
                    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#0f0f0f',
                  },
                },
                '& .MuiInputBase-input': {
                  '&::placeholder': {
                    color: isListening ? '#ef4444' : '#666',
                    opacity: 1,
                  },
                },
              }}
            />
            
            {/* Microphone Button */}
            {speechSupported && (
              <Tooltip title={isListening ? "Stop listening" : "Voice input"}>
                <IconButton
                  onClick={toggleListening}
                  disabled={loading}
                  sx={{
                    bgcolor: isListening ? '#ef4444' : '#2a2a2a',
                    color: isListening ? 'white' : '#999',
                    width: 56,
                    height: 56,
                    transition: 'all 0.2s ease',
                    boxShadow: isListening ? '0 0 20px rgba(239, 68, 68, 0.6)' : 'none',
                    '&:hover': {
                      bgcolor: isListening ? '#dc2626' : '#3a3a3a',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#1a1a1a',
                      color: '#555',
                    },
                  }}
                >
                  {isListening ? <MicIcon /> : <MicOffIcon />}
                </IconButton>
              </Tooltip>
            )}

            {/* Send Button */}
            <Tooltip title="Send message">
              <IconButton
                onClick={handleSend}
                disabled={!input.trim() || loading}
                sx={{
                  bgcolor: '#ef4444',
                  color: 'white',
                  width: 56,
                  height: 56,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                  '&:hover': {
                    bgcolor: '#dc2626',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.6)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#2a2a2a',
                    color: '#666',
                    boxShadow: 'none',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}


