import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useRouteMatch } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";
import { Header, Notes, NotesInfo } from "./styles";
import YouTube from "react-youtube";

interface IStudent {
  id: number;
  name: string;
  email: string;
  ra: string;
}

interface GroupParams {
  groupId: string;
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

interface IVideo {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  creator: IStudent;
}

const VideosPage: React.FC = () => {
  const [group, setGroup] = useState<IGroup | null>(null);
  const [notes, setNotes] = useState<IVideo[]>([]);
  const { params } = useRouteMatch<GroupParams>();

  useEffect(() => {
    async function fetchData() {
      try {
        const groupResponse = await api.get(`group/${params.groupId}`);
        const group = groupResponse.data;

        const groupNotesResponse = await api.get(
          `group/videos/list/${params.groupId}`
        );

        setNotes(groupNotesResponse.data);
        setGroup(group);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [params.groupId]);
  return (
    <>
      <Header>
        <img alt="logo" src={logoImg}></img>
        <Link to={`/group/1`}>
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
              <strong>Vídeos</strong>
              <p>{group?.name}</p>
            </div>
          </header>
        </NotesInfo>
      )}

      <Notes>
        {notes.map((note) => (
          <div>
            <div>
              <strong>{note.title}</strong>
              <p>{note.description}</p>
              <YouTube videoId="dQw4w9WgXcQ" />
            </div>
          </div>
        ))}
      </Notes>
    </>
  );
};

export default VideosPage;
