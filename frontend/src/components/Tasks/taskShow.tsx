import { DateField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const TaskShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="project" />
            <DateField source="id" />
        </SimpleShowLayout>
    </Show>
);
