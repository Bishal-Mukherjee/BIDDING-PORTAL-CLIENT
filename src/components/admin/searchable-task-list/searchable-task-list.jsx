import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { Box, Grid, Paper, styled, Typography } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

import { TaskCard } from '../task-card/task-card';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
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
      <Box>
        {!isEmpty(searchQuery.value) && (
          <Typography variant="body2">
            {filteredData.length} results for &quot;{searchQuery.value}&quot;
          </Typography>
        )}
      </Box>

      {isEmpty(filteredData) && (
        <Box sx={{ width: '100%' }} mt={4}>
          <Typography variant="body2" textAlign="center" fontFamily="Wix Madefor Display">
            No tasks found
          </Typography>
        </Box>
      )}

      <Grid container spacing={2} flexWrap="wrap">
        {filteredData.map((task) => (
          <Grid key={`task-${task.id}`} item md={4} sm={12} xs={12} minHeight={250} maxHeight={250}>
            <Item elevation={2} py={4} px={4} sx={{ height: '100%' }}>
              <TaskCard
                id={task.id}
                name={task.name}
                title={task.title}
                description={task.description}
                status={task.status}
                images={task.images}
                handleTaskSelection={() => setSelectedTask(task.id)}
                isActive={task.isActive}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

SearchableTaskList.propTypes = {
  searchQuery: PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp),
    value: PropTypes.string.isRequired,
  }).isRequired,
};
