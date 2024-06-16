import { List, SimpleList } from 'react-admin';

export const TaskList = () => (
  <List>
    <SimpleList
        primaryText={(record) => record.title}
        secondaryText={(record) => record.project.title}
        tertiaryText={(record) => record.completedAt}
    />
  </List>
);
