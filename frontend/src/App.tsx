import { Admin, CustomRoutes, Resource } from "react-admin";

import { authProvider } from "./authProvider";
import {
  ProjectCreate,
  ProjectEdit,
  ProjectList,
  ProjectShow,
  Register,
  TaskCreate,
  TaskEdit,
  TaskList,
  TaskShow
} from "./components";
import { dataProvider } from "./dataProvider";
import { Route } from "react-router-dom";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    >
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
    <CustomRoutes noLayout>
      <Route path="/register" element={<Register />} />
    </CustomRoutes>
  </Admin>
);
