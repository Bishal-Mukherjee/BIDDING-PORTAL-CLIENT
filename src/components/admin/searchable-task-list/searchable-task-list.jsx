import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { alpha } from '@mui/material/styles';
import { Grid, Card, Stack, styled, Typography } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import { TaskCard } from '../task-card/task-card';

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  bgcolor: alpha(theme.palette.grey[900], 0.72),
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 5,
}));

export const SearchableTaskList = ({ searchQuery }) => {
  const { tasks, setSelectedTask } = useTaskStore();

  const filteredData = useMemo(
    () =>
      tasks?.filter(
        (task) =>
          searchQuery.regex &&
          (searchQuery.regex.test(task.name) || searchQuery.regex.test(task.title))
      ),
    [searchQuery, tasks]
  );

  return (
    <>
      {!isEmpty(searchQuery.value) && (
        <Typography variant="body2" pb={1}>
          {filteredData.length} results for &quot;{searchQuery.value}&quot;
        </Typography>
      )}

      {isEmpty(filteredData) && (
        <Stack sx={{ width: '100%' }} mt={4}>
          <Typography variant="body2" textAlign="center">
            No tasks of current status found.
          </Typography>
          <Typography variant="body2" textAlign="center">
            Try changing the status filter.
          </Typography>
        </Stack>
      )}

      {!isEmpty(filteredData) && (
        <Grid container spacing={2} flexWrap="wrap">
          {filteredData.map((task) => (
            <Grid
              key={`task-${task.id}`}
              item
              md={4}
              sm={12}
              xs={12}
              minHeight={250}
              maxHeight={400}
            >
              <Item
                elevation={2}
                py={4}
                px={4}
                sx={{ height: '100%', ':hover': { scale: '1.01' } }}
              >
                <TaskCard
                  id={task.id}
                  name={task.name}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  previewImage={task.previewImage}
                  createdAt={task.createdAt}
                  handleTaskSelection={() => setSelectedTask(task.id)}
                  isActive={task.isActive}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

SearchableTaskList.propTypes = {
  searchQuery: PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp),
    value: PropTypes.string.isRequired,
  }).isRequired,
};
