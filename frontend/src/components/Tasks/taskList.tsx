import { DateField, List, ReferenceField, SimpleList } from 'react-admin';

export const TaskList = () => (
  <List>
    <SimpleList
      linkType="show"
      primaryText={(record) => record.title}
      secondaryText={() => <ReferenceField source="project" reference="projects" link="show" />}
      tertiaryText={() => <DateField source="completedAt" required={false} />}
    />
  </List>
);
