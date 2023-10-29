import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Section } from "./Section/section";
import { PhoneBookForm } from "./PhonebookForm/PhonebookForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";

import React from 'react'

export const App = () =>{

const [contacts, setContacts] = useState([])

const [filter, setFilter] = useState('')

const addContact = ({name, number}) => {
  if(contacts.find((contact)=>contact.name.toLowerCase() === name.toLowerCase())){
    alert(`${name} is already in contacts`)
    return
  }
  setContacts((prev) => (
[...prev, {id:nanoid(5), name:name, number:number},]
  ))
}

const delContact = (name) => {
  setContacts((prev) => (prev.filter(contact => contact.name !== name)))
}

const handleFilterChange = ({target}) => {
  setFilter(target.value)
}

useEffect(() => {
      const savedContacts = JSON.parse(localStorage.getItem("contacts"))
      console.log(savedContacts)
    if(savedContacts){
      setContacts(savedContacts)
    }
}, [])

useEffect(() => {
if(contacts.length === 0){
  return
}
  localStorage.setItem("contacts", JSON.stringify(contacts))
}, [contacts])

  return (
    <>
    <Section title={'Phonebook'}> 
      <PhoneBookForm addContact={(e) => addContact(e)}></PhoneBookForm>
    </Section>
  <br/>
    <Filter value={filter} handleFilterChange={handleFilterChange}></Filter>
  
  {contacts[0]&& 
    <Section title={'Contacts'}> 
      <ContactsList filter={filter} contacts={contacts} del={delContact}></ContactsList>
    </Section>}
    </>
  )
}
