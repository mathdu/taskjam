import { Create, DateInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const TaskCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <ReferenceInput source="project" reference="projects" link="show"><SelectInput source="title" /></ReferenceInput>
      <DateInput source="completedAt" required={false} />
    </SimpleForm>
  </Create>
);
