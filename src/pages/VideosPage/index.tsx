import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useRouteMatch } from "react-router-dom";
import YouTube from "react-youtube";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import {
  CreateNoteButton,
  DeleteNoteButton,
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

interface IVideo {
  id: number;
  title: string;
  url: string;
  creator: IStudent;
}

const VideosPage: React.FC = () => {
  const [group, setGroup] = useState<IGroup | null>(null);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { user } = useAuth();
  const { params } = useRouteMatch<GroupParams>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const groupResponse = await api.get(`group/${params.groupId}`);
        const group = groupResponse.data;

        const groupVideosResponse = await api.get(
          `group/videos/list/${params.groupId}`
        );

        if (groupVideosResponse.data) {
          setVideos(
            groupVideosResponse.data.filter((note: IVideo) => note !== null)
          );
        }

        setGroup(group);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.groupId]);

  const handleDeleteVideo = async (videoId: number) => {
    try {
      setIsLoading(true);
      await api.post("group/video/remove", {
        videoId,
        groupId: group?.id,
      });

      const updatedVideos = videos.filter((video) => video.id !== videoId);

      setVideos(updatedVideos);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateVideo = async () => {
    if (!title) {
      alert("Seu vídeo precisa ter um titulo");
      return;
    }

    if (!url) {
      alert("Sua vídeo precisa ter uma descrição");
    }

    try {
      setIsLoading(true);
      const newVideo = {
        title,
        url,
        creatorEmail: user.email,
        groupId: params.groupId,
      };

      const { data } = await api.post("group/video/add", newVideo);

      const updatedVideos = [...videos, data] as IVideo[];

      setVideos(updatedVideos);
      setTitle("");
      setUrl("");
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

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
              <strong>Vídeos</strong>
              <p>{group?.name}</p>
            </div>
          </header>
        </NotesInfo>
      )}

      {group?.studentEmails.some((email) => email === user.email) && (
        <div style={{ padding: 16, display: "flex", flexDirection: "column" }}>
          <h1>Criar vídeo</h1>

          <h2 style={{ marginTop: 16 }}>Título</h2>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ height: 40, width: "50%", padding: 8, marginTop: 16 }}
            type="text"
            id="lname"
            name="lname"
          ></TitleInput>
          <h2 style={{ marginTop: 16 }}>Link do vídeo</h2>
          <TitleInput
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ height: 40, width: "50%", padding: 8, marginTop: 16 }}
            type="text"
            id="lname"
            name="lname"
          ></TitleInput>
          <CreateNoteButton onClick={handleCreateVideo}>
            Criar vídeo
          </CreateNoteButton>
        </div>
      )}

      {group?.studentEmails.some((email) => email === user.email) ? (
        <>
          {videos.length ? (
            <Notes>
              {videos.map((video) => (
                <NoteContainer key={video.id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <img
                      style={{ height: 64, width: 64, borderRadius: 32 }}
                      src={`https://ui-avatars.com/api/?background=random&name=${video?.creator.name}`}
                      alt="logo"
                    ></img>
                    <p style={{ marginLeft: 8, marginTop: 16 }}>
                      {video?.creator.name}
                    </p>
                  </div>

                  {user.email === video.creator.email && (
                    <DeleteNoteButton
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      Deletar vídeo
                    </DeleteNoteButton>
                  )}

                  <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <strong>{video?.title}</strong>
                  </div>
                  <YouTube videoId="dQw4w9WgXcQ" />
                </NoteContainer>
              ))}
            </Notes>
          ) : (
            <>
              <h3 style={{ marginTop: 48, color: "#757575" }}>
                Esse grupo ainda não tem nenhuma vídeo, que tal criar um?
              </h3>
            </>
          )}
        </>
      ) : (
        <>
          <h3 style={{ marginTop: 48, color: "#757575" }}>
            Você precisa entrar no grupo para criar e ver os vídeos!
          </h3>
        </>
      )}
    </>
  );
};

export default VideosPage;
