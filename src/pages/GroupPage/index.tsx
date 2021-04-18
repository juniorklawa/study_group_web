import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useRouteMatch } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { IUser, useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { GroupInfo, Header, Options, SubscribeButton } from "./styles";

interface GroupParams {
  groupId: string;
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

const GroupPage: React.FC = () => {
  const [group, setGroup] = useState<IGroup | null>(null);
  const { params } = useRouteMatch<GroupParams>();
  const { user, setUser } = useAuth();

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

  const handleOnGroupButtonPress = async () => {
    try {
      if (checkUserSubscription()) {
        await api.post("/group/user/exit", {
          groupId: group?.id,
          studentEmail: user.email,
        });

        const updatedUser = {
          ...user,
          groupIds: user.groupIds.filter((id) => id !== group?.id),
        };

        const updatedGroup = {
          ...group,
          studentEmails: group?.studentEmails.filter(
            (email) => email !== user.email
          ),
        };

        setGroup(updatedGroup as IGroup);
        setUser(updatedUser as IUser);

        return;
      }

      await api.post("/group/user/enter", {
        groupId: group?.id,
        studentEmail: user.email,
      });

      const updatedUser = { ...user, groupIds: [...user?.groupIds, group?.id] };

      const updatedGroup = {
        ...group,
        studentEmails: [...(group?.studentEmails as string[]), user.email],
      };
      setGroup(updatedGroup as IGroup);
      setUser(updatedUser as IUser);
    } catch (err) {
      alert(err);
    }
  };

  const checkUserSubscription = () => {
    return group?.studentEmails.some((email) => email === user.email);
  };

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
              <p>{`${group?.studentEmails.length} ${
                group?.studentEmails.length === 1
                  ? "participante"
                  : "participantes"
              }`}</p>
            </div>
          </header>
          <SubscribeButton
            isSubscribed={!!checkUserSubscription()}
            onClick={async () => handleOnGroupButtonPress()}
          >
            {checkUserSubscription() ? "Sair" : "Entrar"}
          </SubscribeButton>
        </GroupInfo>
      )}

      <Options>
        <Link to={`/notes/${group?.id}`}>
          <CgNotes size={32} />
          <div>
            <strong>Notas</strong>
          </div>
          <FiChevronRight size={20} />
        </Link>

        <Link to={`/videos/${group?.id}`}>
          <MdOndemandVideo size={32} />
          <div>
            <strong>Vídeos</strong>
          </div>
          <FiChevronRight size={20} />
        </Link>

        <a href={group?.whatsAppLink}>
          <FaWhatsapp size={32} />

          <div>
            <strong>WhatsApp Link</strong>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Options>
    </>
  );
};

export default GroupPage;
