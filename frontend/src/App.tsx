import { Admin, Resource } from "react-admin";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ProjectList } from "./components/Projects/projectList";
import { ProjectEdit } from "./components/Projects/projectEdit";
import { ProjectShow } from "./components/Projects/projectShow";
import { TaskShow } from "./components/Tasks/taskShow";
import { TaskEdit } from "./components/Tasks/taskEdit";
import { TaskList } from "./components/Tasks/taskList";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="projects"
      recordRepresentation="title"
      list={ProjectList}
      edit={ProjectEdit}
      show={ProjectShow}
    />
    <Resource
      name="tasks"
      recordRepresentation="title"
      list={TaskList}
      edit={TaskEdit}
      show={TaskShow}
    />
  </Admin>
);
