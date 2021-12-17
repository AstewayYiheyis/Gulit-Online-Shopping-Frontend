// ----------------------------------------------------------------------

import { SetUser } from "src/storage.service";

const account = {
  displayName: SetUser.getUser(),
  email: SetUser.getUser(),
  photoURL: "/static/mock-images/avatars/avatar_default.jpg",
};

export default account;
