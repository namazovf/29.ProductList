import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Link, LinkBox, useSafeLayoutEffect } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
  

function Mount() {

    const [data, setData] = useState([])

    const [name, setName] = useState("")
    const [discontinued, setDiscontinued] = useState("")
    const [unitsInStock, setUnitsInStock] = useState("")


    // Edit usesstate
    const [elem, setElem] = useState({})
    const [elemName, setElemName] = useState("")
    const [elemDiscontinued, setElemDiscontinued] = useState("")
    const [elemUnitsInStock, setElemUnitsInStock] = useState("")    


    useEffect(() => {
      
    axios("https://northwind.vercel.app/api/products/").then(res=>{
        console.log(res.data)
        setData(res.data)
    })
    
      
    }, [])
    


    

  return (
    <>
        <div><h1>Edit</h1></div>

        <FormControl onSubmit={(e)=>{
    e.preventDefault()
}}>
  <FormLabel>Name</FormLabel>
  <Input type='text' value={elemName.name} onChange={(e)=>{
    
    setElemName(e.target.value)
  }} />

  <FormLabel>Discontinued</FormLabel>
  <Input type='text' value={elemDiscontinued.discontinued} onChange={(e)=>{
    
  }} />

  <FormLabel>UnitsInStock</FormLabel>
  <Input type='number   ' value={elemUnitsInStock.unitsInStock} onChange={(e)=>{
    
    setElemUnitsInStock(e.target.value)
  }} />

  <Button colorScheme='green' type='submit' onClick ={()=>{
    let object = {
        name:elemName,
        discontinued:elemDiscontinued,
        unitsInStock:elemUnitsInStock,
    };
    axios.patch("https://northwind.vercel.app/api/products/"+elem.id , object).then(res=>{

        // let arr = [...data];
        // let findElem=arr.find((elem)=>elem.id==res.data.id)

        setData([   ...data,res.data])
    })
    setName("");
    setDiscontinued("");
    setUnitsInStock("")
  }}>Complate</Button>
<div><h1>GOODs</h1></div>
</FormControl>

        <TableContainer>
  <Table variant='striped' colorScheme='purple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Discontinued</Th>
        <Th>UnitsInStock</Th>
        <Th >Delete</Th>
        <Th >Edit</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            data.map((elem)=>{
                return (
                    

                    <Tr key={uuidv4()}>
        <Td>{elem.id}</Td>
        <Td>{elem.name} </Td>
        <Td>True </Td>
        <Td>{elem.unitsInStock} </Td>
        <Td><Button colorScheme='red' name={elem.id} onClick={(e)=>{
            let array = [...data]
            array = array.filter((elem)=> elem.id != e.target.getAttribute("name"));
            setData(array);
            axios.delete("https://northwind.vercel.app/api/products/" + e.target.getAttribute("name") )
        }}>Delete</Button> </Td>   
        <Td><Button colorScheme='yellow' name={elem.id} onClick={(e)=>{
            
            console.log(e.target.getAttribute("name"))
            console.log(data.find((elem)=>elem.id==e.target.getAttribute("name")))
            setElem(
                data.find((elem)=>elem.id==e.target.getAttribute("name"))
            )
            setElemName(
                data.find((elem)=>elem.id==e.target.getAttribute("name"))
            )
            setElemDiscontinued(
                data.find((elem)=>elem.id==e.target.getAttribute("name"))
            )
            setElemUnitsInStock(
                data.find((elem)=>elem.id==e.target.getAttribute("name"))
            )
        }}>Edit</Button> </Td>
      </Tr>
                )
            })
        }
      
      
    </Tbody>
    
  </Table>
</TableContainer>

<FormControl onSubmit={(e)=>{
    e.preventDefault()
}}>
  <FormLabel>Name</FormLabel>
  <Input type='text' value={name} onChange={(e)=>{
    
    setName(e.target.value)
  }} />

  <FormLabel>Discontinued</FormLabel>
  <Input type='text' value={discontinued} onChange={(e)=>{
    
    setDiscontinued(e.target.value)
  }} />

  <FormLabel>UnitsInStock</FormLabel>
  <Input type='text' value={unitsInStock} onChange={(e)=>{
    
    setUnitsInStock(e.target.value)
  }} />

  <Button colorScheme='green' type='submit' onClick={()=>{
    let object = {
        name:name,
        discontinued:discontinued,
        unitsInStock:unitsInStock,
    };
    axios.post("https://northwind.vercel.app/api/products/" , object).then(res=>{
        setData([   ...data,res.data])
    })
    setName("");
    setDiscontinued("");
    setUnitsInStock("")
  }}>Add</Button>

</FormControl>


    </>
  )
}

export default Mount