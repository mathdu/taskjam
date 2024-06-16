import { Edit, SimpleForm, TextInput } from 'react-admin';

export const ProjectEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);
