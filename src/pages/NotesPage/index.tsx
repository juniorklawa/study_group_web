import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useRouteMatch } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import {
  CreateNoteButton,
  DeleteNoteButton,
  DescriptionInput,
  Header,
  NoteContainer,
  Notes,
  NotesInfo,
  TitleInput,
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
  studentEmails: string[];
  noteIds: number[];
  videoIds: number[];
}

interface INote {
  id: number;
  title: string;
  description: string;
  creator: IStudent;
}

const NotesPage: React.FC = () => {
  const [group, setGroup] = useState<IGroup | null>(null);
  const [notes, setNotes] = useState<INote[]>([]);
  const { user } = useAuth();
  const { params } = useRouteMatch<GroupParams>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const groupResponse = await api.get(`group/${params.groupId}`);
        const group = groupResponse.data;

        const groupNotesResponse = await api.get(
          `group/notes/list/${params.groupId}`
        );

        if (groupNotesResponse.data) {
          setNotes(
            groupNotesResponse.data.filter((note: INote) => note !== null)
          );
        }

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

  const handleCreateNote = async () => {
    if (!title) {
      alert("Sua nota precisa ter um titulo");
      return;
    }

    if (!description) {
      alert("Sua nota precisa ter uma descrição");
    }

    try {
      const newNote = {
        title,
        description,
        creatorEmail: user.email,
        groupId: params.groupId,
      };

      const { data } = await api.post("group/note/add", newNote);

      const updatedNotes = [...notes, data] as INote[];

      setNotes(updatedNotes);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Header>
        <img alt="logo" src={logoImg}></img>
        <Link to={`/group/${params.groupId}`}>
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

      {group?.studentEmails.some((email) => email === user.email) && (
        <div style={{ padding: 16 }}>
          <h1>Criar nota</h1>

          <h2 style={{ marginTop: 16 }}>Título</h2>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ height: 40, width: "50%", padding: 8, marginTop: 16 }}
            type="text"
            id="lname"
            name="lname"
          ></TitleInput>
          <h2 style={{ marginTop: 16 }}>Descrição</h2>
          <DescriptionInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="Text1"
          ></DescriptionInput>

          <CreateNoteButton onClick={handleCreateNote}>
            Criar nota
          </CreateNoteButton>
        </div>
      )}

      {group?.studentEmails.some((email) => email === user.email) ? (
        <>
          {notes.length ? (
            <Notes>
              {notes.map((note) => (
                <NoteContainer key={note.id}>
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
      ) : (
        <>
          <h3 style={{ marginTop: 48, color: "#757575" }}>
            Você precisa entrar no grupo para criar e ver as notas!
          </h3>
        </>
      )}
    </>
  );
};

export default NotesPage;
