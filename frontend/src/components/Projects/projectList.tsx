import { List, ReferenceManyCount, SimpleList } from 'react-admin';

export const ProjectList = () => (
  <List>
    <SimpleList
        linkType="show"
        primaryText={(record) => record.title}
        secondaryText={(record) => record.description}
        tertiaryText={() => <ReferenceManyCount reference="tasks" target="project" />}
    />
  </List>
);
