import React from 'react'
import { Link } from 'react-router-dom'


let getTitle = (note) =>{
  let title = note.content.split('\n')[0]
  if (title.length > 30){
    title = title.slice(0, 30)
    return title 
  
  }
  return title
}

let getContent  = (note) =>{
  let title = getTitle(note)
  let cont = note.content.replaceAll('\n', '')
  cont = cont.replaceAll(title, '')
  if(cont.length > 50 ){
    return cont.slice(0,50) + '...'
  } else {
    return cont
  }
}

const ListItem = ({note}) => {

  return (
    <Link to={`/note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p>{getContent(note)}</p>
      </div>
    </Link>
  )
}

export default ListItem