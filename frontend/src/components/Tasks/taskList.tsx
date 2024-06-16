import { List, ReferenceField, SimpleList } from 'react-admin';

export const TaskList = () => (
  <List>
    <SimpleList
      linkType="show"
      primaryText={(record) => record.title}
      secondaryText={() => <ReferenceField source="project" reference="projects" link="show" />}
      tertiaryText={(record) => record.completedAt}
    />
  </List>
);
