
import './App.css'
import Mount from './components/Mount'
import { ChakraProvider } from '@chakra-ui/react'



function App() {




  return (
    <>
      <ChakraProvider>  
        <Mount/>
      </ChakraProvider>  
    </>
  )
}

export default App
