import { Admin, Resource } from "react-admin";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ProjectList } from "./components/Projects/projectList";
import { ProjectCreate } from "./components/Projects/projectCreate";
import { ProjectEdit } from "./components/Projects/projectEdit";
import { ProjectShow } from "./components/Projects/projectShow";
import { TaskList } from "./components/Tasks/taskList";
import { TaskCreate } from "./components/Tasks/taskCreate";
import { TaskEdit } from "./components/Tasks/taskEdit";
import { TaskShow } from "./components/Tasks/taskShow";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="projects"
      recordRepresentation="title"
      list={ProjectList}
      create={ProjectCreate}
      edit={ProjectEdit}
      show={ProjectShow}
    />
    <Resource
      name="tasks"
      recordRepresentation="title"
      list={TaskList}
      create={TaskCreate}
      edit={TaskEdit}
      show={TaskShow}
    />
  </Admin>
);
