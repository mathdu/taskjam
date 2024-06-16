import { DateField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const TaskShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <ReferenceField source="project" reference="projects" link="show"></ReferenceField>
      <DateField source="completedAt" required={false} />
    </SimpleShowLayout>
  </Show>
);
