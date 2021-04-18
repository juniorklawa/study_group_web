import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useRouteMatch } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import {
  DeleteNoteButton,
  Header,
  NoteContainer,
  Notes,
  NotesInfo,
} from "./styles";

interface GroupParams {
  groupId: string;
}

interface IStudent {
  id: number;
  name: string;
  email: string;
  ra: string;
}

interface IGroup {
  name: string;
  subject: string;
  id: number;
  creatorId: number;
  whatsAppLink: string;
  studentIds: number[];
  noteIds: number[];
  videoIds: number[];
}

interface INote {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  creator: IStudent;
}

const NotesPage: React.FC = () => {
  const [group, setGroup] = useState<IGroup | null>(null);
  const [notes, setNotes] = useState<INote[]>([]);
  const { user } = useAuth();
  const { params } = useRouteMatch<GroupParams>();

  useEffect(() => {
    async function fetchData() {
      try {
        const groupResponse = await api.get(`group/${params.groupId}`);
        const group = groupResponse.data;

        const groupNotesResponse = await api.get(
          `group/notes/list/${params.groupId}`
        );

        setNotes(
          groupNotesResponse.data.filter((note: INote) => note !== null)
        );
        setGroup(group);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [params.groupId]);

  const handleDeleteNote = async (noteId: number) => {
    try {
      await api.post("group/note/remove", { noteId });

      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Header>
        <img alt="logo" src={logoImg}></img>
        <Link to={`/group/${group?.id}`}>
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {group && (
        <NotesInfo>
          <header>
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${group?.name}`}
              alt="logo"
            ></img>
            <div>
              <strong>Notas</strong>
              <p>{group?.name}</p>
            </div>
          </header>
        </NotesInfo>
      )}

      {notes.length ? (
        <Notes>
          {notes.map((note) => (
            <NoteContainer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img
                  style={{ height: 64, width: 64, borderRadius: 32 }}
                  src={`https://ui-avatars.com/api/?background=random&name=${note?.creator.name}`}
                  alt="logo"
                ></img>
                <p style={{ marginLeft: 8, marginTop: 16 }}>
                  {note?.creator.name}
                </p>
              </div>

              {user.email === note.creator.email && (
                <DeleteNoteButton onClick={() => handleDeleteNote(note.id)}>
                  Deletar nota
                </DeleteNoteButton>
              )}

              <div style={{ marginTop: 16 }}>
                <strong>{note?.title}</strong>
                <p>{note?.description}</p>
              </div>
            </NoteContainer>
          ))}
        </Notes>
      ) : (
        <>
          <h3 style={{ marginTop: 48, color: "#757575" }}>
            Esse grupo ainda não tem nenhuma nota, que tal criar uma?
          </h3>
        </>
      )}
    </>
  );
};

export default NotesPage;
