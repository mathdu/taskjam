import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin';

export const TaskEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="project" />
            <DateInput source="completedAt" />
        </SimpleForm>
    </Edit>
);
