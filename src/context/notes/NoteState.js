import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = [
  {
    "_id": "6888779ab42ee4ced73e9149",
    "user": "687c9fffc3cf7b91ef012e82",
    "title": "MyNote2",
    "description": "This is my second note",
    "tag": "Personal",
    "date": "2025-07-29T07:26:18.917Z",
    "__v": 0
  },
   {
    "_id": "6888779ab42ee4ced73e9149",
    "user": "687c9fffc3cf7b91ef012e82",
    "title": "MyNote2",
    "description": "This is my second note",
    "tag": "Personal",
    "date": "2025-07-29T07:26:18.917Z",
    "__v": 0
  },
    {
    "_id": "6888779ab42ee4ced73e9149",
    "user": "687c9fffc3cf7b91ef012e82",
    "title": "MyNote2",
    "description": "This is my second note",
    "tag": "Personal",
    "date": "2025-07-29T07:26:18.917Z",
    "__v": 0
  },
    {
    "_id": "6888779ab42ee4ced73e9149",
    "user": "687c9fffc3cf7b91ef012e82",
    "title": "MyNote2",
    "description": "This is my second note",
    "tag": "Personal",
    "date": "2025-07-29T07:26:18.917Z",
    "__v": 0
  },
    {
    "_id": "6888779ab42ee4ced73e9149",
    "user": "687c9fffc3cf7b91ef012e82",
    "title": "MyNote2",
    "description": "This is my second note",
    "tag": "Personal",
    "date": "2025-07-29T07:26:18.917Z",
    "__v": 0
  },
    {
    "_id": "6888779ab42ee4ced73e9149",
    "user": "687c9fffc3cf7b91ef012e82",
    "title": "MyNote2",
    "description": "This is my second note",
    "tag": "Personal",
    "date": "2025-07-29T07:26:18.917Z",
    "__v": 0
  },
]
const [notes, setnotes] =useState(notesInitial); 
    return (<NoteContext.Provider value = {{notes, setnotes}}>
        {props.children}
        </NoteContext.Provider>)
}
export default NoteState;