import Image from "next/image";
import Chatbot from "@/components/ChatBot";

export default function Home() {
  return (
    <Chatbot/>
  );
}
// Error to be addressed.
//  utterance.onerror = (event) => {
// > 142 |       console.error('Speech synthesis error:', event);