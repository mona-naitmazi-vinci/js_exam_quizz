import HomePage from '../Pages/HomePage';
import ManageQueries from '../Pages/ManageQueries';
import NewPage from '../Pages/NewPage';

const routes = {
  '/': HomePage,
  '/queries/create': NewPage,
  '/queries': ManageQueries,
};

export default routes;
