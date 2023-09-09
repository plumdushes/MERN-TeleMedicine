import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/appeals/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении обращения')
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        //imageUrl={`http://localhost:4444${data.imageUrl}`}
        imageUrl="https://1.bp.blogspot.com/-UwyhNoURl5w/YDI2ishGHuI/AAAAAAABBMs/vJ_dd3hNPys0YFhJseKv1tQKe83hDe7XwCLcBGAsYHQ/s2728/%25D0%25BC%25D0%25B5%25D0%25B4%25D0%25B8%25D1%2586%25D0%25B8%25D0%25BD%25D0%25B0_%2BDoV%2B%252867%2529.png"
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'NoName',
              avatarUrl: '',
            },
            text: 'Это тестовый комментарий',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: '',
            },
            text: 'Это тестовый комментарий',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
