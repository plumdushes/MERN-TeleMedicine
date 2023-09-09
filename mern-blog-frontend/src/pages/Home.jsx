import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchAppeals, fetchTags } from '../redux/slices/appeals';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { appeals, tags } = useSelector(state => state.appeals);

  const isAppealsLoading = appeals.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchAppeals());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label={t("all")} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isAppealsLoading ? [...Array(5)] : appeals.items).map((obj, index) =>
            isAppealsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                //imageUrl={`http://localhost:4444${obj.imageUrl}`}
                imageUrl="https://1.bp.blogspot.com/-UwyhNoURl5w/YDI2ishGHuI/AAAAAAABBMs/vJ_dd3hNPys0YFhJseKv1tQKe83hDe7XwCLcBGAsYHQ/s2728/%25D0%25BC%25D0%25B5%25D0%25B4%25D0%25B8%25D1%2586%25D0%25B8%25D0%25BD%25D0%25B0_%2BDoV%2B%252867%2529.png"
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
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
          />
        </Grid>
      </Grid>
    </>
  );
};
