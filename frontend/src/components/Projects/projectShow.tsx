import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const ProjectShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);
