import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useRouteMatch } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";
import { Header, Issues, GroupInfo } from "./styles";

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

const GroupPage: React.FC = () => {
  const [group, setGroup] = useState<IGroup | null>(null);
  const { params } = useRouteMatch<GroupParams>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`group/${params.groupId}`);
        const group = response.data;
        console.log(group);

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
        <Link to="/dashboard">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {group && (
        <GroupInfo>
          <header>
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${group?.name}`}
              alt="logo"
            ></img>
            <div>
              <strong>{group?.name}</strong>
              <p>{group?.subject}</p>
              <p>{group?.studentIds.length + 1} participantes</p>
            </div>
          </header>
        </GroupInfo>
      )}

      <Issues>
        <Link to={`/notes/${group?.creatorId}`}>
          <CgNotes size={32} />
          <div>
            <strong>Notas</strong>
          </div>
          <FiChevronRight size={20} />
        </Link>

        <Link to={`/videos`}>
          <MdOndemandVideo size={32} />
          <div>
            <strong>Vídeos</strong>
          </div>
          <FiChevronRight size={20} />
        </Link>

        <a href={"https://chat.whatsapp.com/KntO7lh5A6wHq7YKlRkPPv"}>
          <FaWhatsapp size={32} />

          <div>
            <strong>WhatsApp Link</strong>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Issues>
    </>
  );
};

export default GroupPage;
