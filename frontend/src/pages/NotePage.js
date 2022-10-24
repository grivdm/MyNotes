import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {ReactComponent as Arrowleft} from '../assets/chevron-left.svg'


function NotePage() {
  const [note, SetNote] = useState([]);
  const {noteid} = useParams();
  useEffect(() =>{
    getNote()
  }, [noteid]);
  let navigate = useNavigate();

  let getNote = async () =>{
    if (noteid === 'new') return

    let response = await fetch(`/api/note/${noteid}/`);
    let data = await response.json();
    SetNote(data)
  };


  let createNote = async () =>{
    fetch(`/api/note/`, {
      method: "POST", 
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(note)
    }).then((response) =>{response.json()}).then((data) =>{console.log(data)})
    navigate('/')
  };

  let updateNote = async () =>{
    fetch(`/api/note/${noteid}/`, {
      method: "PUT", 
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(note)
    }).then((response) =>{response.json()}).then((data) =>{console.log('Updated: ', data)})
  };

  let deleteNote = async () =>{
    fetch(`/api/note/${noteid}/`, {
      method: "DELETE",
      headers: {"Content-Type": 'application/json'},
    })
    navigate('/')
  };

  let handleSubmit =() => {
    if(noteid !== 'new' && !note.content){
      deleteNote()
    } else if (noteid !== 'new'){
      updateNote()
    }
    navigate('/')
  };


  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
            <Arrowleft onClick={handleSubmit}/>
        </h3>
        {noteid !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ): (
          <button onClick={createNote}>Create</button>
          )}
      </div>
        <textarea onChange={(e) => {SetNote({...note, 'content': e.target.value})} } value={note?.content}></textarea>
    </div>
  )
}

export default NotePage