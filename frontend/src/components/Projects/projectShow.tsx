import { DateField, ReferenceManyField, Show, SimpleList, SimpleShowLayout, TextField } from 'react-admin';

export const ProjectShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
      <ReferenceManyField reference="tasks" target="project" label="Tasks">
        <SimpleList>
          <TextField source="title" />
          <DateField source="completedAt" />
        </SimpleList>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
