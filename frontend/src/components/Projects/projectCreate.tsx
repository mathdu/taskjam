import { Create, SimpleForm, TextInput } from 'react-admin';

export const ProjectCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
